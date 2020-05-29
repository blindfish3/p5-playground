import { Segment } from './Segment.js';

function init() {
  new p5(function (p) {
    var segments = [],
      limit = 30,
      length = 15;

    p.setup = function () {
      p.createCanvas(600, 400);
      p.strokeWeight(12);
      p.stroke(60, 60, 60, 50);

      for (var i = 0; i < limit; i++) {
        var segment = new Segment(
          p.width / 2 - length * i,
          p.height / 2 - length * 1,
          length
        );
        segments[i] = segment;

        if (i === 0) {
          segment.setTarget(p.width / 2, p.height / 2);
        } else {
          var previousSegment = segments[i - 1];
          segment.setTarget(previousSegment.x1, previousSegment.y1);
        }
      }
    };

    p.draw = function () {
      p.background(225, 220, 210);

      for (var i = 0; i < limit; i++) {
        var segment = segments[i];

        if (i === 0) {
          segment.setTarget(p.mouseX, p.mouseY);
        } else {
          var previousSegment = segments[i - 1];
          segment.setTarget(previousSegment.x1, previousSegment.y1);
        }
        segment.draw(p);
      }
    };
  }, 'sketch01');
}

export { init };
