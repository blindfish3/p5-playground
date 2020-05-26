blindfish.makeBalls = function (p, id, identifier) {
  var sketchID = p._userNode;
  var things = [];
  var limit = 10;
  var combinedLimit = limit * 2;
  var dragTracker = blindfish.dragTracker(10);
  var vars = {
    gravity: 0,
    friction: 0.99,
    collisionsOn: true,
    polarityOn: true,
  };
  var controls = new bufi(id);

  p.setup = function () {
    p.createCanvas(280, 400);

    // add controls

    controls.addControlGroup(
      [
        {
          type: 'range',
          options: {
            label: 'Gravity',
            min: -0.2,
            max: 0.2,
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
            max: 0.05,
            value: vars.friction,
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
            checked: true,
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
            checked: true,
          },
          callback: function (val) {
            vars.collisionsOn = val;
          },
        },
      ],
      'options'
    );

    // Add balls...
    for (var i = 0; i < limit; i++) {
      things[i] = new blindfish.Mover(
        {
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(8) - 4,
          vy: p.random(8) - 4,
        },
        p,
        vars
      );

      things[limit + i] = new blindfish.Ball(
        {
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(8) - 4,
          vy: p.random(8) - 4,
          polarity: p.floor(p.random(1) - 1),
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
              blindfish.applyBallGravity(thing0, thing1, dx, dy, distSquared);
            }
            if (vars.collisionsOn) {
              blindfish.checkCollision(thing0, thing1, dx, dy, distSquared);
            }
          }
        }
      }

      things[i].update();
    }

    if (blindfish.selected && p.mouseIsPressed) {
      // if a ball is selected then it's being dragged and we need to track mouse motion
      dragTracker.track(p.createVector(p.mouseX, p.mouseY));
    }
  };

  p.mousePressed = function () {
    if (!blindfish.selected) {
      for (var i = combinedLimit - 1; i > -1; i--) {
        var thing = things[i];

        if (thing.mouseOver) {
          thing.moving = false;
          // Note that this is stilla gloabl
          // We get away with it because you can't mouseOver multiple sketches!
          blindfish.selected = thing;
          // this is essential in order to avoid multiple balls being selected.
          break;
        }
      }
    }
  };

  p.mouseReleased = function () {
    if (blindfish.selected) {
      dragTracker.release();
      blindfish.selected.moving = true;
      blindfish.selected = undefined;
    }
  };
};

blindfish.p51 = new p5(function (p) {
  blindfish.makeBalls(p, '#sketch01', 'a');
}, 'sketch01');

blindfish.p52 = new p5(function (p) {
  blindfish.makeBalls(p, '#sketch02', 'b');
}, 'sketch02');

/*
blindfish.p53 = new p5(function (p) {
    blindfish.makeBalls(p, '#sketch03', 'c');
}, "sketch03");


blindfish.p54 = new p5(function (p) {
    blindfish.makeBalls(p, '#sketch04', 'd');
}, "sketch04");

*/
