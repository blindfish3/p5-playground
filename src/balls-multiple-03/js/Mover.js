blindfish.Mover = function (args, p5, variables) {
  this.p = p5;
  this.g = variables;
  this.x = args.x;
  this.y = args.y;
  this.vx = args.vx;
  this.vy = args.vy;

  this.moving = true;
  this.rad = 2;
  this.bounce = 0.9;
  this.mass = 3;
  this.polarity = blindfish.c.POLES[Math.round(Math.random())];
};

blindfish.Mover.prototype.draw = function () {
  var p = this.p;
  p.ellipseMode(p.RADIUS);
  p.fill(0, 0, 0);
  p.ellipse(this.x, this.y, this.rad, this.rad);
};

blindfish.Mover.prototype.update = function () {
  this.draw();
  blindfish.moveObjects(this, true, this.p, this.g);
};
