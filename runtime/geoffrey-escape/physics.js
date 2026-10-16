/* Shared deterministic movement geometry for Geoffrey Runtime: The Escape. */
(() => {
  'use strict';

  const JUMP_GRAVITY = 2100;
  const JUMP_SPEED_MIN = 650;
  const JUMP_SPEED_MAX = 820;
  const ARC_SAMPLE_MARGIN = 0.08;
  const PLAYER_NODE_CENTER_OFFSET = 34;
  const PLAYER_STANDING_HEIGHT = 70;
  const PLAYER_SLIDE_HEIGHT = 34;
  const PLAYER_RUN_WIDTH = 36;
  const PLAYER_DASH_WIDTH = 50;
  const PLAYER_BOTTOM_INSET = 2;
  const PLATFORM_LANDING_TOLERANCE = 3;

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  function jumpSpeedForViewHeight(viewHeight) {
    return clamp(viewHeight * 1.25, JUMP_SPEED_MIN, JUMP_SPEED_MAX);
  }

  function jumpArcSamples(viewHeight, scrollSpeed, count = 5) {
    const jumpSpeed = jumpSpeedForViewHeight(viewHeight);
    const flightTime = (2 * jumpSpeed) / JUMP_GRAVITY;
    const usableTime = flightTime - ARC_SAMPLE_MARGIN * 2;
    const sampleStep = usableTime / Math.max(1, count - 1);
    return Array.from({ length: count }, (_, index) => {
      const time = ARC_SAMPLE_MARGIN + sampleStep * index;
      const playerLift = jumpSpeed * time - 0.5 * JUMP_GRAVITY * time * time;
      return {
        time,
        lift: playerLift + PLAYER_NODE_CENTER_OFFSET,
        offsetX: scrollSpeed * sampleStep * index,
      };
    });
  }

  function playerBoxAt(x, y, { sliding = false, dashing = false } = {}) {
    const height = sliding ? PLAYER_SLIDE_HEIGHT : PLAYER_STANDING_HEIGHT;
    const width = dashing ? PLAYER_DASH_WIDTH : PLAYER_RUN_WIDTH;
    return {
      left: x - width / 2,
      right: x + width / 2,
      top: y - height,
      bottom: y - PLAYER_BOTTOM_INSET,
    };
  }

  function boxesOverlap(a, b) {
    return a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom;
  }

  function platformSupports(playerBox, platformBox) {
    const horizontal = playerBox.right > platformBox.left && playerBox.left < platformBox.right;
    return horizontal && playerBox.top < platformBox.top
      && Math.abs(playerBox.bottom - platformBox.top) <= PLATFORM_LANDING_TOLERANCE;
  }

  function canLandOnPlatform(previousPlayerBox, playerBox, platformBox, velocityY) {
    if (velocityY < 0) return false;
    const horizontal = playerBox.right > platformBox.left && playerBox.left < platformBox.right;
    return horizontal
      && playerBox.top < platformBox.top
      && previousPlayerBox.bottom <= platformBox.top + PLATFORM_LANDING_TOLERANCE
      && playerBox.bottom >= platformBox.top;
  }

  function hasStandingClearance(x, y, obstacleBoxes, { dashing = false } = {}) {
    const standingBox = playerBoxAt(x, y, { dashing });
    return !obstacleBoxes.some(obstacleBox => boxesOverlap(standingBox, obstacleBox));
  }

  globalThis.GeoffreyRuntimePhysics = Object.freeze({
    JUMP_GRAVITY,
    ARC_SAMPLE_MARGIN,
    PLAYER_NODE_CENTER_OFFSET,
    PLAYER_STANDING_HEIGHT,
    PLAYER_SLIDE_HEIGHT,
    PLAYER_BOTTOM_INSET,
    PLATFORM_LANDING_TOLERANCE,
    jumpSpeedForViewHeight,
    jumpArcSamples,
    playerBoxAt,
    boxesOverlap,
    platformSupports,
    canLandOnPlatform,
    hasStandingClearance,
  });
})();
