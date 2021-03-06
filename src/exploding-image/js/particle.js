const globals = {
  gravity: 0.0,
  friction: 0.99,
  spring: 0.05,
};

const Particle = function (args, p5) {
  this.p5 = p5;
  this.x = args.x;
  this.y = args.y;
  this.vx = args.vx || 0;
  this.vy = args.vy || 0;

  this.size = args.size;
  this.img = args.img;

  this.imgWidth = this.img.width;
  this.imgHeight = this.img.height;

  this.originX = this.x;
  this.originY = this.y;
  this.returnToOrigin = true;
};

Particle.prototype.draw = function (mouse_x, mouse_y, mouseOverStage) {
  var dx = mouse_x - this.x,
    dy = mouse_y - this.y,
    deltaSquared = dx * dx + dy * dy,
    angle = Math.atan2(dy, dx),
    speed = -deltaSquared;

  // TODO: replace th if mouseIsOverWindow
  // but first check behaviour with displayImg condtion removed...
  if (mouseOverStage) {
    if (deltaSquared < 2400) {
      this.returnToOrigin = false;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }
  }
  if (deltaSquared > 4800) {
    this.moveToOrigin();
  }

  this.x += this.vx;
  this.y += this.vy;

  this.p5.image(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
};

Particle.prototype.moveToOrigin = function () {
  if (this.returnToOrigin) {
    this.x = this.originX;
    this.y = this.originY;
  } else {
    this.vx = 0;
    this.vy = 0;

    var dx2 = this.originX - this.x,
      dy2 = this.originY - this.y;

    this.vx += dx2 * globals.spring;
    this.vy += dy2 * globals.spring;
    this.vx *= globals.friction;
    this.vy *= globals.friction;

    if (Math.abs(dx2) < 0.05 && Math.abs(dy2) < 0.05) {
      this.returnToOrigin = true;
    }
  }
};

export { Particle };
