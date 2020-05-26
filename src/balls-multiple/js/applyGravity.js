import { globals } from './blindfish.js';

const applyGravity = function (thing0, thing1, dx, dy, distSquared) {
  var dist = Math.sqrt(distSquared),
    force = (thing0.mass * thing1.mass) / distSquared;

  if (dist > (thing0.rad + thing1.rad) / 2) {
    var ax, ay;

    if (thing0.polarity * thing1.polarity > 0 && globals.polarityOn) {
      ax = (-force * dx) / dist;
      ay = (-force * dy) / dist;
    } else {
      ax = (force * dx) / dist;
      ay = (force * dy) / dist;
    }

    thing0.vx += ax / thing0.mass;
    thing0.vy += ay / thing0.mass;
    thing1.vx -= ax / thing1.mass;
    thing1.vy -= ay / thing1.mass;
  }
};

export { applyGravity };
