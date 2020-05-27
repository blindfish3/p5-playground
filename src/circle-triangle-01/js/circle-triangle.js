// simple circle class
const Circle = function (x, y, radius, p5) {
  this.p5 = p5;
  this.x = x;
  this.y = y;
  this.vx = Math.random() * 3 - 1.5;
  this.vy = Math.random() * 3 - 1.5;
  this.radius = radius;
};

Circle.prototype.drawCircle = function () {
  var p = this.p5;
  this.x = p.mouseX;
  this.y = p.mouseY;
  p.ellipseMode(p.CENTER);
  p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
};

// fairly standard point to circle collision detection
Circle.prototype.isInCircle = function (pX, pY) {
  var dx = pX - this.x,
    dy = pY - this.y,
    distSquared = dx * dx + dy * dy;

  return distSquared < this.radius * this.radius;
};

// simple triangle class
const Triangle = function (point1, point2, point3, p5) {
  this.p5 = p5;
  this.x1 = point1[0];
  this.y1 = point1[1];
  this.x2 = point2[0];
  this.y2 = point2[1];
  this.x3 = point3[0];
  this.y3 = point3[1];
  this.centreX = (this.x1 + this.x2 + this.x3) / 3;
  this.centreY = (this.y1 + this.y2 + this.y3) / 3;
};

Triangle.prototype.drawTriangle = function () {
  this.p5.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
};

// Based on forum post at: http://gmc.yoyogames.com/index.php?showtopic=172194
Triangle.prototype.isInTriangle = function (x, y) {
  var p = this.p5,
    tArea,
    t1Area,
    t2Area,
    t3Area,
    totalArea;

  tArea = this.triangleArea(
    this.x1,
    this.y1,
    this.x3,
    this.y3,
    this.x2,
    this.y2
  );
  t1Area = this.triangleArea(x, y, this.x2, this.y2, this.x3, this.y3);
  t2Area = this.triangleArea(x, y, this.x3, this.y3, this.x1, this.y1);
  t3Area = this.triangleArea(x, y, this.x2, this.y2, this.x1, this.y1);

  // draw the 'centre' point
  p.stroke(0);
  p.fill(255);
  p.ellipse(this.centreX, this.centreY, 5, 5);

  totalArea = t1Area + t2Area + t3Area;

  return totalArea - tArea < 0.01;
};

Triangle.prototype.triangleArea = function (p1, p2, p3, p4, p5, p6) {
  var a = p1 - p5,
    b = p2 - p6,
    c = p3 - p5,
    d = p4 - p6;

  return 0.5 * Math.abs(a * d - b * c);
};

export { Circle, Triangle };
