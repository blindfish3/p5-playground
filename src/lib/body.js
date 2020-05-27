const Body = function (args, p5, globals) {
  this.p5 = p5;
  this.globals = globals;
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

Body.prototype.move = function () {
  var p = this.p5;
  const globals = this.globals;

  if (this.alive) {
    if (this.gravityAffected) {
      this.vy += globals.gravity;
    }
    if (this.frictionAffected) {
      this.vx *= globals.friction;
      this.vy *= globals.friction;
    }

    this.x += this.vx;
    this.y += this.vy;

    //      p.ellipse(this.x, this.y, 10,10);

    this.checkConstraints();
  } else {
    this.remove();
  }
};

Body.prototype.checkConstraints = function () {
  var p = p5;
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
Body.prototype.remove = function () {};

export { Body };
