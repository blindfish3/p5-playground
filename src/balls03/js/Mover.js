blindfish.Mover = function (x, y, vx, vy, polarity) {
  var p = blindfish.p5;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.polarity = polarity;

  this.moving = true;
  this.rad = 2;
  this.bounce = 0.9;
  this.mass = 3;
  this.polarity = blindfish.c.POLES[Math.round(Math.random())];
};

blindfish.Mover.prototype.draw = function () {
  var p = blindfish.p5;

  p.ellipseMode(p.RADIUS);
  p.fill(0, 0, 0);
  p.ellipse(this.x, this.y, this.rad, this.rad);
};

blindfish.Mover.prototype.update = function () {
  var p = blindfish.p5;
  this.draw();
  blindfish.moveObjects(this, true);
};
