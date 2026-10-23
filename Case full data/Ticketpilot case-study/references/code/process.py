"""Reproducible process discovery from the public BPI 2013 incident log.

Intervals are elapsed time between ownership changes, never staff effort.
"""
import argparse
import csv
import gzip
import hashlib
import json
import statistics
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data/raw/BPI_Challenge_2013_incidents.xes.gz"
SUMMARY = ROOT / "data/process-summary.json"
DOI = "https://doi.org/10.4121/uuid:500573e6-accc-4b0c-9576-aa5468b10cee"
DOWNLOAD = "https://data.4tu.nl/file/0fc5c579-e544-4fab-9143-fab1f5192432/aa51ffbb-25fd-4b5a-b0b8-9aba659b7e8c"


def attrs(element):
    return {child.get("key"): child.get("value") for child in element if child.get("key")}


def read_xes(path):
    opener = gzip.open if str(path).endswith(".gz") else open
    with opener(path, "rb") as stream:
        for _, element in ET.iterparse(stream, events=("end",)):
            if element.tag.rsplit("}", 1)[-1] != "trace":
                continue
            case = attrs(element).get("concept:name", "")
            events = [attrs(e) for e in element if e.tag.rsplit("}", 1)[-1] == "event"]
            yield case, events
            element.clear()


def summarize(traces, team_key="org:group"):
    paths, bounces, edges, cases = Counter(), Counter(), defaultdict(list), []
    edge_cases = defaultdict(set)
    quality = Counter()
    for case_id, events in traces:
        quality["cases"] += 1
        quality["events"] += len(events)
        parsed = []
        for order, e in enumerate(events):
            team, stamp = e.get(team_key), e.get("time:timestamp")
            if not team or not stamp:
                quality["missing_team_or_time_events"] += 1
                continue
            try:
                time = datetime.fromisoformat(stamp.replace("Z", "+00:00"))
                if time.tzinfo is None:
                    raise ValueError("Timezone missing")
            except ValueError:
                quality["invalid_timestamp_events"] += 1
                continue
            parsed.append((time, order, team))
        if not parsed:
            quality["excluded_unusable_cases"] += 1
            continue
        if any(a[0] > b[0] for a, b in zip(parsed, parsed[1:])):
            quality["out_of_order_cases"] += 1
        parsed.sort(key=lambda x: (x[0], x[1]))
        segments = []
        for time, _, team in parsed:
            if not segments or segments[-1][0] != team:
                segments.append((team, time))
        path = tuple(s[0] for s in segments)
        paths[path] += 1
        return_count = sum(team in path[:i] for i, team in enumerate(path))
        for i in range(len(path)-2):
            if path[i] == path[i+2] and path[i] != path[i+1]:
                bounces[path[i:i+3]] += 1
        for (source, start), (target, end) in zip(segments, segments[1:]):
            hours = (end-start).total_seconds()/3600
            edges[(source, target)].append(hours)
            edge_cases[(source, target)].add(case_id)
            if hours == 0:
                quality["zero_elapsed_handoffs"] += 1
        cases.append(dict(case_id=case_id, path=" → ".join(path), handoffs=len(path)-1, revisits=return_count,
                          elapsed_hours=(parsed[-1][0]-parsed[0][0]).total_seconds()/3600,
                          has_pingpong=any(path[i] == path[i+2] for i in range(len(path)-2))))
    if not cases:
        raise ValueError(f"No usable cases. Verify team key {team_key!r} against the XES attributes.")
    edge_rows = [dict(source=a, target=b, transfers=len(times), cases=len(edge_cases[(a,b)]), mean_elapsed_hours=round(statistics.mean(times), 3), median_elapsed_hours=round(statistics.median(times), 3), total_elapsed_hours=round(sum(times), 3)) for (a,b), times in edges.items()]
    edge_rows.sort(key=lambda r: r["transfers"], reverse=True)
    counts = [c["handoffs"] for c in cases]
    result = dict(source=DOI, team_key=team_key, quality=dict(quality), analyzed_cases=len(cases),
                  handoffs=sum(counts), mean_handoffs=statistics.mean(counts),
                  multi_team_case_rate=sum(n > 0 for n in counts)/len(cases),
                  pingpong_case_rate=sum(c["has_pingpong"] for c in cases)/len(cases),
                  revisit_case_rate=sum(c["revisits"] > 0 for c in cases)/len(cases),
                  mean_case_elapsed_hours=statistics.mean(c["elapsed_hours"] for c in cases),
                  median_case_elapsed_hours=statistics.median(c["elapsed_hours"] for c in cases),
                  mean_pre_transfer_elapsed_hours=sum(sum(t) for t in edges.values())/sum(counts) if sum(counts) else 0,
                  paths=[dict(path=" → ".join(path), cases=n, share=n/len(cases)) for path,n in paths.most_common(20)],
                  bounces=[dict(path=" → ".join(path), occurrences=n) for path,n in bounces.most_common(20)], edges=edge_rows,
                  method="Consecutive equal teams collapsed; each team change is one handoff. A-B-A is a ping-pong. Any repeated team after departure is a revisit. Pre-transfer elapsed time runs from first event in source team segment to first event in next team; includes waiting and work. Final segment excluded. Ties preserve file order.")
    return result, cases


def run(path=RAW, team_key="org:group"):
    if Path(path).resolve() == RAW.resolve() and hashlib.md5(Path(path).read_bytes()).hexdigest() != "d4809bd55e3e1c15b017ab4e58228297":
        raise ValueError("Default BPI dataset differs from the publisher checksum; analysis not written.")
    summary, cases = summarize(read_xes(path), team_key)
    summary["sha256"] = hashlib.sha256(Path(path).read_bytes()).hexdigest()
    SUMMARY.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
    target = ROOT / "data/process-cases.csv"
    with target.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(cases[0]))
        writer.writeheader()
        writer.writerows(cases)
    return summary


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=RAW)
    parser.add_argument("--team-key", default="org:group")
    args = parser.parse_args()
    print(json.dumps({k:v for k,v in run(args.input, args.team_key).items() if k not in ("edges", "paths", "bounces")}, indent=2))
