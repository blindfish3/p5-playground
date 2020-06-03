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
  const { width, height, mouseX, mouseY } = this.p;
  const bounds = { width, height };
  const override = { x: mouseX, y: mouseY };
  moveObjects(this, true, bounds, override);
};

// By using the base characteristics of a Mover object we
// can write generic functions that add desired behaviours
// without making them methods of a class
function moveObjects(object, keepInBounds, bounds, override) {
  const { x, y, vx, vy, rad, bounce, globals, moving } = object;
  const { friction, gravity, gravityOn } = globals;

  if (object instanceof Mover) {
    if (moving) {
      object.x += vx;
      object.y += vy;
      if (gravityOn) {
        object.vy -= gravity;
      }
      object.vx *= friction;
      object.vy *= friction;

      if (keepInBounds) {
        if (x > bounds.width - rad) {
          object.x = bounds.width - rad;
          object.vx *= -bounce;
        } else if (x < 0 + rad) {
          object.x = 0 + rad;
          object.vx *= -bounce;
        }

        if (y > bounds.height - rad) {
          object.y = bounds.height - rad;
          object.vy *= -bounce;
        } else if (y < 0 + rad) {
          object.y = 0 + rad;
          object.vy *= -bounce;
        }
      }
    }
    //WARNING:  kludge
    else {
      object.x = override.x;
      object.y = override.y;
    }
  }
  // else throw error
  else {
    console.error('not an instance of Mover');
  }
}

export { Mover, moveObjects };
