# Geoffrey Escape deterministic platform physics

This small, dependency-free source extract demonstrates the deterministic geometry used to validate the solid platform behavior developed for **Geoffrey Runtime: The Escape**.

It covers:

- standing, sliding, running, and dashing player hitboxes
- axis-aligned overlap checks
- one-way top landings that reject ascending and side contact
- stable top support and walking off an edge
- safe standing clearance after a slide
- jump-arc samples tied to horizontal travel time

## Run the checks

From the repository root:

```bash
node runtime/geoffrey-escape/physics.test.mjs
```

The checks use only Node.js built-ins and do not require a browser, Phaser, a backend, credentials, or network access.

## Evidence and scope

The source behavior was implemented and tested in private Geoffrey Runtime website source commit `2dc34faabb5c951ba9dac4c0aa3c9282a495af3b` on October 16, 2026. The focused game test passed during publication review, and this isolated package was separately executed after extraction.

This is an implementation-and-test sample, not the full game. It intentionally excludes artwork, site code, deployment configuration, private services, customer or household data, endpoints, and Jackson-West orchestration. It does not claim that the platform-physics change has been deployed, published, cross-browser validated, or proven production-ready.

## Licensing

This directory is proposed for release under the repository-root **Geoffrey Runtime Source-Available License V1**. It is source-available, not open source. Publication should retain the root `LICENSE` file and an explicit release decision by Geoffrey Runtime LLC.
