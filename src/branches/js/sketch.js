import { Tree, globals } from './tree.js';

new p5(function (p) {
  var tree1;
  var tree2;
  var tree3;
  var moveStep = 0;
  var controls = new bufi('#controls');
  // in theory vars and controls could be added to the Tree class itself...
  var vars = {
    length: 160,
    spread: 90,
    weight: 16,
    branchRatio: globals.PHI,
  };

  p.setup = function () {
    p.createCanvas(600, 600);
    // controls affect only the first tree
    tree1 = new Tree(
      p,
      p.width * 0.5,
      p.height,
      vars.length,
      p.radians(vars.spread),
      5,
      4,
      vars.weight
    );

    tree2 = new Tree(p, p.width * 0.2, p.height, 70, p.radians(90), 3, 6);
    tree3 = new Tree(p, p.width * 0.8, p.height, 70, p.radians(90), 6, 3);

    controls.addControlGroup(
      [
        {
          type: 'range',
          options: {
            label: 'length',
            min: 10,
            max: 200,
            value: vars.length,
            step: 5,
          },
          callback: function (val) {
            tree1.updateTreeHeight(val);
          },
        },
        {
          type: 'range',
          options: {
            label: 'ratio',
            min: globals.PHI / 2,
            max: globals.TAU,
            value: vars.branchRatio,
            step: 0.01,
          },
          callback: function (val) {
            tree1.updateTreeBranchRatio(val);
          },
        },
        {
          type: 'range',
          options: {
            label: 'spread',
            min: 0,
            max: 360,
            value: vars.spread,
            step: 5,
          },
          callback: function (val) {
            tree1.updateTreeAngle(val);
          },
        },
        {
          type: 'range',
          options: {
            label: 'weight',
            min: 3,
            max: 60,
            value: vars.weight,
            step: 1,
          },
          callback: function (val) {
            tree1.updateTreeWeight(val);
          },
        },
      ],
      'controls'
    );
  };

  p.draw = function () {
    p.background(230, 240, 255);
    p.stroke(100, 200, 100, 20);
    tree2.draw();
    tree3.draw();
    p.stroke(200, 166, 0, 50);
    tree1.draw();
  };
}, 'sketch01');
