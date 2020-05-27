import { Body } from '/lib/body.js';

const Particle = function (args, p5, globals) {
  Body.call(this, args, p5, globals);

  this.vx = Math.random() * 4 - 2;
  this.vy = 0;
  this.rad = 7;
};

Particle.prototype = Object.create(Body.prototype);

Particle.prototype.render = function () {
  // This must happen before any particle specific adjustments
  this.move();

  var p = this.p5,
    bgColour,
    hitWall = false,
    // perhaps an optimisation too far
    x = this.x,
    y = this.y,
    r = this.rad;

  p.fill(150, 150, 0);

  p.ellipse(x, y, r, r);

  if (x > p.width - r) {
    this.x = p.width - r;
    this.vx *= -1;
    hitWall = true;
  } else if (x < r) {
    this.x = r;
    this.vx *= -1;
    hitWall = true;
  }

  if (y > p.height - r) {
    this.y = p.height - r;
    this.vy *= -1;
    hitWall = true;
  } else if (y < r) {
    this.y = r;
    this.vy *= -1;
    hitWall = true;
  }

  //WARNING:  assuming it's not possible to hit both wall and beast simultaneously :/
  //TODO: test if within sprite bounds before doing expensive get() operation?
  // That would require us to know about all sprites from here...
  if (!hitWall) {
    bgColour = this.globals.buffer.get(this.x, this.y);

    if (bgColour && bgColour[3] !== 0) {
      // hit!
      this.x = 1 + Math.random() * (p.width - 2);
      this.y = 1;
      this.vx = Math.random() * 4 - 2;
      this.vy = 0;
      //TODO: replace with a less ugly response
      this.globals.bgColour = bgColour;

      // the red channel for each defined region in beast_mask2.png
      // now increments by 1, meaning a condition need only inspect a
      // single value to determine which region is hit
      var index = bgColour[0];
      //TODO: switch(index)...
    }
  }
};

export { Particle };
