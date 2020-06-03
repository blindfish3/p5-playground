import { constants } from './globals.js';

const Mover = function (args, p5, vars) {
  // console.log('Mover', args, vars);
  this.p = p5;
  this.x = args.x;
  this.y = args.y;
  this.vx = args.vx;
  this.vy = args.vy;
  this.globals = vars;
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
  moveObjects.call(this, true, this.p);
};

// By using the base characteristics of a Mover object we
// can write generic functions that add desired behaviours
// without making them methods of a class
function moveObjects(keepInBounds, p) {
  if (this instanceof Mover) {
    if (this.moving) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.globals.gravityOn) {
        this.vy -= this.globals.gravity;
      }
      this.vx *= this.globals.friction;
      this.vy *= this.globals.friction;

      if (keepInBounds) {
        if (this.x > p.width - this.rad) {
          this.x = p.width - this.rad;
          this.vx *= -this.bounce;
        } else if (this.x < 0 + this.rad) {
          this.x = 0 + this.rad;
          this.vx *= -this.bounce;
        }

        if (this.y > p.height - this.rad) {
          this.y = p.height - this.rad;
          this.vy *= -this.bounce;
        } else if (this.y < 0 + this.rad) {
          this.y = 0 + this.rad;
          this.vy *= -this.bounce;
        }
      }
    }
    //WARNING:  kludge
    else {
      this.x = p.mouseX;
      this.y = p.mouseY;
    }
  }
  // else throw error
  else {
    console.error('not an instance of Mover');
  }
}

export { Mover, moveObjects };
