# Jackson-West: Engineering a Governed Distributed Execution Platform

**Sidney Jackson III — Founder and Developer**
**Public review draft · 18 October 2026**

## Executive overview

Jackson-West is a private automation platform that coordinates authenticated requests across a web interface, a Mac-based control plane, and registered Apple Shortcuts executors. The engineering problem is not simply “make an automation run.” It is to decide who may ask, what may happen, where it may execute, when the request is still valid, and what evidence is strong enough to report success.

The platform’s central design choice is a separation of concerns:

- **Intent is not authority.** Natural-language or UI input can propose an action, but deterministic policy owns approval.
- **Dispatch is not execution.** A process return or transport acknowledgement does not update canonical state.
- **Execution is not proof.** Only a correlated terminal receipt can authorize a success state.
- **Availability is not permission.** Heartbeats answer whether an executor appears reachable; authorization is evaluated independently.

This case study describes a working personal-scale system with live evidence on selected paths, plus isolated architecture work intended to tighten access control. It does not claim enterprise scale, continuous availability, universal executor migration, or hardware-backed device identity.

## The problem and its constraints

The system spans trust boundaries that ordinary single-process automation can ignore. A browser can enqueue a command, but should not directly control a household device. A Mac can dispatch a Shortcut, but the operating-system return code cannot prove the intended effect occurred. A phone can be registered as an executor class, but a label such as “phone” does not uniquely bind a physical handset.

The design therefore had to accommodate:

- heterogeneous executors with different connectivity and receipt behavior;
- short freshness windows and replay prevention;
- explicit actor, source, device-class, and capability policy;
- offline nodes that cannot immediately learn a remote access change;
- editable Apple Shortcuts that are integration components, not trusted policy stores;
- compatibility with existing runtime contracts while new controls are introduced;
- privacy: public documentation must explain the architecture without publishing paths, credentials, endpoints, identifiers, customer data, or production logs.

## Architecture

The runtime is deliberately divided into a control plane, execution plane, and evidence plane.

1. An authenticated source creates a request with a correlation identifier.
2. Intake validates schema, timestamp freshness, identifier consistency, duplicates, and credentials.
3. A deterministic governor applies policy and current access state.
4. A router resolves a registered executor from the approved actor, action, target, and device class.
5. The approved request is handed off atomically to a fixed adapter.
6. Apple Shortcuts or another registered executor performs the local action.
7. A transport result is recorded but remains non-authoritative.
8. A correlated terminal receipt is validated before canonical state or the dashboard changes.

See the editable and rendered diagrams accompanying this case study.

## Identity, authentication, and device registration

Requests are checked against active identity records and bearer credentials, then constrained by source, actor, device-class, status, logger, action, and target policy. The filename and request identifier must agree, timestamps must be timezone-aware and fresh, and duplicate identifiers are rejected.

The current registration model historically identifies a user plus a device class. That is useful routing and authorization context, but it is not the same as unique physical-device binding or hardware attestation. A future hardening step is to issue device-specific credentials and signed, request-bound permits with explicit lifetime and revocation semantics.

## Access governance: legacy control and the Runtime Access candidate

The legacy control is a narrow local setting that switches Jackson-West behavior between enabled and local-only states. Public distribution of the associated control was withdrawn; it should not be described as a device lock, an internet disconnect, or an entitlement system.

A newer **Geoffrey Runtime Access** architecture has been implemented and tested in an isolated candidate. It proposes a canonical boolean access state, fail-closed parsing, an immediate local OFF latch, OFF-wins reconciliation, no positive authorization cache, fresh authorization for every dispatch, a request-bound receiver permit, and a receiver check before the first side effect.

That candidate passed its isolated suite, but it is not evidence that production executors have all migrated. Important production decisions remain open, including the authoritative revision source, controller identities, permit signing and lifetime, pending-work disposition, multi-device delivery, and migration of installed Shortcuts. An offline executor also cannot learn a remote OFF state until communication resumes; receiver-local enforcement remains essential.

## Availability and heartbeat validation

The heartbeat protocol uses a generated probe, exact echoed values, freshness and replay checks, and registered user/device-class validation. Each cycle is recorded. A timeout marks degradation; consecutive timeouts can mark an executor offline. Recovery is explicit when a later validated heartbeat arrives.

A recorded inspection snapshot showed the active executor healthy, while historical cycle records also contained timeouts and recoveries. This supports the health-state mechanism; it is not a claim of uninterrupted uptime.

## Receipts and auditability

The evidence model has three distinct levels:

1. **Transport acknowledgement:** the adapter or Shortcut invocation returned.
2. **Executor-reported terminal receipt:** a correlated receipt reports a final result and validated state.
3. **Owner-observed effect:** a person independently observes the physical or media outcome.

