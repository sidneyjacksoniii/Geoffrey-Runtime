# Jackson-West 1.1: a controlled runtime handoff

**Deployed November 25, 2026.** This is a reliability update to Jackson-West 1.0, not a new customer feature bundle or the separate version 2 project.

The main challenge was deciding what to do with a request that arrives during an update, or with a request that may already have been acted on. For the cutover, public pages remained readable while website command writes paused briefly. The existing intake could hold requests separately, and one runtime version at a time owned governed execution. Once 1.1 was verified as the active owner, website commands reopened and the intake was unlocked.

An earlier attempt stopped because the candidate did not pass startup verification. We rehearsed the corrected build in isolation, including the handoff to 1.1 and rollback to the exact predecessor release. The rollback test verified that work with an uncertain outcome was not automatically replayed. The production checks established runtime ownership and that an intentionally incomplete request reached normal validation again. They did not exercise a physical device, prove message delivery, or establish uninterrupted command availability.

## What's next

Message Home replies and Fitness lighting that respects the initiating person's home status are in development. Neither shipped with this cutover.

See [Jackson-West architecture](https://jacksonwest.io/) and [Geoffrey Runtime developer resources](https://geoffreyruntime.com/developers/). The private execution system and household data are not published in this repository.
