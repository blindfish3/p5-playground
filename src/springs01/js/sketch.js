blindfish.p5 = new p5(function (p) {
  var dx,
    dy,
    angle,
    numBalls = 10,
    springLength = 25,
    balls = [],
    variables = new blindfish.VariableManager([
      { name: 'gravity', default: 0.3 },
      { name: 'friction', default: 0.99 },
      { name: 'spring', default: 0.99 },
      { name: 'bounce', default: 0.99 },
    ]);

  p.setup = function () {
    // create canvas
    p.createCanvas(710, 400);

    for (var i = 0; i < numBalls; i++) {
      balls[i] = new blindfish.Ball(
        {
          x: p.width / 2,
          y: p.height / 2,
          vx: 0,
          vy: 0,
          rad: 20,
        },
        p,
        variables
      );
    }
  };

  p.draw = function () {
    p.background(0, 155, 155);

    dx = balls[0].x - p.mouseX;
    dy = balls[0].y - p.mouseY;
    angle = Math.atan2(dy, dx);

    balls[0].targetX = p.mouseX + Math.cos(angle) * springLength;
    balls[0].targetY = p.mouseY + Math.sin(angle) * springLength;

    p.line(p.mouseX, p.mouseY, balls[0].x, balls[0].y);

    for (var i = 0; i < numBalls; i++) {
      var a = balls[i];

      if (i > 0) {
        var b = balls[i - 1];

        dx = a.x - b.x;
        dy = a.y - b.y;
        angle = Math.atan2(dy, dx);
        a.targetX = b.x + Math.cos(angle) * springLength;
        a.targetY = b.y + Math.sin(angle) * springLength;
        p.line(b.x, b.y, a.x, a.y);
      }

      a.vx += (a.targetX - a.x) * blindfish.g.spring;
      a.vy += (a.targetY - a.y) * blindfish.g.spring;

      a.vy += blindfish.g.gravity;
      a.vx *= blindfish.g.friction;
      a.vy *= blindfish.g.friction;
      a.x += a.vx;
      a.y += a.vy;

      a.draw();
    }
  };
}, 'sketch01');
