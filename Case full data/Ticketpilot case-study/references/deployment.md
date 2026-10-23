# Publish the integrated portfolio demo

## Decision

Publish the React UI with the Python reasoning service. Keep Streamlit as the separate local analysis workbench. A link from your portfolio to a hosted integrated demo lets companies explore the product without your laptop running.

Publishing the unmodified Lovable UI alone demonstrates interaction design and its browser rules. It does not demonstrate Python retrieval. After this integration, new request submission expects `/api/route`; a frontend-only deployment without a reachable Python service will fail with a retry message. Presenter jumps and seeded sample cases still use clearly labeled scenario data.

No public site has been deployed by this change.

## Local development

From the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\run-product.ps1
```

Frontend: http://127.0.0.1:3000. Python API: http://127.0.0.1:8765/api/health. Add `-IncludeWorkbench` to launch Streamlit on its default port if it is free. Existing `run.ps1` remains the older Streamlit demo launcher. API and optional Streamlit child processes launched by the product script stop when that script exits. Install UI dependencies with `cd UI; npm ci` on a fresh checkout.

New requests use the Python lexical engine over existing synthetic history. The recommendation is retained through the employee, resolver and leader views. Workflow actions stay in localStorage for that browser; they are not organizational records, shared tickets or authenticated identities. Returning to the same browser resumes its sample state; use Reset demo for a fresh run.

## Production layout

```text
Visitor → HTTPS host → React/TanStack Node server
                           /api/* → Python service on private loopback
                                      → synthetic history + process aggregates
```

The frontend and API share the visitor-facing origin. The server proxy supports route, health and process endpoints; it does not forward arbitrary destinations. The server-only `TICKETPILOT_API_URL` can point to a privately hosted Python service if they are split. Do not place secrets in VITE-prefixed browser variables.

## Container preparation

The root Dockerfile builds a Node server bundle and runs Node plus the private standard-library Python API. Only port 3000 is exposed; Streamlit is not included. Build context excludes raw data, local interactive state, environment files and dependency directories. No paid model API key is needed.

```sh
docker build -t ticketpilot-demo .
docker run --rm -p 3000:3000 ticketpilot-demo
```

Use a container host that supports a long-running web service and managed HTTPS. Set the public port according to the host (the runtime respects PORT). There is no hosting provider or paid subscription selected here. The Node production build was verified on Windows; the Docker image requires a separate build/run check because Docker is unavailable in this workspace.

## Before sending the public link

1. Verify the deployed `/api/health`, a dashboard request, an unrelated request that abstains, and the full employee-to-resolver-to-confirmation journey in a fresh browser.
2. Verify mobile layout, tour spotlight placement, skip/restart, seeded presenter modes and refresh/deep links. Automated unit tests do not replace this browser review.
3. Configure HTTPS, a request-size limit and platform rate/concurrency limits. This lightweight demo API is not a production enterprise service. Use only fictitious input; the public demo should ask visitors not to submit confidential company information. Avoid request-body logging.
4. Confirm one visitor's case state does not appear in another browser. Browser personas are demonstrations, not access control. The API never writes visitor tickets to shared memory.
5. Keep synthetic organization statistics, historical BPI observations, Python evaluation and illustrative ROI assumptions labeled separately. Some leader screens remain seeded illustrations rather than live aggregate analytics.
6. Link the case study and repository evidence from your portfolio. A recorded fallback is now available at `output/video/ticketpilot-product-demo.mp4` with a poster and separate captions. It has not been uploaded or published.

## What was verified

TypeScript compilation, nine React tests, 25 Python tests and production Node build passed. The compiled Node server was started on local port 3100 with Python on private port 8765. HTTP checks returned 200 for `/`, `/portal/new`, `/api/health` and `/api/process`; POST through the production `/api/route` proxy returned Applications with five matching tickets and seven sources. Cloud deployment, Docker runtime and visual browser walkthrough remain separate checks; do not describe them as complete until run.
