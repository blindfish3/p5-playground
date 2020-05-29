import { constants, globals } from './globals.js';

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

// By using the base characteristics of a Mover object we
// can write generic functions that add desired behaviours
// without making them methods of a class
function moveObjects(m, keepInBounds, p) {
  if (m instanceof Mover) {
    if (m.moving) {
      m.x += m.vx;
      m.y += m.vy;
      if (globals.gravityOn) {
        m.vy -= globals.gravity;
      }
      m.vx *= globals.friction;
      m.vy *= globals.friction;

      if (keepInBounds) {
        if (m.x > p.width - m.rad) {
          m.x = p.width - m.rad;
          m.vx *= -m.bounce;
        } else if (m.x < 0 + m.rad) {
          m.x = 0 + m.rad;
          m.vx *= -m.bounce;
        }

        if (m.y > p.height - m.rad) {
          m.y = p.height - m.rad;
          m.vy *= -m.bounce;
        } else if (m.y < 0 + m.rad) {
          m.y = 0 + m.rad;
          m.vy *= -m.bounce;
        }
      }
    }
    //WARNING:  kludge
    else {
      m.x = p.mouseX;
      m.y = p.mouseY;
    }
  }
  // else throw error
  else {
    console.error('not an instance of Mover');
  }
}

export { Mover, moveObjects };
