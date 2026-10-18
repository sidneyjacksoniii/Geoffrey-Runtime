# Jackson-West evidence boundaries

This matrix distinguishes what is present, tested, deployed, live-verified, planned, or unresolved. “Live-verified” is deliberately narrow and does not imply continuous availability or universal coverage.

| Capability | Public status |
|---|---|
| Deterministic intake/governance/routing | Code-present; selected isolated tests |
| Receipt-gated canonical state | Code-present; selected live evidence |
| Authenticated heartbeat and recovery state | Code-present; isolated tests; recorded live snapshot |
| Recent dashboard route | Live-verified for one radio station, two roles |
| Historical local lighting bridge | Live-verified on selected scenes; not a website route |
| Geoffrey Runtime Access | Isolated candidate; not production migration evidence |
| Unique physical-device identity | Planned |
| Universal receiver-side access enforcement | Unresolved |

## Interpretation rules

- **Code-present** means implementation exists; it does not establish deployment.
- **Isolated-tested** means selected behavior passed bounded tests outside a universal production rollout.
- **Deployed** means a component was placed in a live environment; deployment alone does not prove an effect.
- **Live-verified** means a selected path produced matching runtime evidence. Scope is limited to the path described.
- **Planned** means future work, not a current control.
- **Unresolved** means the design or migration still has an open gap.

Sanitized examples in this documentation are explanatory summaries, not production records.
