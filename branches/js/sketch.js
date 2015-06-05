
blindfish.p5 = new p5(function (p) {

    var tree1,
           tree2,
           moveStep = 0,
            vars = new blindfish.VariableManager([
                        { name : 'length', default : 90 },
                        { name: 'spread', default: 90},
                        { name: 'weight', default: 16},
                        { name: 'branchRatio', default: blindfish.g.PHI}
                    ]);

    p.setup = function () {
        p.createCanvas(600, 400);
        
        tree1 = new blindfish.Tree(p.width * 0.65, p.height, 90, p.radians(90), 5, 4);
        tree2 = new blindfish.Tree(p.width * 0.25, p.height, 70, p.radians(90), 4, 3);
     
        
        vars.addSlider( "sketch01", 
              'length', 
              { min: 10,
                max: 200,
                value: 90,
                step: 5
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                    tree1.updateTreeHeight(vars.length);
                });
        
        vars.addSlider( "sketch01", 
              'spread', 
              { min: 0,
                max: 300,
                value: 90,
                step: 5
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                    tree1.updateTreeAngle(vars.spread);
                });
        
         vars.addSlider( "sketch01", 
              'weight', 
              { min: 1,
                max: 30,
                value: 10,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                    tree1.updateTreeWeight(vars.weight);
                });
        
         vars.addSlider( "sketch01", 
              'branchRatio', 
              { min: blindfish.g.PHI,
                max: blindfish.g.TAU,
                value: blindfish.g.PHI,
                step: 0.01
                },
                function (x) {
                    return x;
                },
                function (x) {
                    return Math.round(x*1000)/1000;
                },
                function() {
                    tree1.updateTreeBranchRatio(vars.branchRatio);
                });

    };


    p.draw = function () {
        p.background(255);
        p.stroke(200, 166, 0, 50);
        tree1.draw();
        p.stroke(50, 200, 166, 50);
        tree2.draw();  
        
    };


}, "sketch01");