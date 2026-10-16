import assert from 'node:assert/strict';

await import('./physics.js');
const physics = globalThis.GeoffreyRuntimePhysics;

assert.ok(physics, 'physics module must register its public API');

const groundY = 500;
const beam = { left: 120, right: 214, top: groundY - 90, bottom: groundY - 66 };
const standingUnderBeam = physics.playerBoxAt(160, groundY);
const slidingUnderBeam = physics.playerBoxAt(160, groundY, { sliding: true });

assert.equal(standingUnderBeam.top, groundY - physics.PLAYER_STANDING_HEIGHT);
assert.equal(slidingUnderBeam.top, groundY - physics.PLAYER_SLIDE_HEIGHT);
assert.equal(physics.boxesOverlap(standingUnderBeam, beam), true);
assert.equal(physics.boxesOverlap(slidingUnderBeam, beam), false);
assert.ok(groundY - beam.bottom > physics.PLAYER_SLIDE_HEIGHT);
assert.ok(groundY - beam.bottom < physics.PLAYER_STANDING_HEIGHT);
assert.equal(physics.hasStandingClearance(160, groundY, [beam]), false);
assert.equal(physics.hasStandingClearance(80, groundY, [beam]), true);

const priorAboveBeam = physics.playerBoxAt(160, beam.top - 10 + physics.PLAYER_BOTTOM_INSET);
const descendingAcrossBeam = physics.playerBoxAt(160, beam.top + 4 + physics.PLAYER_BOTTOM_INSET);
assert.equal(physics.canLandOnPlatform(priorAboveBeam, descendingAcrossBeam, beam, 180), true);
assert.equal(physics.canLandOnPlatform(priorAboveBeam, descendingAcrossBeam, beam, -180), false);

const alreadyBelowBeam = physics.playerBoxAt(160, beam.bottom + physics.PLAYER_BOTTOM_INSET);
assert.equal(physics.canLandOnPlatform(alreadyBelowBeam, alreadyBelowBeam, beam, 180), false);

const sideContact = physics.playerBoxAt(beam.left - 8, beam.top + 20);
assert.equal(physics.boxesOverlap(sideContact, beam), true);
assert.equal(physics.canLandOnPlatform(sideContact, sideContact, beam, 0), false);

const plantedOnBeam = physics.playerBoxAt(160, beam.top + physics.PLAYER_BOTTOM_INSET);
assert.equal(physics.platformSupports(plantedOnBeam, beam), true);
assert.equal(physics.boxesOverlap(plantedOnBeam, beam), false);
assert.equal(physics.hasStandingClearance(160, beam.top + physics.PLAYER_BOTTOM_INSET, [beam]), true);
assert.equal(physics.platformSupports(plantedOnBeam, { ...beam, left: 180, right: 274 }), false);

let simulatedY = groundY;
let simulatedVelocityY = -physics.jumpSpeedForViewHeight(640);
let simulatedLanding = false;
for (let step = 0; step < 40 && !simulatedLanding; step += 1) {
  const previousBox = physics.playerBoxAt(160, simulatedY);
  simulatedVelocityY += physics.JUMP_GRAVITY * 0.04;
  simulatedY += simulatedVelocityY * 0.04;
  const currentBox = physics.playerBoxAt(160, simulatedY);
  simulatedLanding = physics.canLandOnPlatform(
    previousBox,
    currentBox,
    beam,
    simulatedVelocityY,
  );
}
assert.equal(simulatedLanding, true);

for (const [viewWidth, viewHeight] of [[390, 280], [768, 640], [1280, 720]]) {
  const basePlayerX = Math.min(168, Math.max(76, viewWidth * 0.2));
  const scrollSpeed = Math.min(720, Math.max(160, (viewWidth + 90 - basePlayerX) / 2.8));
  const jumpSpeed = physics.jumpSpeedForViewHeight(viewHeight);
  const samples = physics.jumpArcSamples(viewHeight, scrollSpeed, 5);
  assert.equal(samples.length, 5);
  for (const sample of samples) {
    const arrivalTime = physics.ARC_SAMPLE_MARGIN + sample.offsetX / scrollSpeed;
    assert.ok(Math.abs(arrivalTime - sample.time) < 1e-9);
    const playerLift = jumpSpeed * sample.time - 0.5 * physics.JUMP_GRAVITY * sample.time ** 2;
    const playerBoxTop = -playerLift - physics.PLAYER_STANDING_HEIGHT;
    const playerBoxBottom = -playerLift - physics.PLAYER_BOTTOM_INSET;
    const nodeY = -sample.lift;
    assert.ok(nodeY >= playerBoxTop && nodeY <= playerBoxBottom);
  }
}

console.log('PASS: deterministic platform landing, collision, clearance, and jump-arc checks');
