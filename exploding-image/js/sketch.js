blindfish.p5 = new p5(function (p) {

    var ball,
        img,
        pSize = 20,
        particles = [],
        particlesLen;

    p.preload = function () {
        img = p.loadImage("elephant.jpg");
    }

    p.setup = function () {
        p.createCanvas(450, 325);

        blindfish.g.spring = 0.2;
        //        ball = new blindfish.Particle({x: p.width/2, y: p.height/2, vx: 0.1, vy: 0.1});

        var image = new p5.Image(img.width, img.height, p);
        var newWidth = Math.floor( img.width / pSize);
        var newHeight = Math.floor( img.height / pSize);
        var counter = 0;
        
        image.copy(img, 0, 0, img.width, img.height,  0, 0, img.width, img.height);        
        image.resize(newWidth,newHeight);
        
        for (var i = 0; i < image.width; i++) {
            for (var j = 0; j < image.height; j++) {

                var pColour = image.get(i, j, 1, 1);
                var pImg = img.get(i*pSize, j*pSize, pSize, pSize);

                particles[counter] = new blindfish.Particle({
                    x: (i*pSize),
                    y: (j*pSize),
                    size: pSize,
                    colour: pColour,
                    img: pImg
                });
                counter++;
            }
        }
        particlesLen = particles.length;
        p.noStroke();
    };

    p.draw = function () {
        p.background(0);
        for (var i = 0; i < particlesLen; i++) {
                        particles[i].draw();
        }
    };

    //    p.mousePressed = function () {
    //
    //    };
    //
    //    p.mouseReleased = function () {
    //
    //    };


}, "sketch01");