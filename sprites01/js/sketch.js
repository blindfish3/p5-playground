
blindfish.g = {
    gravity: 0.05,
    friction: 0.999,
    spring: 0.05
};

blindfish.bufferImg = function(buffer, img, x, y) {
 var w = img.width,
        h = img.height;
        buffer.copy(img, 0, 0, w, h, x, y, w, h);
}

blindfish.p5 = new p5(function (p) {

    blindfish.g.bgColour = [166, 166, 100, 255];

    var beast,
        beast_mask,
        beastX,
        beastY,
        buffer,
        numParticles = 10,
        particles = [],
        defaultBG = blindfish.g.bgColour;

    p.preload = function () {
        beast = p.loadImage("imgs/beast.png");
        beast_mask = p.loadImage("imgs/beast_mask.png");

    }

    p.setup = function () {
        p.createCanvas(600, 400);
        beastX = p.width / 2 - beast.width / 2;
        beastY = p.height - beast.height;

        p.image(beast_mask, beastX, beastY);
        buffer = p.createImage(p.width, p.height);
blindfish.g.buffer = buffer;
        // This looks - and is - convoluted: essentially we're drawing an
        // existing image to our buffer
//        buffer.copy(beast_mask, 0, 0, beast_mask.width, beast_mask.height, beastX, beastY, beast_mask.width, beast_mask.height);
        // using simplified helper function instead:
        blindfish.bufferImg(buffer, beast_mask, beastX, beastY);

        for (var i=0; i<numParticles; i++) {
        particles[i] = new blindfish.Particle({
                    x: (Math.random() * p.width),
                    y: (Math.random() * (p.height/2))
                });
        }
    };

    p.draw = function () {
        p.background(blindfish.g.bgColour);
        p.image(beast, beastX, beastY);

        for (var i=0; i<numParticles; i++) {
            particles[i].render();
        }

    };


    p.mousePressed = function () {
        //TODO: optimise = test for proximity to beast...
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            blindfish.g.bgColour = buffer.get(p.mouseX, p.mouseY);
            if (blindfish.g.bgColour[3] !== 0) {
                // hit!
            } else {
                blindfish.g.bgColour =defaultBG;
            }
        } else {
            blindfish.g.bgColour =defaultBG;
        }
    };


    //    p.mouseReleased = function () {
    //
    //    };


}, "sketch01");

