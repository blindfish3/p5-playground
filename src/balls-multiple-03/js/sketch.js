import {
  dragTracker as DragTracker,
  globals,
  selected,
  setSelected,
  setGlobal,
} from '../../lib/balls/globals.js';

import { Mover } from '../../lib/balls/Mover.js';
import { Ball } from '../../lib/balls/Ball.js';
import { applyGravity } from '../../lib/balls/applyGravity.js';
import { checkCollision } from '../../lib/balls/checkCollision.js';

function init() {
  new p5(function (p) {
    makeBalls(p, '#sketch01', 'a', {
      gravity: -0.3,
      friction: 1,
      gravityOn: true,
      collisionsOn: false,
      polarityOn: false,
    });
  }, 'sketch01');

  new p5(function (p) {
    makeBalls(p, '#sketch02', 'b', globals);
  }, 'sketch02');

  /*
  new p5(function (p) {
      makeBalls(p, '#sketch03', 'c');
  }, 'sketch03');

  new p5(function (p) {
      makeBalls(p, '#sketch04', 'd');
  }, 'sketch04');
*/
}

function makeBalls(p, id, identifier, vars) {
  var sketchID = p._userNode;
  var things = [];
  var limit = 10;
  var combinedLimit = limit * 2;
  var dragTracker = DragTracker(10);
  var vars = vars || globals;

  p.setup = function () {
    p.createCanvas(280, 400);
    addControls(id, vars, identifier);
    // Add balls...
    for (var i = 0; i < limit; i++) {
      things[i] = new Mover(
        {
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(8) - 4,
          vy: p.random(8) - 4,
        },
        p,
        vars
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
        vars
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
            var dx = thing1.x - thing0.x,
              dy = thing1.y - thing0.y,
              distSquared = dx * dx + dy * dy;
            if (vars.polarityOn) {
              applyGravity(thing0, thing1, dx, dy, distSquared);
            }
            if (vars.collisionsOn) {
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
          // Note that this is still a gloabl
          // We get away with it because you can't mouseOver multiple sketches!
          setSelected(thing);
          // this is essential in order to avoid multiple balls being selected.
          break;
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
}

function addControls(id, vars, identifier) {
  const controls = new bufi(id);
  // add controls
  controls.addControlGroup(
    [
      {
        type: 'range',
        options: {
          label: 'Gravity',
          min: -0.5,
          max: 0.5,
          value: vars.gravity,
          step: 0.025,
        },
        callback: function (val) {
          vars.gravity = val;
        },
      },
      {
        type: 'range',
        options: {
          label: 'Friction',
          min: 0,
          max: 0.5,
          value: 1 - vars.friction,
          step: 0.001,
        },
        callback: function (val) {
          vars.friction = 1 - val;
        },
      },
      {
        type: 'checkbox',
        options: {
          id: 'polarityButton' + identifier,
          label: 'ball polarity',
          checked: vars.polarityOn,
        },
        callback: function (val) {
          vars.polarityOn = val;
        },
      },
      {
        type: 'checkbox',
        options: {
          id: 'collisionButton' + identifier,
          label: 'ball collisions',
          checked: vars.collisionsOn,
        },
        callback: function (val) {
          vars.collisionsOn = val;
        },
      },
    ],
    'options'
  );

  return controls;
}

export { init };
