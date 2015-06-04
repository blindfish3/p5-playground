var blindfish = blindfish || {};

// - - - CLASS TREE - - - //
blindfish.Tree = function (rootX, rootY, len, angle, levels, splits) {

    this.rootX = rootX;
    this.rootY = rootY;
    this.len = len;
    this.angle = angle;
    this.maxSplits = splits;

    this.weight = 16;

    this.level = 0;
    this.branches = [];

    this.limit = this.calcLimit(levels);

    this.calcTipPosition();
    this.addBranches();
};


// Setting the limit turns out to be fiddly
// This should work for any combination of levels/maxSplits
//TODO: I suspect there's a way to optimise this!
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
          angleStep = angleSpread / this.maxSplits,
          branchCounter = -1, // track which branch sub-branches are being added to
          splitCounter = 1, // track the number of sub-branches added to the current branch
          thisParent;

    for (var i = 0; i < this.limit; i++) {
        // -1 == the trunk
        if (branchCounter === -1) {
            thisParent = this;
        } else {
            thisParent = this.branches[branchCounter];
        }

        // Note: added some randomness to produce a more 'natural' result.
        var newAngle = thisParent.angle + angleStep * splitCounter - angleSpread / 2 + Math.random() * 0.4 - 0.4,
            lengthBase = thisParent.len * 0.8 + Math.random() * 5;

        this.branches[i] = new blindfish.Branch(this, thisParent, lengthBase, newAngle);

        // once you've added all sub-branches to the current branch...
        if (splitCounter >= this.maxSplits) {
            // move to the next branch
            branchCounter++;
            // reset the sub-branch counter
            splitCounter = 0;
        }
        // increment the sub-branch counter
        splitCounter++;
    }
};

blindfish.Tree.prototype.calcTipPosition = function () {
    this.tipX = this.rootX - Math.cos(this.angle) * this.len;
    this.tipY = this.rootY - Math.sin(this.angle) * this.len;
};

blindfish.Tree.prototype.updateTreeHeight = function(newHeight) {
    var ratio = newHeight/this.len;
    this.len = newHeight;
    this.calcTipPosition();
    for (var i = 0; i < this.limit; i++) {
        this.branches[i].updateBranchLength(ratio);
    }
};


//TODO: there's some angle bias at the extremes of the range
blindfish.Tree.prototype.updateTreeAngle = function(newAngleSpread) {
    var p = blindfish.p5,
          newAngleSpread = p.radians(newAngleSpread),
          splitCounter = 1,
          angleStep = newAngleSpread/this.maxSplits;
    
    for (var i = 0; i < this.limit; i++) {
        var branch = this.branches[i],
             newAngle = branch.parent.angle + angleStep * splitCounter - newAngleSpread / 2 + Math.random() * 0.4 - 0.4;
            
        branch.angle = newAngle;
        branch.calcTipPosition();
        
        if (splitCounter >= this.maxSplits) {
                splitCounter = 0;   
            }
        splitCounter++;
    }
};

blindfish.Tree.prototype.updateTreeWeight = function(newWeight) {
    this.weight = newWeight;
}


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

blindfish.Branch.prototype.updateBranchLength = function(ratio) {
    this.len *= ratio;
    this.calcTipPosition();
}


blindfish.Branch.prototype.draw = function () {
    var p = blindfish.p5;
    // this calculation should be 'baked' into the class to avoid
    // repeated calculations each frame!
    p.strokeWeight(this.trunk.weight / this.level);
    
    p.line(this.parent.tipX, this.parent.tipY, this.tipX, this.tipY);

};