var blindfish = blindfish || {};

// - - - CLASS TREE - - - //
blindfish.Tree = function (rootX, rootY, len, angle, levels, splits, startWeight) {

    this.rootX = rootX;
    this.rootY = rootY;
    this.len = len;
    this.angle = angle;
    this.maxSplits = splits;

    this.lenRatio = blindfish.g.PHI;
    this.weight = startWeight || 10;

    this.level = 0;
    this.branches = [];

    this.limit = this.calcLimit(levels);

    this.calcTipPosition();
    this.addBranches();
};


// Setting the limit turns out to be fiddly
// This works for any combination of levels/maxSplits
blindfish.Tree.prototype.calcLimit = function (levels) {
    var total = 0;
    for (var i = 1; i < levels; i++) {
        var power = Math.pow(this.maxSplits, i);
        total += power;
    }
    return total;
};


blindfish.Tree.prototype.addBranches = function () {
    var p = blindfish.p5,
          angleSpread = p.HALF_PI,
          angleStep = angleSpread / (this.maxSplits-1),
          branchCounter = -1, // track which branch sub-branches are being added to
          splitCounter = 0, // track the number of sub-branches added to the current branch
          thisParent;

    //TODO: this loop is essentially duplicated (more or less) in Tree.updateTreeAngle().  Rationalise...
    for (var i = 0; i < this.limit; i++) {
        // once you've added all sub-branches to the current branch...
        if (splitCounter === this.maxSplits) {
            // move to the next branch
            branchCounter++;
            // reset the sub-branch counter
            splitCounter = 0;
        }
        
        // -1 == the trunk
        if (branchCounter === -1) {
            thisParent = this;
        } else {
            thisParent = this.branches[branchCounter];
        }

        // Note: randomness can be added to produce a more 'natural' result.
        var newAngle = thisParent.angle + (angleStep * splitCounter) - angleSpread / 2;// + Math.random() * 0.4 - 0.2,
            
            childLength = thisParent.len * this.lenRatio;// + Math.random() * 5;

        this.branches[i] = new blindfish.Branch(this, thisParent, childLength, newAngle);

        // increment the sub-branch counter
        splitCounter++;
    }
};


blindfish.Tree.prototype.calcTipPosition = function () {
    this.tipX = this.rootX - Math.cos(this.angle) * this.len;
    this.tipY = this.rootY - Math.sin(this.angle) * this.len;
};


blindfish.Tree.prototype.updateTreeHeight = function(newLength) {
    var ratio = newLength/this.len;
    this.len = newLength;
    this.calcTipPosition();
    for (var i = 0; i < this.limit; i++) {
        this.branches[i].updateBranchLength(ratio);
    }
};


//TODO: duplicated in constructor - rationalise...
blindfish.Tree.prototype.updateTreeAngle = function(inputAngleSpread) {
    var p = blindfish.p5,
          newAngleSpread = p.radians(inputAngleSpread),
          splitCounter = 0,
          angleStep = newAngleSpread/(this.maxSplits-1);
    
    for (var i = 0; i < this.limit; i++) {
          if (splitCounter === this.maxSplits) {
                splitCounter = 0;   
            }
        
        var branch = this.branches[i],
             newAngle = branch.parent.angle + (angleStep * splitCounter) - (newAngleSpread / 2);// + Math.random() * 0.4 - 0.2;
            
        branch.angle = newAngle;
        branch.calcTipPosition();
        
        splitCounter++;
    }
};


blindfish.Tree.prototype.updateTreeWeight = function(newWeight) {
    this.weight = newWeight;
    
    for (var i = 0; i < this.limit; i++) {
        this.branches[i].updateBranchWeight();
    }
};


blindfish.Tree.prototype.updateTreeBranchRatio = function(newRatio) {
    this.lenRatio = newRatio;
    
    for (var i = 0; i < this.limit; i++) {
        this.branches[i].updateBranchLengthRatio();
    }
};


blindfish.Tree.prototype.draw = function () {
    var p = blindfish.p5;
    p.strokeWeight(this.weight);
    p.line(this.rootX, this.rootY, this.tipX, this.tipY);

    for (var i = 0; i < this.limit; i++) {
        this.branches[i].draw();
    }
    
};


// - - - CLASS BRANCH - - - //
blindfish.Branch = function (trunk, parent, len, angle) {
    this.trunk = trunk;
    this.parent = parent;
    this.len = len;
    this.angle = angle;
    this.level = this.parent.level + 1;
    this.weight = this.parent.weight * blindfish.g.PHI;
    this.calcTipPosition();
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


blindfish.Branch.prototype.updateBranchLength = function(ratio) {
    this.len *= ratio;
    this.calcTipPosition();
};


blindfish.Branch.prototype.updateBranchLengthRatio = function() {
    this.len = this.parent.len * this.trunk.lenRatio;
    this.calcTipPosition();
};


blindfish.Branch.prototype.updateBranchWeight = function() {
    this.weight = this.parent.weight * blindfish.g.PHI;
};


blindfish.Branch.prototype.draw = function () {
    var p = blindfish.p5;
    p.strokeWeight(this.weight);
    p.line(this.parent.tipX, this.parent.tipY, this.tipX, this.tipY);
};