var blindfish = blindfish || {};

// - - - CLASS TRUNK - - - //
blindfish.Trunk = function (startX, startY, len, angle ) {
    
  this.rootX = startX;
  this.rootY = startY;
  this.len = len;  
  this.weight = 16;
  this.level = 0;  
  this.angle = angle;
  this.calcTipPosition();
};

blindfish.Trunk.prototype.calcTipPosition = function () {
    this.tipX = this.rootX - Math.cos(this.angle) * this.len;
    this.tipY = this.rootY - Math.sin(this.angle) * this.len;
};

blindfish.Trunk.prototype.draw = function () {
    var p = blindfish.p5; 
    p.strokeWeight(this.weight);
    p.line(this.rootX, this.rootY, this.tipX, this.tipY);   
};


// - - - CLASS BRANCH - - - //
blindfish.Branch = function(trunk, parent, len, angle) {       
    this.parent = parent;
    this.level = this.parent.level + 1;    
    this.trunk = trunk;
    this.len = len - this.level * 1.5;
    this.angle = angle;
    this.calcTipPosition();
//    this.calcMidPosition();
};

blindfish.Branch.prototype.calcTipPosition = function () {
    var parent = this.parent;
    this.tipX = parent.tipX - Math.cos(this.angle) * this.len;
    this.tipY = parent.tipY - Math.sin(this.angle) * this.len;
};

blindfish.Branch.prototype.calcMidPosition = function () {
    var parent = this.parent;
    this.midX = parent.tipX - Math.cos(this.angle) * (this.len / 2);
    this.midY = parent.tipY - Math.sin(this.angle) * (this.len / 2);
};

blindfish.Branch.prototype.updateAngle = function (step) {
    this.angle += step * (0.00025 * this.level * this.level);
    this.calcTipPosition();
};

blindfish.Branch.prototype.draw = function () {
    var p = blindfish.p5; 
    
    p.strokeWeight(this.trunk.weight/this.level);
    p.line(this.parent.tipX, this.parent.tipY, this.tipX, this.tipY);
    
};