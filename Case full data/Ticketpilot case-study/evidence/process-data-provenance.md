# Process data provenance

Ward Steeman (2013). *BPI Challenge 2013, incidents*. 4TU.ResearchData. Dataset.
DOI: https://doi.org/10.4121/uuid:500573e6-accc-4b0c-9576-aa5468b10cee

The original challenge describes Volvo IT Belgium's VINST incident/problem system and explicitly asks about team ping-pong:
https://ais.win.tue.nl/bpi/2013/challenge.html

Publisher metadata retrieved October 23, 2026:
https://api.figshare.com/v2/articles/12693914
Saved locally as `raw/catalogue.json`. Original file ID: 24033593. Publisher-supplied and computed MD5: `d4809bd55e3e1c15b017ab4e58228297`.

The publisher download endpoints failed in this environment. The file was downloaded unmodified from:
https://raw.githubusercontent.com/DogukanDG/bpic2013-to-simod-csv/master/BPI_Challenge_2013_incidents.xes.gz

Its MD5 matches the publisher metadata. SHA-256:
`6ec2136c607648608655802486df97a866f351668751b7ecbca51e1f8715d522`.

Publisher metadata specifies **4TU General Terms of Use**, linked at https://doi.org/10.4121/resource:terms_of_use. Do not relabel the dataset as MIT or assume the mirror's code license applies. Raw data is kept locally and excluded from version control; fetch it using `scripts/fetch_process_data.py`. Aggregated analysis is reproducible from the original bytes. Review source terms before redistribution.

Mapping: case = trace `concept:name`; team = event `org:group`; timestamp = event `time:timestamp`. Do not replace team with individual `org:resource`. This prototype does not expose individual names. It uses all ownership events, without inferring that every team change is unnecessary. It does not infer final resolving ownership from the log or join synthetic descriptions to real case identifiers.

Metrics: consecutive equal teams collapse to an ownership segment. Each change is a handoff. A-B-A counts a direct bounce; any return to an earlier team counts a revisit. Source segment start to next segment start is pre-transfer elapsed time, including work and waiting; the final segment is excluded from this metric. First-to-last event span is observed case elapsed time, not guaranteed full resolution time. Zero-duration tied transitions preserve file order. Invalid/missing timestamps or teams are reported, and out-of-order events are sorted and counted. Single-event cases remain valid zero-handoff cases.

This historical observational dataset demonstrates process friction. It does not prove that TicketPilot reduces handoffs or that the process reflects current Volvo operations. AI routing evaluation remains a separate synthetic-text experiment.
