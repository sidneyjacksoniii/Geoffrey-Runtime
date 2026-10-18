# Jackson-West architecture

Jackson-West separates control, execution, and evidence so that no single transport acknowledgement can be mistaken for an observed outcome.

The sanitized architecture has three planes:

- **Control plane:** authenticated intake, validation, deterministic policy, registered-executor routing, and atomic handoff.
- **Execution plane:** a fixed local adapter invokes Apple Shortcuts or another registered executor.
- **Evidence plane:** correlated terminal receipts govern canonical state, while owner observation remains separate corroboration.

Heartbeat records describe reachability and recovery; they do not grant authorization. Device registration currently represents an actor plus a device class, not hardware-backed identity. Geoffrey Runtime Access is an isolated candidate architecture, not evidence of universal production migration.

## System architecture

```mermaid
flowchart LR
  A[Authenticated source] --> B[Intake and validation]
  B --> C{Deterministic policy}
  C -->|deny| X[Rejected with reason]
  C -->|allow| D[Registered-executor route]
  D --> E[Atomic handoff]
  E --> F[Fixed local adapter]
  F --> G[Apple Shortcuts or executor]
  G --> H[Terminal receipt]
  H --> I{Receipt validates?}
  I -->|yes| J[Canonical state update]
  I -->|no or missing| K[Pending or failed]

  F -. transport acknowledgement .-> K
  L[Authenticated heartbeat] --> M[Availability record]
  M -. informs eligibility only .-> D
```

Editable source: [diagrams/sanitized-architecture.mmd](diagrams/sanitized-architecture.mmd)
Rendered diagram: [diagrams/sanitized-architecture.svg](diagrams/sanitized-architecture.svg)

## Request lifecycle

```mermaid
sequenceDiagram
  participant S as Authenticated source
  participant I as Intake
  participant P as Policy and router
  participant E as Registered executor
  participant R as Receipt validator
  participant C as Canonical state

  S->>I: Request plus correlation ID
  I->>I: Schema, freshness, replay, identity
  I->>P: Valid request
  P->>P: Authorization and eligibility
  P->>E: Atomic handoff to fixed adapter
  E-->>P: Transport acknowledgement
  Note over P,C: Acknowledgement is not success
  E->>R: Correlated terminal receipt
  R->>R: Validate identity, result, and state
  alt receipt validates
    R->>C: Commit authoritative result
  else missing or invalid receipt
    R->>C: Keep pending or record failure
  end
```

Editable source: [diagrams/request-lifecycle.mmd](diagrams/request-lifecycle.mmd)
Rendered diagram: [diagrams/request-lifecycle.svg](diagrams/request-lifecycle.svg)

## Public scope

These diagrams explain boundaries and state transitions. They do not reproduce production records, identifiers, endpoints, credentials, private source, or infrastructure topology.
