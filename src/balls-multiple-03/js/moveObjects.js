// By using the base characteristics of a Mover object we
// can write generic functions that add desired behaviours
// without making them methods of a class
blindfish.moveObjects = function (m, keepInBounds, p5, globals) {
  var p = p5,
    g = globals;

  if (m instanceof blindfish.Mover) {
    if (m.moving) {
      m.x += m.vx;
      m.y += m.vy;
      if (blindfish.g.gravityOn) {
        m.vy -= g.gravity;
      }
      m.vx *= g.friction;
      m.vy *= g.friction;

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
};