Only level two is authoritative for machine state. Level three is valuable corroboration but is recorded separately. This prevents a clean process exit from becoming a false “done” message.

## Verified end-to-end loop

The strongest recent live evidence is an authenticated dashboard-to-radio path:

- two owner-dashboard requests and one member-dashboard request reached the registered executor;
- each produced a correlated terminal success receipt that matched the requested station, actor context, execution device, speaker target, and playing state;
- the owner separately confirmed audible playback.

This result is intentionally narrow. It verifies one station path from both dashboard roles. Two other station attempts failed during validation, and a fourth was not tested. The website queue involved in this work is radio-only; it is not a general device-control interface.

Earlier lighting evidence demonstrates a different local path: a Mac invoked stored lighting scenes through Apple Shortcuts, produced structured per-accessory receipts, and compared the resulting states against the Apple Home interface. Three scene runs were fully observed across nine accessories; two other scene runs correctly recorded partial failures despite successful transport. Those records validate the distinction between dispatch and effect, but they do not establish a website-to-light route.

Jackson-West also contains governed light actions outside the website surface, including a recorded television-area lighting route through a registered phone executor and other scoped light actions. Those paths are separate from both the radio-only website queue and the Mac HomeKit scene bridge. They should not be edited together into a single implied lifecycle.

## Failure and recovery behavior

| Condition | System response | Recovery evidence |
|---|---|---|
| Malformed, unauthenticated, stale, or duplicate request | Reject before routing | Correct and resubmit under a new identifier |
| Disabled access or policy denial | Fail closed | Re-evaluate only after an authorized state change |
| Missing or ambiguous executor | Do not dispatch | Repair registration or route configuration |
| Transport returns but no terminal receipt arrives | Keep state pending/failed; do not publish success | Reconcile using a correlated authoritative receipt |
| Executor heartbeat times out | Mark degraded, then offline after the configured threshold | A later validated heartbeat restores availability |
| Executor is offline during a remote access change | Remote OFF may not be learned immediately | Local OFF latch and receiver-side checks are required |
| Queue adapter submits an unsafe identifier or omits requester authentication | Intake rejects the request | Adapter reuses existing requester authorization and emits a safe identifier |
| Broad test fixtures lag current policy/route registries | Tests fail rather than masking drift | Update fixtures and re-establish a committed known-good baseline |

## Implementation stack

- Python services and standard-library-first runtime components
- JSON schemas, policy registries, state snapshots, and append-oriented lifecycle records
- atomic filesystem handoff between stages
- macOS process supervision and Apple Shortcuts adapters
- an authenticated web dashboard and closed command queue
- HTML, CSS, JavaScript, and Node-based site validation
- Git-backed source history plus separate runtime receipts and state evidence

## Engineering tradeoffs and lessons

**Receipt gating increases latency but protects truth.** Waiting for terminal evidence makes the UI less optimistic and more trustworthy.

**Filesystem handoff is inspectable but requires discipline.** Atomic writes, correlation identifiers, freshness rules, and duplicate rejection are essential.

**Device classes simplify routing but are not identities.** The current model must be described accurately until unique device credentials exist.

**Offline-first denial is asymmetric.** A local OFF action can deny immediately; a remote OFF action cannot reach a disconnected receiver. Strong designs put a short-lived authorization decision at the point of effect.

**Architecture proposals are not deployment evidence.** Candidate code and passing isolated tests support design credibility, but production migration requires separate receipts and rollout records.

**Test failures can be evidence.** Fixture drift in broad legacy suites exposed mismatches between policy, routing, and newer capabilities. Recording those failures is more useful than presenting a selectively green test story.

## Future development

1. Bind credentials to individual physical devices and define revocation.
2. Finalize the Runtime Access authority source, signed permit format, expiry, and replay controls.
3. Migrate and verify every production executor and installed Shortcut before claiming universal enforcement.
4. Require receiver-side authorization checks immediately before the first effect.
5. Reconcile broad fixtures with current route and policy registries, then cut a new known-good release.
6. Expand live tests one capability at a time, preserving the distinction between transport, executor receipt, and owner observation.
7. Add privacy-safe operational metrics without publishing private identifiers or infrastructure topology.

## AI-assisted development disclosure

AI tools assisted with code generation, test scaffolding, documentation, and evidence organization. Sidney Jackson III, founder and developer, defined the requirements, made architecture and security decisions, reviewed changes, controlled releases, and accepted or rejected live outcomes. AI-generated output was treated as a candidate input—not as authority—and was subject to deterministic validation, testing, and human review.

## Public evidence boundary

This document intentionally omits private paths, endpoint details, credentials, request identifiers, household labels, personal data, customer information, and raw logs. Its examples summarize verified behavior; they are not production records. Full source and runtime evidence remain private.
