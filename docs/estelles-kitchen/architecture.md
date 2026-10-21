# Architecture: Estelle’s Kitchen

[Project overview](README.md) · [Engineering case study](engineering-case-study.md)

## A public product view

Estelle’s Kitchen connects approved meal updates, a mobile-first recipe experience, and a visitor-controlled grocery action. This overview describes the visible product and its integrations. The private planning and publication implementation is outside its scope.

```mermaid
flowchart TD
    A[Scheduled approved meal updates] --> B[Published menu and recipes]
    B --> C[Kitchen website]
    C --> D[Visitor reviews today's ingredients]
    D -->|Explicit handoff| E[Apple Shortcuts on the visitor device]
    E --> F[Fixed Estelle Groceries list]
```

## Published menu and recipes

The website presents today's available recipe and a seven-day menu. Recipe details include ingredients and instructions, with serving and timing information where available. Visitors can browse every published meal. The free grocery action is limited to today’s recipe.

Choosing meals for groceries does not edit the household meal schedule. Approved meal updates reach the public experience separately from the visitor's grocery actions.

## Website experience

The public interface uses HTML, CSS, vanilla JavaScript, and JSON. Responsive layouts support recipe browsing and ingredient review on smaller screens.

The page distinguishes an available menu from a waiting or unavailable state. When the current menu cannot be verified, the experience avoids presenting a substitute as current. A changed menu can require the visitor to review their grocery selection again.

The illustrated scene uses Canvas motion, with one Pause/Play control and support for system reduced-motion preferences. A dated illustration is labeled separately from the current meal information. Automatic daily artwork generation is not a shipped feature.

These are implemented interaction features, not a claim of comprehensive accessibility or device certification.

## Grocery workflow

1. The visitor opens today’s published meal.
2. The website previews today’s ingredient lines and quantities.
3. The visitor explicitly chooses to open Apple Shortcuts.
4. The installed **Estelle Grocery Add V2** helper adds ingredients to the exact Reminders list name **Estelle Groceries**.
5. The visitor checks the result in their native app.

The handoff uses ingredient text and bounded input for today’s meal only. Each ingredient remains separate; the current experience does not consolidate quantities or deduplicate reminders.

Repeated Add runs create another copy. The website cannot read the visitor’s reminders or confirm that a native add completed, so opening Shortcuts is presented as a handoff rather than a success receipt.

**Estelle Grocery Setup** optionally creates a list named **Estelle Groceries**. Visitors who already have that exact list can skip Setup. Running Setup again can create another list.

## User control and privacy

- Visitors review ingredients before sending them to Shortcuts.
- The current helper writes only to the fixed list name **Estelle Groceries**; custom list names are not part of the free public flow.
- Apple may ask for permission to open Shortcuts or access Reminders.
- Reminders may sync through the visitor’s own Apple account.
- This public documentation omits private backend implementation, credentials, personal household records, and operating instructions.

## Deployment

The product is deployed at [geoffreyruntime.com/estelles-kitchen](https://geoffreyruntime.com/estelles-kitchen/). This repository documents the shipped experience and engineering lessons; it is not a distributable copy of the private production system.
