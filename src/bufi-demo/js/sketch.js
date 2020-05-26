(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.sketch = f();
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == 'function' && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = 'MODULE_NOT_FOUND'), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == 'function' && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })(
    {
      1: [
        function (require, module, exports) {
          var log = function (input) {
            console.log(input);
          };

          // Tell the module what to return/export
          module.exports = log;
        },
        {},
      ],
      2: [
        function (require, module, exports) {
          var circle = function (x, y, vars) {
            this.x = x || 0;
            this.y = y || 0;
            this.vars = vars;
          };

          circle.prototype.draw = function () {
            var p = P$; // avoid repetition
            var adjust = this.vars.animate ? Math.sin(this.vars.angle) : 0;
            var radius = Number(this.vars.radius) + adjust * 15;
            p.ellipse(this.x, this.y, radius, radius);
          };

          circle.prototype.setRadius = function (r) {
            this.radius = r;
          };

          // Tell the module what to return/export
          module.exports = circle;
        },
        {},
      ],
      3: [
        function (require, module, exports) {
          var controlConfig = function (controls, vars, xOffset, yOffset) {
            // WARNING: only use to clone 'simple' objects!
            // having a copy of vars makes it easy to reset to defaults later
            var defaults = JSON.parse(JSON.stringify(vars));

            return {
              circleControls: [
                {
                  type: 'range',
                  options: {
                    id: 'radius',
                    label: 'radius',
                    min: 4,
                    max: Math.ceil(xOffset + yOffset),
                    step: 1,
                    value: vars.radius,
                  },
                  //NOTE: callback scope issues apply when object 'methods' are used as a callback...
                  // simple enough to workaround if you don't make object props private:
                  callback: function (val) {
                    vars.radius = val;
                  },
                  // Alternatively you can do the extra work required to maintain scope:
                  // callback: c.setRadius.bind(c) //preferred
                  // callback: function(val) { c.setRadius(val) } //kludge
                },
                {
                  type: 'range',
                  options: {
                    id: 'colourRed',
                    label: 'R',
                    min: 0,
                    max: 255,
                    step: 1,
                    value: vars.circleColour.r,
                  },
                  callback: function (val) {
                    vars.circleColour.r = val;
                  },
                },
                {
                  type: 'range',
                  options: {
                    id: 'colourGreen',
                    label: 'G',
                    min: 0,
                    max: 255,
                    step: 1,
                    value: vars.circleColour.g,
                  },
                  callback: function (val) {
                    vars.circleColour.g = val;
                  },
                },
                {
                  type: 'range',
                  options: {
                    id: 'colourBlue',
                    label: 'B',
                    min: 0,
                    max: 255,
                    step: 1,
                    value: vars.circleColour.b,
                  },
                  callback: function (val) {
                    vars.circleColour.b = val;
                  },
                },
                {
                  type: 'range',
                  options: {
                    id: 'colourAlpha',
                    label: 'alpha',
                    min: 0.1,
                    max: 1,
                    step: 0.01,
                    value: vars.circleColour.a,
                  },
                  callback: function (val) {
                    vars.circleColour.a = val;
                  },
                },
                {
                  type: 'checkbox',
                  options: {
                    id: 'strokeEnabled',
                    label: 'stroke enabled',
                    checked: vars.stroke,
                  },
                  callback: function (val) {
                    vars.stroke = val;
                  },
                },
              ],

              sketchControls: [
                {
                  type: 'radio',
                  options: {
                    id: 'bgColour',
                    label: 'background',
                    input: [
                      {
                        label: 'red',
                        value: 'red',
                      },
                      {
                        label: 'green',
                        value: 'green',
                      },
                      {
                        label: 'blue',
                        value: 'blue',
                      },
                    ],
                  },
                  callback: function (val) {
                    vars.background = val;
                  },
                },
                {
                  type: 'switch',
                  options: {
                    id: 'animEnabled',
                    on: 'move!',
                    off: 'static',
                    checked: vars.animate,
                  },
                  callback: function (val) {
                    vars.animate = val;
                  },
                },
                {
                  type: 'button',
                  options: {
                    label: 'reset',
                  },
                  callback: function () {
                    controls.setValue('radius', defaults.radius);
                    controls.setValue('colourRed', defaults.circleColour.r);
                    controls.setValue('colourGreen', defaults.circleColour.g);
                    controls.setValue('colourBlue', defaults.circleColour.b);
                    controls.setValue('colourAlpha', defaults.circleColour.a);
                    controls.setValue('strokeEnabled', defaults.stroke);
                    controls.setValue('animEnabled', defaults.animate);
                    controls.setValue('bgColour', defaults.background);
                  },
                },
              ],
            };
          };

          module.exports = controlConfig;
        },
        {},
      ],
      4: [
        function (require, module, exports) {
          (function (global) {
            'use strict';

            var b = {};
            var Circle = require('./_circle');
            var controlConfig = require('./_control-config');

            //TODO: find out how to reference root/_lib without relative paths
            b.log = require('../../_lib/_log');

            // Stop p5js polluting the global namespace by using instance mode
            global.P$ = new p5(function (p) {
              var circles = [];
              var numCircles = 10;
              var vars = {
                stroke: true,
                radius: 10,
                circleColour: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 0.25,
                },
                sketchColours: {
                  red: '#cc0000',
                  green: '#33cc33',
                  blue: '#0099dd',
                },
                background: 'red',
                animate: true,
                angle: 0,
              };
              var controls;
              var testCallback = function (val) {
                console.info('value in callback: ' + val);
              };

              p.setup = function () {
                p.createCanvas(400, 300);

                var xOffset = p.width / (numCircles + 1);
                var yOffset = p.height / (numCircles + 1);

                for (var i = 0; i < numCircles; i++) {
                  for (var j = 0; j < numCircles; j++) {
                    circles[i * numCircles + j] = new Circle(
                      xOffset + xOffset * i,
                      yOffset + yOffset * j,
                      vars
                    );
                  }
                }

                controls = new bufi('#control01');
                // adding grouped controls
                //NOTE: this feels a bit heavy going in order to externalise config
                var config = controlConfig(controls, vars, xOffset, yOffset);
                controls.addControlGroup(
                  config.circleControls,
                  'circle options'
                );
                controls.addControlGroup(
                  config.sketchControls,
                  'sketch options'
                );
                controls.setValue('bgColour', vars.background);
              };

              p.draw = function () {
                p.background(vars.sketchColours[vars.background]);
                var cc = vars.circleColour;
                var colour = 'rgba(' + [cc.r, cc.g, cc.b, cc.a].join(',') + ')';

                p.fill(colour);

                if (vars.stroke) {
                  p.strokeWeight(2);
                  p.stroke('#000');
                } else {
                  p.noStroke();
                }

                for (var i = 0, len = numCircles * numCircles; i < len; i++) {
                  circles[i].draw();
                }

                vars.angle += 0.05;
              };

              // p.mousePressed = function () {
              //
              // };

              // p.mouseReleased = function () {
              //
              // };
            }, 'sketch01');
          }.call(
            this,
            typeof global !== 'undefined'
              ? global
              : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
              ? window
              : {}
          ));
        },
        { '../../_lib/_log': 1, './_circle': 2, './_control-config': 3 },
      ],
    },
    {},
    [4]
  )(4);
});

//# sourceMappingURL=sketch.js.map
