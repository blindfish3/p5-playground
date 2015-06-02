
// inheritance followingthe pattern at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
blindfish.Ball = function(args, p5, variables) {
    blindfish.Mover.call(this, args, p5, variables);
    
    this.rad = args.rad;
    this.mass = (Math.PI * this.rad * this.rad) /2;
    this.mouseOver = false;
    this.targetX = 0;
    this.targetY = 0;
    
    this.colour = [255,166,0];
};


blindfish.Ball.prototype = Object.create(blindfish.Mover.prototype);
blindfish.Ball.prototype.constructor = blindfish.Ball;


// Overridden methods must come after the above...
blindfish.Ball.prototype.draw = function () {
    var p = this.p;
    
    this.isMouseOver(p.mouseX, p.mouseY);
    
    p.ellipseMode(p.RADIUS);
    
    if(this.mouseOver) {
        p.fill(150, 200, 0);
    }
    else {
        p.fill(this.colour);
    }
    p.ellipse(this.x, this.y, this.rad, this.rad)

};

//TODO: need to check against blindfish.selected
// once a ball is slecte it shouldn't be possible to mouse over another...
blindfish.Ball.prototype.isMouseOver = function (mX, mY) {
    
    var mouseIsOver = (mX - this.x) * (mX - this.x) + (mY - this.y) * (mY - this.y) < this.rad * this.rad;
    this.mouseOver = mouseIsOver;
    
}