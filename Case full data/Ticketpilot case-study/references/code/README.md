# Implementation reference snapshots

These files are copied for inspection while writing; this directory is not a standalone runnable application. Imports and data paths refer to the working repository. Run the app and evaluation from the repository root, following its README and deployment notes.

| Snapshot | What it supports |
| --- | --- |
| [core.py](core.py) | Lexical retrieval, weighted resolving-team votes, heuristic confidence and extractive sources |
| [api.py](api.py) | Visitor API response, abstention and stateless endpoint behavior |
| [evaluate.py](evaluate.py) | Frozen historical memory, case-level baseline comparison and gate reporting |
| [process.py](process.py) | Ownership segment definitions and event-log aggregates |
| [value.py](value.py) | Cost, capacity, run cost, TCO and simple payback arithmetic |
| [ui-backend.ts](ui-backend.ts) | Frontend's request to Python and error handling |
| [ui-decision-card.tsx](ui-decision-card.tsx) | Evidence/recommendation and human routing-approval presentation |

The original proposed stack is not an implementation inventory. In particular, these snapshots do not establish delivered Claude, LangChain, LangGraph, Chroma, pydantic or LangSmith integration. No runtime, environment variables, credentials or visitor-local state are included.
