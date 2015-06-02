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
//    this.polarity = blindfish.c.POLES[Math.round(Math.random())];

};

blindfish.Mover.prototype.draw = function () {
    var p = this.p;
    p.ellipseMode(p.RADIUS);
    p.fill(0, 0, 0);
    p.ellipse(this.x, this.y, this.rad, this.rad)

};

blindfish.Mover.prototype.update = function () {
    this.draw();
    blindfish.moveObjects(this, true, this.p, this.g);
};


// By using the base characteristics of a Mover object we
// can write generic functions that add desired behaviours
// without making them methods of a class
blindfish.moveObjects = function (m, keepInBounds) {
    var p = blindfish.p5;

    if (m instanceof blindfish.Mover) {

        if(m.moving) {
            m.x += m.vx;
            m.y += m.vy;
            if(blindfish.g.gravityOn) {
                m.vy -= blindfish.g.gravity;
            }
            m.vx *= blindfish.g.friction;
            m.vy *= blindfish.g.friction;

            if (keepInBounds) {
                if (m.x > p.width - m.rad) {
                    m.x = p.width - m.rad;
                    m.vx *= -m.bounce;
                } else if (m.x < 0 + m.rad) {
                    m.x = 0 + m.rad;
                    m.vx *= -m.bounce;
                }

                if (m.y > p.height - m.rad) {
                    m.y = p.height - m.rad;
                    m.vy *= -m.bounce;
                } else if (m.y < 0 + m.rad) {
                    m.y = 0 + m.rad;
                    m.vy *= -m.bounce;
                }
            }
        }
        //WARNING:  kludge
        else {
            m.x = p.mouseX;
            m.y = p.mouseY;
        }

    }
    // else throw error
    else {
        console.log("not an instance of Mover");
    }

};