# Jackson-West and Geoffrey Runtime roadmap

**Status snapshot: November 2026.** Geoffrey Runtime is the customer-facing project. Jackson-West governs selected requests; direct local controls remain a separate path. This roadmap describes intended work, not release dates or a claim that planned features are available.

## What works now

- **Website buttons and local buttons:** Selected controls are in use. A direct local button and a website request do not necessarily use the same execution path. Availability depends on the configured capability and device.
- **Radio:** Basic station and output controls are in use. Radio DJ exists, but scheduled playback and reliable recovery still need work.
- **Jackson-West 1.1:** The governed runtime handoff shipped. Read the [1.1 release note](release-v1.1-2026-11-25.md) for what the cutover verified and what it did not.

## Planned updates

| Order | Update | Goal and release check |
| --- | --- | --- |
| 1 | **Send Message / Message Home** | Verify a controlled device reply and its matching receipt, then roll out messaging. An earlier scoped delivery test passed; everyday sending on the current build remains disabled pending verification. |
| 2 | **Geoffrey email workflow** | After messaging is ready, accept intentionally forwarded email on a configured Geoffrey device. Read it within the approved scope and support replies through the authorized email account. Verify sender authorization, reply destination, and delivery before wider use. |
| 3 | **Set Schedule + Set Display** | In one update, create or edit schedule definitions and support display-only changes. Verify that saving a definition or updating the display does not execute a command. |
| 4 | **Run Schedule** | Ship execution separately. Verify that a due schedule runs only when authorized, runs once, and reports missed or uncertain outcomes without automatically repeating them. |
| 5 | **Radio DJ reliability** | Improve scheduled handoff, playback confirmation, and recovery after interruptions without duplicate starts or overlapping playback. |
| 6 | **Vehicle dispatch** | Strengthen target selection, eligibility checks, and result reporting. A software receipt is not proof of a physical vehicle outcome. |

## Later

- **Jackson Secure:** A separate workstream. Its scope and roadmap will be documented independently.
- **Jackson-West V2:** A separate architecture track intended to support finer-grained control, such as addressing individual lights. It is not the deployed 1.1 runtime.

For side-effecting releases, plan a narrowly scoped test switch before rollout. Where appropriate, it should default to off and support arming and disarming without restarting the service. Use dry runs or previews when a live effect is unnecessary.

See the [runtime architecture and evidence map](architecture.md), [Geoffrey Runtime developer resources](https://geoffreyruntime.com/developers/), and [Jackson-West architecture](https://jacksonwest.io/).
