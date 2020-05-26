// This code adapted from Actionscript Animation - Keith Peters - Friends of Ed 2006
blindfish.checkCollision = function (thing0, thing1, dx, dy, distSquared) {
  if (distSquared < (thing0.rad + thing1.rad) * (thing0.rad + thing1.rad)) {
    // calculate angle, sine & cosine
    var angle = Math.atan2(dy, dx),
      sine = Math.sin(angle),
      cosine = Math.cos(angle),
      pos0 = new blindfish.Vector(0, 0),
      // rotate thing1's position
      pos1 = blindfish.rotateVector(dx, dy, sine, cosine, true),
      // rotate thing0's velocity
      //    Vector vel0 = new Vector();
      vel0 = blindfish.rotateVector(thing0.vx, thing0.vy, sine, cosine, true),
      // rotate thing1's velocity
      vel1 = blindfish.rotateVector(thing1.vx, thing1.vy, sine, cosine, true),
      // collision reaction
      vxTotal = vel0.x - vel1.x;

    vel0.x =
      ((thing0.mass - thing1.mass) * vel0.x + 2 * thing1.mass * vel1.x) /
      (thing0.mass + thing1.mass);

    vel1.x = vxTotal + vel0.x;

    // update position
    var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
      overlap = thing0.rad + thing1.rad - Math.abs(pos0.x - pos1.x);

    pos0.x += (vel0.x / absV) * overlap;
    pos1.x += (vel1.x / absV) * overlap;

    //rotate positions back
    (pos0F = blindfish.rotateVector(pos0.x, pos0.y, sine, cosine, false)),
      (pos1F = blindfish.rotateVector(pos1.x, pos1.y, sine, cosine, false));

    // adjust positions to screen positions
    thing1.x = thing0.x + pos1F.x;
    thing1.y = thing0.y + pos1F.y;
    thing0.x = thing0.x + pos0F.x;
    thing0.y = thing0.y + pos0F.y;

    // rotate velocities back
    var vel0F = blindfish.rotateVector(vel0.x, vel0.y, sine, cosine, false),
      vel1F = blindfish.rotateVector(vel1.x, vel1.y, sine, cosine, false);

    thing0.vx = vel0F.x;
    thing0.vy = vel0F.y;
    thing1.vx = vel1F.x;
    thing1.vy = vel1F.y;
  }
};

blindfish.rotateVector = function (x, y, sine, cosine, reverse) {
  var rX, rY, result;

  if (reverse) {
    rX = x * cosine + y * sine;
    rY = y * cosine - x * sine;
  } else {
    rX = x * cosine - y * sine;
    rY = y * cosine + x * sine;
  }
  result = new blindfish.Vector(rX, rY);
  return result;
};

blindfish.Vector = function (x, y) {
  this.x = x;
  this.y = y;
};
