import {
  dragTracker as DragTracker,
  globals,
  selected,
  setSelected,
} from '../../lib/balls/globals.js';
import { Mover } from '../../lib/balls/Mover.js';
import { Ball } from '../../lib/balls/Ball.js';
import { applyGravity } from '../../lib/balls/applyGravity.js';
import { checkCollision } from '../../lib/balls/checkCollision.js';

function init() {
  new p5(function (p) {
    var things = [];
    var limit = 20;
    var combinedLimit = limit * 2;
    var dragTracker = DragTracker(10);

    p.setup = function () {
      p.createCanvas(600, 400);

      for (var i = 0; i < limit; i++) {
        things[i] = new Mover(
          {
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(8) - 4,
            vy: p.random(8) - 4,
          },
          p,
          globals
        );

        things[limit + i] = new Ball(
          {
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(8) - 4,
            vy: p.random(8) - 4,
            rad: p.floor(p.random(10, 20)),
          },
          p,
          globals
        );
      }
    };

    p.draw = function () {
      p.background(0, 155, 155);

      for (var i = 0; i < combinedLimit; i++) {
        var thing0 = things[i];

        if (i < combinedLimit - 1) {
          for (var j = i + 1; j < combinedLimit; j++) {
            var thing1 = things[j];

            if (thing0.moving && thing1.moving) {
              var dx = thing1.x - thing0.x;
              var dy = thing1.y - thing0.y;
              var distSquared = dx * dx + dy * dy;
              if (globals.polarityOn) {
                applyGravity(thing0, thing1, dx, dy, distSquared);
              }
              if (globals.collisionsOn) {
                checkCollision(thing0, thing1, dx, dy, distSquared);
              }
            }
          }
        }

        things[i].update();
      }

      if (selected && p.mouseIsPressed) {
        // if a ball is selected then it's being dragged and we need to track mouse motion
        dragTracker.track(p.createVector(p.mouseX, p.mouseY));
      }
    };

    p.mousePressed = function () {
      if (!selected) {
        for (var i = combinedLimit - 1; i > -1; i--) {
          var thing = things[i];

          if (thing.mouseOver) {
            thing.moving = false;
            setSelected(thing);
          }
        }
      }
    };

    p.mouseReleased = function () {
      if (selected) {
        dragTracker.release();
        selected.moving = true;
        setSelected(undefined);
      }
    };
  }, 'sketch01');
}

export { init };
