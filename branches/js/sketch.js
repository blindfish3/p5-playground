
blindfish.p5 = new p5(function (p) {

    var tree1,
           tree2,
           moveStep = 0,
           // in theory vars and controls could be added to the Tree class itself...
           vars = new blindfish.VariableManager([
                        { name : 'length', default : 160 },
                        { name: 'spread', default: 90},
                        { name: 'weight', default: 16},
                        { name: 'branchRatio', default: blindfish.g.PHI}
                    ]);

    p.setup = function () {
        p.createCanvas(600, 600);
        // controls affect only the first tree
        tree1 = new blindfish.Tree(p.width * 0.5, p.height, vars.length, p.radians(vars.spread), 4, 5, vars.weight);

        tree2 = new blindfish.Tree(p.width * 0.2, p.height, 70, p.radians(90), 3, 6);
        tree3 = new blindfish.Tree(p.width * 0.80, p.height, 70, p.radians(90), 6, 3);
        
        vars.addSlider( "controls", 
              'length', 
              { min: 10,
                max: 200,
                value: vars.length,
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
        
                 vars.addSlider( "controls", 
              'branchRatio', 
              { min: blindfish.g.PHI/2,
                max: blindfish.g.TAU,
                value: vars.branchRatio,
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
        
        vars.addSlider( "controls", 
              'spread', 
              { min: 0,
                max: 360,
                value: vars.spread,
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
        
         vars.addSlider( "controls", 
              'weight', 
              { min: 3,
                max: 60,
                value: vars.weight,
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

    };


    p.draw = function () {
        
        p.background(230,240,255);
        p.stroke(100, 200, 100, 20);
        tree2.draw();  
        tree3.draw();  
        p.stroke(200, 166, 0, 50);
        tree1.draw();
        
    };


}, "sketch01");