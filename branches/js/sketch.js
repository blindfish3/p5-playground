blindfish.p5 = new p5(function (p) {

    var trunk,
        branches = [],
        levels = 5,
        maxSplits = 3,
        // Setting the limit turns out to be fiddly
        // This should work for any combination of levels/maxSplits
        //TODO: I suspect there's a way to optimise this!
        limit = (function () {
            var total = 0;
            for (var i = 1; i < levels; i++) {
                var power = Math.pow(maxSplits, i);
                total += power;
            }
            return total;
        })(),
        angleSpread = p.HALF_PI,
        angleStep = angleSpread / maxSplits,
        moveStep = 0;


    p.setup = function () {
        p.createCanvas(600, 400);

        var branchCounter = -1, // track which branch sub-branches are being added to
            splitCounter = 1, // track the number of sub-branches added to the current branch
            thisParent;

        trunk = new blindfish.Trunk(p.width / 2, p.height, 90, p.radians(90));
        //TODO: build this into a tree class :)
        for (var i = 0; i < limit; i++) {
            // -1 == the trunk
            if (branchCounter === -1) {
                thisParent = trunk;
            } else {
                thisParent = branches[branchCounter];
            }

            // Note: added some randomness to produce a more 'natural' result.
            var newAngle = thisParent.angle + angleStep * splitCounter - angleSpread / 2 + Math.random() * 0.4 -0.4,
                lengthBase = thisParent.len * 0.8 + Math.random()*5;
            
            branches[i] = new blindfish.Branch(trunk, thisParent, lengthBase, newAngle);

            // once you've added all sub-branches to the current branch
            if (splitCounter >= maxSplits) {
                // move to the next branch
                branchCounter++;
                // reset the sub-branch counter
                splitCounter = 0;
            }
            // increment the sub-branch counter
            splitCounter++;
        }

    };


    p.draw = function () {
        p.background(255);
        p.stroke(200, 166, 0, 50);
        trunk.draw();
        
        var step = Math.sin(moveStep);
        
        for (var i = 0; i < limit; i++) {
            branches[i].draw();
            branches[i].updateAngle(step);
            
        }
        
        if(p.frameCount % 8 === 0) {
            moveStep+=16;
        }
    };


}, "sketch01");