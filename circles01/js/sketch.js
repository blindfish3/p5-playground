blindfish.p5 = new p5(function (p) {

    var parentCircle,
        childCircles = [],
        numChildren = 12,
        vars = new blindfish.VariableManager([
            { name : 'divisions', default : numChildren },
            { name: 'depth', default: 2},
            { name: 'opacity', default: 0.015},
            { name: 'r', default: 255},
            { name: 'g', default: 255},
            { name: 'b', default: 255}
        ]),
        fill,
        updateOpacity = function() {
            //TODO: make this more dynamic based on divisions as well as depth
            fill = 'rgba(' + vars.r + ',' + vars.g + ',' + vars.b + ',' + vars.opacity + ')'
        };

        updateOpacity();


    p.setup = function () {
        p.createCanvas(600, 600);

        parentCircle = blindfish.CircleManager.addCircle({x: p.width/2, y:p.height/2, rad: 60, divisions: numChildren});


        vars.addSlider( "controls",
              'divisions',
              { min: 0,
                max: 24,
                value: vars.divisions,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {

                    if(vars.divisions !== parentCircle.divisions) {
                        parentCircle.divisions = vars.divisions;
                        parentCircle.updateChildren();
                        updateOpacity();
                    }
                });

        vars.addSlider( "controls",
              'depth',
              { min: 0,
                max: 3,
                value: vars.depth,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {

                    if(vars.depth !== parentCircle.maxDepth) {
                        parentCircle.maxDepth = vars.depth;
                        parentCircle.updateChildren();
                        updateOpacity();
                    }
                });

                vars.addSlider( "controls",
              'opacity',
              { min: 0,
                max: 0.1,
                value: vars.opacity,
                step: 0.0001
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                        updateOpacity();
                });

                vars.addSlider( "colourControls",
              'r',
              { min: 0,
                max: 255,
                value: vars.r,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                        updateOpacity();
                });

         vars.addSlider( "colourControls",
              'g',
              { min: 0,
                max: 255,
                value: vars.g,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                        updateOpacity();
                });

         vars.addSlider( "colourControls",
              'b',
              { min: 0,
                max: 255,
                value: vars.b,
                step: 1
                },
                function (x) {
                    return x
                },
                function (x) {
                    return x
                },
                function() {
                        updateOpacity();
                });
    };

    p.draw = function () {
        p.background(0);
        p.noStroke();

        p.fill(fill);
        parentCircle.draw();

    };

}, "sketch01");

