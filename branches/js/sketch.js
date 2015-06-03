blindfish.p5 = new p5(function (p) {

    var tree1,
           tree2,
           moveStep = 0;


    p.setup = function () {
        p.createCanvas(600, 400);
        
        tree1 = new blindfish.Tree(p.width * 0.65, p.height, 90, p.radians(90), 5, 3);
        tree2 = new blindfish.Tree(p.width * 0.25, p.height, 70, p.radians(90), 4, 3);
     
    };


    p.draw = function () {
        p.background(255);
        p.stroke(200, 166, 0, 50);
        tree1.draw();
        p.stroke(50, 200, 166, 50);
        tree2.draw();  
        
    };


}, "sketch01");