console.info('body');
blindfish.Body = function (args) {
  this.x = args.x;
  this.y = args.y;
  this.vx = args.vx || 0;
  this.vy = args.vy || 0;
  this.mass = args.mass || 1;
  //      radius;
  this.gravityAffected = args.gravityAffected || true;
  this.frictionAffected = args.frictionAffected || true;
  this.alive = args.alive || true;
  this.deadZone = args.deadZone || 20;
};

blindfish.Body.prototype.move = function () {
  var p = blindfish.p5;

  if (this.alive) {
    if (this.gravityAffected) {
      this.vy += blindfish.g.gravity;
    }
    if (this.frictionAffected) {
      this.vx *= blindfish.g.friction;
      this.vy *= blindfish.g.friction;
    }

    this.x += this.vx;
    this.y += this.vy;

    //      p.ellipse(this.x, this.y, 10,10);

    this.checkConstraints();
  } else {
    this.remove();
  }
};

blindfish.Body.prototype.checkConstraints = function () {
  var p = blindfish.p5;
  //constraints
  if (this.x < -this.deadZone) {
    this.x = p.width + this.deadZone;
  } else if (this.x > p.width + this.deadZone) {
    this.x = -this.deadZone;
  }
  if (this.y < -this.deadZone) {
    this.y = p.height + this.deadZone;
  } else if (this.y > p.height + this.deadZone) {
    this.y = -this.deadZone;
  }
};

// more than likely this will involve unregisterDraw() as well
// as removal from container
blindfish.Body.prototype.remove = function () {};
