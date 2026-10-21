# Geoffrey Runtime

> A deployed local-first automation project demonstrating systems integration, governed execution, and human-centered reliability.

Geoffrey Runtime is the customer-facing software project by **Sidney Jackson III (Jack)**. It explores how web experiences, Apple Shortcuts, native apps, household devices, and optional AI assistance can be connected without treating probabilistic AI output as trusted execution.

**Live project:** https://geoffreyruntime.com/  
**Product contact:** jack@geoffreyruntime.com  
**Architecture / professional portfolio:** https://jacksonwest.io/

---

## Start with the shipped work

### Estelle’s Kitchen — deployed systems-integration case study

[Estelle’s Kitchen](docs/estelles-kitchen/README.md) is a live household meal-planning and grocery workflow connecting a published web experience to Apple Shortcuts and Apple Reminders.

The project demonstrates:

- requirements and integration design
- explicit system boundaries
- failure-state design
- browser → native-app handoff
- acceptance testing on a real device
- transparent known limitations
- AI-assisted implementation with human-owned architecture, verification, and release decisions

**Best engineering entry points:**

- [Project overview](docs/estelles-kitchen/README.md)
- [Engineering case study](docs/estelles-kitchen/engineering-case-study.md)
- [Architecture](docs/estelles-kitchen/architecture.md)
- [Live experience](https://geoffreyruntime.com/estelles-kitchen/)
- **[Jackson-West: Engineering a Governed Distributed Execution Platform](docs/jackson-west/governed-distributed-execution-platform.md)** — A sanitized case study of authenticated intake, deterministic policy, registered-executor routing, receipt-gated state, heartbeat availability, and Apple Shortcuts integration. Private Jackson-West source, identifiers, endpoints, credentials, and production logs remain excluded.
- **[Shared Information and Governed Execution](docs/jackson-west/shared-information-and-governed-execution-v0.2.md)** — Version 0.2 distinguishes direct local use from governed requests, documents the public Kitchen information contract, and narrows what software receipts and private household demonstrations establish.

### One historical cross-system acceptance test

On October 5, 2026, an earlier grocery-helper version was exercised from the live Today recipe flow through Apple Shortcuts to a selected Apple Reminders list. All seven ingredient reminders in that test arrived successfully.

That result is intentionally scoped: it is historical evidence of one real end-to-end acceptance run, not a claim of universal compatibility or production-scale reliability. The current public helper is narrower: it exports only today's meal and writes to the fixed list name **Estelle Groceries**.

---

## What Geoffrey Runtime is

Geoffrey Runtime is a local-first automation architecture built around a simple rule:

> **AI may interpret a request, but deterministic software decides whether and how it can execute.**

The system separates request intake, validation, policy, execution, device interaction, and evidence/receipt handling.

```text
Voice / Buttons / Schedules / Web
              |
              v
        Request Intake
              |
              v
          Validation
              |
              v
         Policy Checks
              |
              v
           Executor
              |
              v
            Device
              |
              v
      Receipt / Status
              |
              v
           Logging
```

When deterministic routing cannot resolve a request, an AI model may return structured data. That data must still pass validation before execution.

**AI never directly controls devices.**

---

## Engineering themes demonstrated

### Systems integration

Geoffrey Runtime connects browser experiences, Apple Shortcuts, Apple Reminders, personal devices, and automation services while documenting where one system stops being able to verify another.

### Reliability and failure semantics

The project distinguishes:

- request accepted vs. action executed
- app handoff vs. verified completion
- local execution vs. governed execution
- current data vs. unavailable data
- observed test results vs. broader reliability claims

### Governance and execution boundaries

Customer-editable local automation is not treated as a security boundary. Optional Jackson-West services enforce their own authentication and authorization independently.

### Product and customer communication

Failure states, retry behavior, permissions, known limitations, and unsupported behavior are documented as part of the product contract rather than hidden behind success-path demos.

---

## Selected capabilities

- **Estelle’s Kitchen:** published meals, recipe browsing, today's ingredient review, fixed-list Apple Shortcuts → Reminders handoff
- **Radio:** local-first station/output control architecture
- **Runtime request model:** request IDs, validation, policy checks, execution, receipts/status
- **Home automation concepts:** scenes, announcements, device coordination, state and runtime locks
- **Vehicle-control concepts:** bounded Tesla control flows and simulated public demos
- **AI orchestration:** optional structured interpretation followed by deterministic validation

Some production implementation, credentials, household data, and private Jackson-West services are intentionally not published in this repository.

---

## Repository map

```text
docs/       Engineering documentation and case studies
examples/   Public examples and traces
runtime/    Public runtime-related implementation, where included
schemas/    Request / contract schemas
shortcuts/  Public Shortcut-related materials
```

For the strongest example of shipped engineering work, start with:

**[docs/estelles-kitchen/engineering-case-study.md](docs/estelles-kitchen/engineering-case-study.md)**

For a safe public example of the governed execution contract, see:

**[examples/public-execution-trace.md](examples/public-execution-trace.md)** — a synthetic request → validation → policy → execution → receipt trace with fictitious identifiers and no private endpoints, credentials, household identifiers, or internal policy rules.

---

## Current project status

Geoffrey Runtime is an actively developed personal-automation product and architecture. Some experiences are deployed today; others are prototypes, architecture references, or works in progress.

The repository deliberately avoids claiming scale, uptime, compatibility, or enterprise readiness that has not been measured.

Current Radio installer status and product availability are documented on the live site rather than implied by architecture documentation.

---

## Development approach

The project is owner-directed across:

- problem definition
- requirements
- architecture
- integration choices
- acceptance criteria
- testing and review
- release decisions

Implementation is AI-assisted. Generated work is treated as untrusted until inspected or tested against the relevant system boundary.

This distinction is important to the project: AI assistance accelerates implementation, but responsibility for requirements, verification, and release remains human-owned.

---

## Product and service boundary

**Geoffrey Runtime** is the customer-facing software and public project.

**Jackson-West** is the private service boundary used for selected governed capabilities. It is not required for every local capability, and editing a local Shortcut does not grant Jackson-West authorization.

Geoffrey Runtime LLC owns the customer-facing project. Sidney Jackson III (Jack) is the founder and developer.

---

## Licensing

This repository contains source-available material as well as public documentation. See [LICENSE](LICENSE) for the current terms.

Private Jackson-West technology, credentials, personal household records, and non-public production implementation remain outside this repository.

For Geoffrey Runtime product inquiries: **jack@geoffreyruntime.com**

For architecture, professional work, and hiring information: **https://jacksonwest.io/**
