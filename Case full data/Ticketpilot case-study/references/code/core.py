import json
import math
import re
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta
from uuid import uuid4

from ticketpilot.data import DATA, read

TEAMS = ["Network", "Applications", "Security", "Hardware", "Access Management", "Email", "HR Systems", "Facilities"]
RULES = [("Security", ["access denied", "permission", "malware", "attachment"]), ("Network", ["vpn", "wifi", "wireless", "network"]), ("Hardware", ["laptop", "notebook", "display"]), ("Email", ["outlook", "mail"]), ("HR Systems", ["payroll", "salary"]), ("Access Management", ["account", "mfa", "factor"]), ("Facilities", ["printer", "print"]), ("Applications", ["report", "dashboard"])]


def baseline(text):
    return next((team for team, words in RULES if any(w in text.lower() for w in words)), "Applications")


def tokens(text):
    return Counter(re.findall(r"[a-z0-9]+", text.lower()))


def cosine(a, b):
    norm = math.sqrt(sum(v*v for v in a.values()) * sum(v*v for v in b.values()))
    return sum(v*b.get(k, 0) for k, v in a.items()) / norm if norm else 0


class Pilot:
    def __init__(self, semantic=False):
        self.history = read("history")
        self.articles = read("articles")
        self.state_path = DATA / "state.json"
        self.state = json.loads(self.state_path.read_text(encoding="utf-8")) if self.state_path.exists() else {"closed": [], "corrections": [], "pending": []}
        self.history += self.state["closed"]
        self.encoder = None
        if semantic:
            from sentence_transformers import SentenceTransformer
            self.encoder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        self.vectors = self.encode([r["text"] for r in self.history])

    def encode(self, texts):
        return self.encoder.encode(texts, normalize_embeddings=True) if self.encoder else [tokens(t) for t in texts]

    def search(self, text, rows=None, limit=5):
        rows = self.history if rows is None else rows
        vectors = self.vectors if rows is self.history else self.encode([r["text"] for r in rows])
        q = self.encode([text])[0]
        scored = [(float(v @ q) if self.encoder else cosine(q, v), row) for v, row in zip(vectors, rows)]
        return sorted(scored, key=lambda x: x[0], reverse=True)[:limit]

    def route(self, text, threshold=.75):
        if not text.strip():
            raise ValueError("Enter a ticket description.")
        hits = self.search(text)
        votes = Counter()
        for similarity, row in hits:
            votes[row["resolving_team"]] += max(0, similarity)
        team, weight = votes.most_common(1)[0]
        best = hits[0][0]
        # Conservative heuristic score; not a calibrated probability.
        confidence = (weight / sum(votes.values()) if sum(votes.values()) else 0) * min(1, max(0, best) / .65)
        urgent = bool(re.search(r"\b(outage|today|deadline|blocked|blocking|all users|everyone)\b", text, re.I))
        deadline = re.search(r"\b(?:by|before)\s+[^.!?\n]{1,60}|\btoday\b|\btomorrow\b", text, re.I)
        articles = self.search(text, [a for a in self.articles if a["status"] == "current"], 2)
        sources = [{"id": r["ticket_id"], "text": r["resolution_notes"], "score": round(s, 3)} for s, r in hits if s >= .45 and r["resolving_team"] == team]
        sources += [{"id": r["article_id"], "text": r["steps"], "score": round(s, 3)} for s, r in articles if s >= .45]
        review = confidence < threshold
        return dict(issue=text.strip(), urgency="High" if urgent else "Normal", deadline=deadline.group(0) if deadline else None,
                    recommended_team=team, assigned_team=None if review else team, confidence=round(confidence, 3),
                    human_review=review, reason=f"Top similar tickets were resolved by {team}; strongest similarity {best:.2f}.",
                    similar=[dict(id=r["ticket_id"], team=r["resolving_team"], score=round(s, 3)) for s, r in hits],
                    sources=sources, fix=sources[0]["text"] if sources and not review else "No sufficiently reliable fix found. A resolver must investigate.")

    def save(self):
        self.state_path.write_text(json.dumps(self.state, indent=2, ensure_ascii=False), encoding="utf-8")

    def submit(self, result, voice=None):
        ticket = dict(result, ticket_id="NEW-" + uuid4().hex[:10], created_at=datetime.now().isoformat(), voice=voice)
        self.state["pending"].append(ticket)
        self.save()
        return ticket["ticket_id"]

    def close(self, ticket_id, team, notes, area):
        if team not in TEAMS or not notes.strip() or not area.strip():
            raise ValueError("A valid team, resolution notes and product area are required.")
        ticket = next(t for t in self.state["pending"] if t["ticket_id"] == ticket_id)
        if ticket["recommended_team"] != team:
            self.state["corrections"].append(dict(ticket_id=ticket_id, predicted=ticket["recommended_team"], actual=team))
        row = dict(ticket_id=ticket_id, text=ticket["issue"], resolving_team=team, resolution_notes=notes.strip(), product_area=area.strip(), created_at=datetime.now().isoformat(), first_team=ticket["assigned_team"] or "Human review")
        self.state["closed"].append(row)
        self.state["pending"].remove(ticket)
        self.history.append(row)
        self.vectors = self.encode([r["text"] for r in self.history])
        self.save()

    def alerts(self):
        # Product-area grouping is an explicit demo fallback, not semantic clustering.
        counts = defaultdict(Counter)
        for r in self.history:
            counts[r["product_area"]][date.fromisoformat(r["created_at"][:10])] += 1
        alerts = []
        for area, daily in counts.items():
            first, last = min(daily), max(daily)
            for n in range(7, (last-first).days+1):
                day = first + timedelta(days=n)
                normal = sum(daily[day-timedelta(days=k)] for k in range(1, 8))/7
                if daily[day] >= 3 and daily[day] >= 3*max(normal, 1):
                    related = [r for r in self.history if r["product_area"] == area and r["created_at"][:10] == day.isoformat()]
                    alerts.append(dict(issue=area, start_date=day.isoformat(), impact=f"{daily[day]} tickets today", baseline=round(normal, 2), likely_cause="Unverified: investigate recent changes. " + related[0]["text"], owner=Counter(r["resolving_team"] for r in related).most_common(1)[0][0], priority="High"))
        return alerts
