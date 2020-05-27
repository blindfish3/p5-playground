import { constants } from './blindfish.js';
import { moveObjects } from './moveObjects.js';

const Mover = function (args, p5) {
  this.p = p5;
  this.x = args.x;
  this.y = args.y;
  this.vx = args.vx;
  this.vy = args.vy;

  this.moving = true;
  this.rad = 2;
  this.bounce = 0.9;
  this.mass = 3;
  this.polarity = constants.POLES[Math.round(Math.random())];
};

Mover.prototype.draw = function () {
  var p = this.p;
  p.ellipseMode(p.RADIUS);
  p.fill(0, 0, 0);
  p.ellipse(this.x, this.y, this.rad, this.rad);
};

Mover.prototype.update = function () {
  this.draw();
  moveObjects(this, true, this.p);
};

export { Mover };
