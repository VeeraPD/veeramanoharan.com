"""Held-out routing comparison; no claims about unmeasured voice or fix quality."""
import argparse
import json
from pathlib import Path
from ticketpilot.core import Pilot, baseline
from ticketpilot.data import read


def evaluate(semantic=False):
    pilot = Pilot(semantic)
    # Evaluate only original historical memory, excluding user-created corrections.
    pilot.history = read("history")
    pilot.vectors = pilot.encode([r["text"] for r in pilot.history])
    rows = []
    for t in read("test"):
        r = pilot.route(t["text"])
        rows.append(dict(id=t["ticket_id"], expected=t["resolving_team"], baseline=baseline(t["text"]), predicted=r["recommended_team"], assigned=r["assigned_team"], review=r["human_review"], confidence=r["confidence"]))
    n = len(rows)
    auto = [r for r in rows if not r["review"]]
    base_accuracy = sum(r["baseline"] == r["expected"] for r in rows)/n
    accuracy = sum(r["assigned"] == r["expected"] for r in rows)/n
    wrong = sum(r["assigned"] != r["expected"] for r in auto)/len(auto) if auto else None
    alerts = pilot.alerts()
    caught = {a["issue"] for a in alerts if a["start_date"] == "2026-10-12"} & {"Reporting", "Payroll"}
    return dict(mode="semantic" if semantic else "lexical", sample_size=n, baseline_accuracy=base_accuracy,
                first_time_right=accuracy, recommendation_accuracy=sum(r["predicted"] == r["expected"] for r in rows)/n,
                escalation_rate=1-len(auto)/n, wrong_auto_assignment_rate=wrong,
                baseline_modeled_handoffs=1-base_accuracy, pilot_modeled_handoffs=sum(not r["review"] and r["assigned"] != r["expected"] for r in rows)/n,
                seeded_spikes_caught_on_first_day=len(caught), alerts=alerts,
                kill_criteria=dict(gain_below_10_points=accuracy-base_accuracy < .1, wrong_auto_above_5_percent=wrong is not None and wrong > .05, escalation_above_40_percent=1-len(auto)/n > .4),
                limitations=["Synthetic templates repeat across test variants; not independent real-world evidence.", "Handoffs modeled as one per wrong assignment; human review effort must be costed separately.", "Confidence is heuristic, not calibrated.", "Fix relevance and five voice clips not evaluated."], rows=rows)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--semantic", action="store_true")
    args = parser.parse_args()
    results = evaluate(args.semantic)
    Path("reports").mkdir(exist_ok=True)
    Path("reports/evaluation.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(json.dumps({k:v for k,v in results.items() if k not in ("rows", "alerts")}, indent=2))
