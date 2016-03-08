// Explicitly binding to window makes it clear that this global is 
// not an accident...
window.P$ = new p5(function (p) {

    var img,
        pSize = 8,
        halfPSize = pSize / 2,
        particles = [],
        particlesLen;

    p.preload = function () {
        img = p.loadImage("elephant.jpg");
    }

    p.setup = function () {
        p.createCanvas(450, 325);

        var image = new p5.Image(img.width, img.height, p),
            newWidth = Math.floor(img.width / pSize),
            newHeight = Math.floor(img.height / pSize),
            index = 0;

        image.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        image.resize(newWidth, newHeight);



        for (var i = 0; i < image.width; i++) {
            for (var j = 0; j < image.height; j++) {

                var pColour = image.get(i, j, 1, 1);
                var pImg = img.get(i * pSize, j * pSize, pSize, pSize);

                particles[index] = new blindfish.Particle({
                    x: i * pSize + halfPSize,
                    y: j * pSize + halfPSize,
                    size: pSize,
                    img: pImg
                });
                index++;
            }
        }

        particlesLen = particles.length;
        console.info(particlesLen);
        p.noStroke();
        p.frameRate(60);
        p.imageMode(p.CENTER);
    };

    p.draw = function () {
        p.background(0);

        var mouse_x = p.mouseX,
            mouse_y = p.mouseY,
            mouseOverStage = false;

        if (mouse_x > 0 && mouse_x < p.width && mouse_y > 0 && mouse_y < p.height) {
            mouseOverStage = true;
        } else {
            mouseOverStage = false;
        }

        for (var i = 0; i < particlesLen; i++) {
            particles[i].draw(mouse_x, mouse_y, mouseOverStage, p);
        }
    };

}, "sketch01");
