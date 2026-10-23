"""Local reasoning API shared by the React frontend and Python workbench.

Workflow state stays in the browser; this API does not write ticket memory.
"""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from ticketpilot.core import Pilot
from ticketpilot.process import SUMMARY
from ticketpilot.evaluate import evaluate


def recommend(text):
    if not isinstance(text, str) or not text.strip() or len(text) > 10000:
        raise ValueError("Provide a ticket description of 1–10,000 characters.")
    pilot = Pilot()
    result = pilot.route(text)
    by_id = {r["ticket_id"]: r for r in pilot.history}
    similar = []
    for hit in result["similar"]:
        row = by_id[hit["id"]]
        similar.append({"score": hit["score"], "case": {
            "key": row["ticket_id"], "summary": row["text"], "resolvedBy": row["resolving_team"],
            "notes": row["resolution_notes"], "hours": float(row.get("time_to_resolve_hrs", 0)),
            "path": row.get("handoff_history", row["resolving_team"]).split(" → "),
        }})
    return {"team": None if result["human_review"] else result["recommended_team"],
            "label": "Needs a person" if result["human_review"] else "Strong match",
            "reason": result["reason"], "similar": similar,
            "votesForTeam": sum(h["team"] == result["recommended_team"] for h in result["similar"]),
            "fix": None if result["human_review"] else result["fix"],
            "knowledgeRef": next((s["id"] for s in result["sources"] if s["id"].startswith("KB-")), None) if not result["human_review"] else None,
            "urgent": result["urgency"] == "High",
            "sources": result["sources"], "engine": "python-lexical", "confidence": result["confidence"]}


class Handler(BaseHTTPRequestHandler):
    def respond(self, status, body):
        content = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_GET(self):
        if self.path == "/api/health":
            return self.respond(200, {"status": "ok", "engine": "python-lexical"})
        if self.path == "/api/process":
            if not SUMMARY.exists():
                return self.respond(503, {"error": "Process dataset has not been analyzed."})
            return self.respond(200, json.loads(SUMMARY.read_text(encoding="utf-8")))
        if self.path == "/api/evaluation":
            return self.respond(200, evaluate())
        self.respond(404, {"error": "Endpoint not found"})

    def do_POST(self):
        if self.path != "/api/route":
            return self.respond(404, {"error": "Endpoint not found"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 50000:
                raise ValueError("Invalid request size")
            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                raise ValueError("Expected a JSON object")
            self.respond(200, recommend(payload.get("text")))
        except (ValueError, TypeError) as exc:
            self.respond(400, {"error": str(exc)})
        except Exception:
            self.respond(500, {"error": "Routing failed. Check the local API logs."})


if __name__ == "__main__":
    print("TicketPilot API: http://127.0.0.1:8765", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
