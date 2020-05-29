import { Circle } from './circle.js';

function CircleManager(p5) {
  var p = p5,
    circles = [],
    addCircle = function (args, p5) {
      return new Circle(args, p5);
    };

  return addCircle;
}

function init() {
  new p5(function (p) {
    var parentCircle;
    var childCircles = [];
    var numChildren = 12;
    var vars = {
      divisions: numChildren,
      depth: 2,
      opacity: 0.015,
      r: 255,
      g: 255,
      b: 255,
    };

    var fill;
    var updateOpacity = function () {
      //TODO: make this more dynamic based on divisions as well as depth
      fill =
        'rgba(' +
        vars.r +
        ',' +
        vars.g +
        ',' +
        vars.b +
        ',' +
        vars.opacity +
        ')';
    };

    updateOpacity();

    p.setup = function () {
      p.createCanvas(600, 600);

      parentCircle = new Circle(
        {
          x: p.width / 2,
          y: p.height / 2,
          rad: 60,
          divisions: numChildren,
        },
        p
      );

      var controls = new bufi('#controls');

      controls.addControlGroup(
        [
          {
            type: 'range',
            options: {
              label: 'divisions',
              min: 0,
              max: 24,
              value: vars.divisions,
              step: 1,
            },
            callback: function (val) {
              if (val !== parentCircle.divisions) {
                parentCircle.divisions = val;
                parentCircle.updateChildren();
                updateOpacity();
              }
            },
          },
          {
            type: 'range',
            options: {
              label: 'depth',
              min: 0,
              max: 3,
              value: vars.depth,
              step: 1,
            },
            callback: function (val) {
              if (val !== parentCircle.maxDepth) {
                parentCircle.maxDepth = val;
                parentCircle.updateChildren();
                updateOpacity();
              }
            },
          },
          {
            type: 'range',
            options: {
              label: 'opacity',
              min: 0,
              max: 0.1,
              value: vars.opacity,
              step: 0.0001,
            },
            callback: function (val) {
              vars.opacity = val;
              updateOpacity();
            },
          },
        ],
        'options',
        'options'
      );

      controls.addControlGroup(
        [
          {
            type: 'range',
            options: { label: 'r', min: 0, max: 255, value: vars.r, step: 1 },
            callback: function (val) {
              vars.r = val;
              updateOpacity();
            },
          },
          {
            type: 'range',
            options: { label: 'g', min: 0, max: 255, value: vars.g, step: 1 },
            callback: function (val) {
              vars.g = val;
              updateOpacity();
            },
          },
          {
            type: 'range',
            options: { label: 'b', min: 0, max: 255, value: vars.b, step: 1 },
            callback: function (val) {
              vars.b = val;
              updateOpacity();
            },
          },
        ],
        'colours',
        'colourControls'
      );
    };

    p.draw = function () {
      p.background(0);
      p.noStroke();

      p.fill(fill);
      parentCircle.draw();
    };
  }, 'sketch01');
}

export { init };
