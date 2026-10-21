# Shared Information and Governed Execution

**Version:** 0.2  
**Prepared:** 21 October 2026  
**Publication status:** Published  
**Publication date:** 21 October 2026  
**Baseline source commit:** `825df3bfe412aaccc73af409e235cc8b1c826ce5`  
**Article introduction record:** The first public Git commit containing this file; the exact immutable SHA is recorded in the immediate metadata follow-up.

This publication documents demonstrated and planned architecture boundaries. It is not a claim that every described path is offered to public customers. The 18 October 2026 case study remains the historical public baseline at its original commit.

## The architecture in one sentence

Geoffrey Runtime gives people useful controls and structured information, while Jackson-West governs selected remote requests before a registered local executor performs an allowed action.

That sentence hides an important distinction: not every useful action needs the governed path.

A person can run a local Apple Shortcut directly on a device. That direct manual path can work without Jackson-West, and it does not automatically produce a Jackson-West execution receipt. When a request originates through Jackson-West, it enters a different path with authenticated intake, deterministic policy, bounded routing, customer-controlled access enforcement, and outcome evidence where the capability supports it.

## Two paths, not one universal control system

### Direct local use

A customer can manually run a supported Shortcut on a local device. The customer is present, chooses the Shortcut, and relies on the permissions and controls of that device.

This path is local-first. It does not require Jackson-West to authorize the request, and Jackson-West receipts are not mandatory for the local Shortcut to run. The absence of a Jackson-West receipt should not be confused with a failed local action; it means the action did not use the governed service path.

### Jackson-West-originated use

A Jackson-West-originated request begins with an authenticated requester and a narrowly defined capability. The governed route evaluates whether that requester may ask for that capability, whether the request is fresh and well formed, which registered executor may receive it, and whether customer access controls permit the effect.

For the demonstrated announcement path, a Mac can be the requester while a supported phone is the executor. The phone performs the announcement through a registered Geoffrey Runtime Shortcut. Requester and executor are distinct roles; the requesting Mac does not receive direct control of the phone or its private interfaces.

Before the individual capability Shortcut can perform the governed action, a central customer Access gate runs on the phone-side path. Customer lock enforcement remains mandatory for the governed action. Durable server-side Access changes require an authenticated, accepted request, while the customer-local gate remains an independent enforcement point.

The central gate has been demonstrated for this selected path. That evidence does not establish that every older Shortcut, every executor, or every legacy route has migrated to the same gate.

## Provenance is not authorization

Every request needs provenance: where it came from, which authenticated identity submitted it, and which capability it names. Provenance helps the system evaluate a request and create accountable records.

Provenance does not grant permission by itself.

A recognized source can still submit a stale, malformed, duplicated, out-of-policy, or customer-disabled request. Authentication answers who presented the request. Authorization answers whether that requester may perform this capability under current policy and customer controls. Routing answers which registered executor may receive it. Those decisions remain separate.

This separation matters for human interfaces and AI agents alike. Natural-language intent, a website button, or a structured agent request can propose an action. None of them should bypass deterministic authorization.

## Human and software access to the same information

Information access is a separate plane from real-world execution.

Estelle’s Kitchen demonstrates the public information pattern today. The human-readable Kitchen page and its schema-versioned JSON edition come from the same published source. People can browse the page; supported software can read the structured edition without scraping the interface.

The public Kitchen contract is read-only. It does not expose private customer records, private approval history, device access, or an execution capability.

A separate household-authenticated Kitchen JSON interface has been implemented and tested locally against the same public publication data. It remains undeployed. Its current scope is bounded read-only information, schema, and documentation contracts. It does not create a general machine credential, persistent agent access, or a real-world action route.

Governed AI action requests through that interface remain planned. They should not be described as available until a separate, end-to-end governed action contract has been implemented, tested in its intended environment, and approved for release.

## Local-first and remote execution

The architecture preserves local use while adding governance to selected remote convenience.

```text
Direct local path
Person -> local Shortcut -> local capability
         no Jackson-West authorization required
         no mandatory Jackson-West receipt

Governed path
Authenticated requester
        -> deterministic policy and bounded routing
        -> customer-controlled Access enforcement
        -> registered local executor
        -> capability Shortcut
        -> correlated software outcome evidence
```

Local-first does not mean ungoverned remote access. It means a supported customer can still use a local capability manually, while a remote request must satisfy the additional service and customer controls of the governed route.

## Structured JSON and agent interoperability

Structured JSON is useful because it gives supported software an explicit contract: named fields, bounded values, schema versions, and clear status. It reduces the ambiguity of scraping a page or asking an agent to infer state from prose.

That does not make every agent compatible.

An authorized agent must still use a supported contract and the authentication and authorization method defined for that contract. A read contract does not silently become an execution credential. A public information feed does not grant access to private devices. A request source does not override customer locks.

