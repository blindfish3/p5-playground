blindfish.Particle = function (args) {
    blindfish.Body.call(this, args);
    this.decay = args.decay || 0; //TODO: Set sensible default
    this.size = args.size;
    this.colour = args.colour;
    this.img = args.img;

    this.imgWidth = this.img.width;
    this.imgHeight = this.img.height;
    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;
    this.originX = this.x;
    this.originY = this.y;
    this.displayImg = true;

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
        angle = -Math.atan2(dy, dx),
        speed = deltaSquared / 100;

    // TODO: replace th if mouseIsOverWindow
    // but first check behaviour with displayImg condtion removed...
    //    if(mouseIsOverSketch) {
    if (deltaSquared < 400) {
        this.displayImg = false;
        this.vx = (Math.cos(angle) * speed) + (Math.random(4) - 2);
        this.vy = (Math.sin(angle) * speed) + (Math.random(4) - 2);
    }
    if (deltaSquared > 20000) {
        this.moveToOrigin(true);
    }


    if (this.displayImg) {
        p.noFill();
        p.image(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
    } else {
        p.rectMode(p.CENTER);
        p.fill(this.colour);
        p.rect(this.x, this.y, this.size, this.size);
    }

}

blindfish.Particle.prototype.moveToOrigin = function (spring) {
    if (this.displayImg) {
        this.x = this.originX;
        this.y = this.originY;
    } else {
        this.vx = 0;
        this.vy = 0;
        var dx2 = this.originX - this.x;
        var dy2 = this.originY - this.y;


        if (Math.abs(dx2) < 0.05 && Math.abs(dy2) < 0.05) {
            this.displayImg = true;
        }

        this.vx += dx2 * blindfish.g.spring;
        this.vy += dy2 * blindfish.g.spring;
        this.vx *= blindfish.g.friction;
        this.vy *= blindfish.g.friction;

    }
}