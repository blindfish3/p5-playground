blindfish.p5 = new p5(function (p) {

    var t, c;

    p.setup = function () {
        p.createCanvas(600, 400);

        var w = p.width,
            h = p.height;

        t = new blindfish.Triangle([w * 0.5, h * 0.25], [w * 0.25, h * 0.75], [w * 0.75, h * 0.75]);

        c = new blindfish.Circle(0, 0, p.width * 0.1);

    };

    p.draw = function () {
        p.background(0);

        
        if (blindfish.circleTriangleCollision(c, t)) {
            p.stroke(0, 255, 0);
        } else {
            p.stroke(255, 0, 0);
        }
        p.fill(255,50);
        p.strokeWeight(2);
        t.drawTriangle();
        p.stroke(255);
        p.fill(255, 50);
        c.drawCircle();


    };
    //    p.mousePressed = function () {
    //
    //    };
    //
    //    p.mouseReleased = function () {
    //
    //    };


}, "sketch01");



blindfish.circleTriangleCollision = function (c, t) {
    var p = blindfish.p5,
        collision = false,
        dx = t.centreX - c.x,
        dy = t.centreY - c.y,
        angle = Math.atan2(dy, dx),
        targetX = c.x + Math.cos(angle) * c.radius,
        targetY = c.y + Math.sin(angle) * c.radius;

    if (t.isInTriangle(targetX, targetY)) {
        collision = true;
    }
    // for very small triangles you can probably get away without this
    else if (c.isInCircle(t.x1, t.y1)) {
        collision = true;
    } else if (c.isInCircle(t.x2, t.y2)) {
        collision = true;
    } else if (c.isInCircle(t.x3, t.y3)) {
        collision = true;
    }
    // TODO: to be properly robust you should really check for interaction between a circle and a triangle's edge...

    // display the angle and point passed to isInTriangle()
    p.stroke(255);
    p.line(c.x, c.y, targetX, targetY);
    p.fill(255);
    p.ellipse(targetX, targetY, 5, 5);

    return collision;
}