The present public demonstration is the Kitchen page and its public JSON and schema. It demonstrates shared information for human and software readers. It is not a public demonstration of agent-requested execution.

## Receipts and accountability

A governed system must distinguish the stages it can actually observe.

1. **Accepted:** the request passed intake and policy.
2. **Dispatched:** an approved request was handed to a registered executor.
3. **Executor-reported terminal status:** the executor returned a correlated final software status.
4. **Observed real-world outcome:** a person or a separate sensor independently confirmed the effect.

A terminal software receipt is stronger than a transport acknowledgement. It can show that the registered software path reported execution for the matching request. It does not prove that a person heard an announcement, that a physical environment changed exactly as intended, or that an external device remained in that state.

Public language should therefore say “terminal software status” or “execution reported by the governed path,” not “the person heard it” unless that human observation was separately recorded and appropriate to disclose.

## Narrow household demonstration

On 21 October 2026, the selected governed announcement path completed two separate household requests: a greeting and a time-bounded reminder. Each run produced the same class of correlated terminal software success evidence, and customer lock state remained unchanged.

The requester and executor were separate supported devices. The requesting device held only the narrowly scoped requester role; the supported phone performed the announcement through the registered Geoffrey Runtime path and its customer Access gate.

This is useful evidence for that path. It is not:

- a public customer rollout;
- a general device-control API;
- proof that a person heard either announcement;
- proof that every legacy route uses the central gate;
- proof of universal agent compatibility; or
- a certification of the broader platform.

The public demonstration remains the read-only Kitchen information experience. The announcement evidence is a private household demonstration summarized only by capability, boundary, and evidence class.

## Capability status

| Capability | Status | Publicly supportable statement |
|---|---|---|
| Manual local Shortcuts | Implemented for selected capabilities | A customer can run supported local Shortcuts without Jackson-West; governed receipts are not mandatory for direct manual execution. |
| Public Kitchen page, JSON, and schema | Implemented and deployed | Human and software readers can use two presentations of the same public Kitchen publication. |
| Household-authenticated Kitchen JSON | Locally implemented and tested; undeployed | A bounded read-only interface uses existing household authentication and the same public publication data. |
| Governed announcement request | Private household demonstration | Two selected requests completed with correlated terminal software status through a distinct requester and supported phone executor. |
| Phone-side central Access gate | Demonstrated for the selected governed path | The gate ran before the individual capability Shortcut; this does not prove universal legacy migration. |
| Durable server Access change | Implemented for authenticated accepted requests on the selected architecture | A source label alone cannot change Access; the customer-local gate remains independent. |
| Governed AI actions through Kitchen | Planned | No current Kitchen agent interface performs actions or grants device access. |
| Universal executor migration | Not established | Each route requires separate implementation and evidence. |
| Public action demonstration | Not available | The current public demo is structured Kitchen information, not real-world execution. |

## Company and infrastructure boundaries

Geoffrey Runtime LLC owns and presents the customer-facing software and experiences. Jackson-West LLC owns or controls separate private governance and execution technology. Public documentation can explain the contract between those responsibilities without disclosing the private implementation.

This article intentionally excludes:

- private endpoints and network topology;
- internal credential names or values;
- request, receipt, device, or customer identifiers;
- private paths, logs, and operating instructions;
- customer data and household details;
- proprietary policy tables and adapter internals.

The boundary is part of the architecture. Public source and documentation explain the behavior that can be reviewed safely. They do not grant access to Jackson-West services or private Geoffrey Runtime capabilities.

## Development history

- **0.1 — 18 October 2026:** the original public case study documented authenticated intake, deterministic policy, registered-executor routing, receipt-gated state, heartbeat availability, selected radio evidence, and an isolated Runtime Access candidate. Its history remains unchanged at commit `825df3bfe412aaccc73af409e235cc8b1c826ce5`.
- **0.2 — 21 October 2026:** this publication separates direct local Shortcuts from governed requests; distinguishes provenance from authorization and requester from executor; records the selected phone-side Access-gate and household announcement evidence at a public-safe level; narrows receipt claims; and preserves the boundary between public Kitchen information, undeployed authenticated reads, and planned agent actions. The immediate metadata follow-up records the exact introduction commit without inventing a self-referential hash.

## Public demonstration links

- Human-readable Kitchen: https://geoffreyruntime.com/estelles-kitchen/
- Structured Kitchen JSON: https://geoffreyruntime.com/estelles-kitchen/latest.json
- Kitchen schema: https://geoffreyruntime.com/estelles-kitchen/schema-v1.json

These links were verified as anonymously reachable on 21 October 2026. They demonstrate public structured information. They do not demonstrate authenticated customer retrieval or governed real-world execution.

