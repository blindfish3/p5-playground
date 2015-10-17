
blindfish.Particle = function (args) {
    blindfish.Body.call(this, args);

    this.vx = Math.random();
    this.vy = Math.random();
    this.rad = 10;

}

blindfish.Particle.prototype = Object.create(blindfish.Body.prototype);

blindfish.Particle.prototype.render = function() {
  var p = blindfish.p5;
    p.fill(0);
    p.stroke(255);
    p.ellipse(this.x,this.y, this.rad, this.rad);

    this.move();

    //TODO: handle wall bounces first...

//        if (keepInBounds) {
                if (this.x > p.width - this.rad) {
                    this.x = p.width - this.rad;
                    this.vx *= -1;
                } else if (this.x < 0 + this.rad) {
                    this.x = 0 + this.rad;
                    this.vx *= -1;
                }

                if (this.y > p.height - this.rad) {
                    this.y = p.height - this.rad;
                    this.vy *= -1;
                } else if (this.y < 0 + this.rad) {
                    this.y = 0 + this.rad;
                    this.vy *= -1;
                }
//            }



    var bgColour = blindfish.g.buffer.get(this.x, this.y);
    if (bgColour && bgColour[3] !== 0) {
                // hit!

        this.vx *= -1;
        this.vy *= -1;
        // a crude but simple way to ensure particles never get 'stuck':
        // They can never go beyond the point of no return
        this.x += this.vx;
        this.y += this.vy;

        blindfish.g.bgColour = bgColour;
            }

};
