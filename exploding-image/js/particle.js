blindfish.Particle = function (args) {
    blindfish.Body.call(this, args);

    this.size = args.size;
    this.img = args.img;

    this.imgWidth = this.img.width;
    this.imgHeight = this.img.height;
    
    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;
    this.originX = this.x;
    this.originY = this.y;
    this.doGoToOrigin = true;

}

blindfish.Particle.prototype = Object.create(blindfish.Body.prototype);

blindfish.Particle.prototype.draw = function () {
    var p = blindfish.p5;

    this.move();
    
    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    var dx = p.mouseX - this.centreX,
        dy = p.mouseY - this.centreY,
        deltaSquared = dx * dx + dy * dy,
        angle = Math.atan2(dy, dx),
        speed = deltaSquared

    // TODO: replace th if mouseIsOverWindow
    // but first check behaviour with displayImg condtion removed...
    //    if(mouseIsOverSketch) {
    if (deltaSquared < 100) {
        this.doGoToOrigin = false;
        this.vx = Math.cos(angle) * (speed);
        this.vy = Math.sin(angle) * (speed);
    }
    if (deltaSquared > 20000) {
        this.moveToOrigin(true);
    }

    p.image(this.img, this.x, this.y, this.imgWidth, this.imgHeight);

}

blindfish.Particle.prototype.moveToOrigin = function (spring) {
    if (this.doGoToOrigin) {
        this.x = this.originX;
        this.y = this.originY;
    } else {
        this.vx = 0;
        this.vy = 0;
        var dx2 = this.originX - this.x;
        var dy2 = this.originY - this.y;


        if (Math.abs(dx2) < 0.05 && Math.abs(dy2) < 0.05) {
            this.doGoToOrigin = true;
        }

        this.vx += dx2 * blindfish.g.spring;
        this.vy += dy2 * blindfish.g.spring;
        this.vx *= blindfish.g.friction;
        this.vy *= blindfish.g.friction;

    }
}