# Engineering case study: Estelle’s Kitchen

[Project overview](README.md) · [Architecture](architecture.md)

## From a repeated decision to a working workflow

A household repeatedly needs to decide what to cook and get the right ingredients onto a shopping list. A recipe page alone leaves much of that coordination work untouched.

Estelle’s Kitchen connects a published meal schedule to a cooking experience and then to a familiar native checklist. Its scope is focused: today's recipe, a seven-day view, ingredient review, and a visitor-controlled handoff to Apple Reminders.

## Ownership and implementation

The project was owner-directed across requirements, architecture, integration choices, acceptance criteria, review, and deployment. Implementation was AI-assisted. The work included refining the user flow, setting privacy expectations, checking generated artifacts against platform behavior, and verifying the deployed path.

AI assistance in development is distinct from runtime functionality. This case study does not claim that an LLM selects every meal or executes grocery actions. Private planning and backend implementation are intentionally outside this public case study.

## Challenge 1: Define a useful public experience

**Problem:** visitors need recipes and shopping actions, without needing access to the household's private planning workflow.

**Decision:** focus the public experience on the published menu, readable recipes, and ingredients that can be reviewed before a grocery action.

**Trade-off:** visitors can browse all published meals, but the free grocery export is limited to today’s meal and cannot edit the household meal schedule.

**Lesson:** a clear product contract keeps the interface useful while limiting scope. Document what users can do and what information they should expect to see.

## Challenge 2: Make missing or changing information understandable

**Problem:** a meal page can look convincing even when the current menu is unavailable. An already-open ingredient preview can also become outdated when meal information changes.

**Decision:** provide waiting and unavailable states, and ask visitors to review their selection again when necessary. Keep the illustration's date visible independently of the current recipe.

**Trade-off:** a waiting state interrupts the ideal flow, but gives the visitor a more honest answer than an unverified substitute.

**Lesson:** failure states are part of the product. Reliability includes explaining what the user can safely do next.

## Challenge 3: Connect a website to a native app

**Problem:** opening Apple Shortcuts does not prove that the expected reminders were created. The browser cannot observe every step in the native app.

**Decision:** preview what will be sent, keep the free input bounded to today’s meal, write only to the fixed list name **Estelle Groceries**, and describe the action as a handoff. Preserve ingredient quantities rather than guessing how to combine them.

**Trade-off:** repeated Add runs create duplicates, and visitors need to check the native result. The interface explains both behaviors directly.

**Lesson:** retry behavior must be designed and communicated. A handoff should not be presented as verified completion.

## Challenge 4: Test the actual integration

**Problem:** generated workflow artifacts can look correct while behaving differently in the installed native app.

**Decision:** supplement structural checks with native inspection, staged testing, and an actual website-to-Reminders acceptance run. Review the behavior of the installed helper rather than relying exclusively on generated structure.

**Evidence:** on October 5, 2026, an earlier Add-helper version was exercised from the live Today recipe flow. All seven ingredient reminders in that test reached the then-selected list. Seven is the observed test size, not a capacity or cross-device guarantee. That run is historical evidence; the current public V2 helper writes only to **Estelle Groceries**, and this document does not turn the earlier selected-list behavior into a current capability claim.

**Lesson:** structurally valid artifacts are one layer of evidence. Acceptance testing must cross the real platform boundary.

## Challenge 5: Add personality while preserving control

**Problem:** illustration and motion make the experience welcoming, but they should not distract from recipes or imply that older artwork depicts the current meal.

**Decision:** label dated artwork clearly, add restrained scene motion, and provide one persistent Pause/Play control with reduced-motion support.

**Trade-off:** a previous illustration can remain visible while the menu changes. Its explicit date keeps that distinction understandable.

**Lesson:** presentation affects trust. Labels and controls should reflect what the product actually does.

## Verification and remaining limits

The release work combined automated checks, browser review, native helper inspection, and a device-level acceptance run. Each answers a different question: whether the implementation meets its checks, whether the interface communicates clearly, and whether the real integration completes.

The public screenshots document desktop behavior only. A dedicated mobile visual pass is still pending, and long recipe titles overlap the ingredient link in two desktop weekly cards. Those are follow-on verification and layout tasks.

The evidence does not establish universal device compatibility, continuous monitoring, uptime guarantees, or measured performance improvements.

## What this demonstrates

- **Automation engineering:** a recurring workflow with clear inputs, explicit actions, and understandable failure states.
- **Systems integration:** connecting published recipe information to a browser review flow and an existing native app.
- **Technical operations:** staged verification and release review that distinguish observed results from assumptions.
- **Solutions and product thinking:** fitting the workflow to tools people already use and making limitations visible.
- **Applied AI practice:** using AI assistance while retaining ownership of requirements, verification, and release decisions.

## Potential next steps

Broader device testing, long-title layout hardening, and clearer installation guidance would strengthen the existing experience. Quantity-aware ingredient consolidation and daily illustrations would require additional product decisions and verification. These are proposed directions, not shipped capabilities.
