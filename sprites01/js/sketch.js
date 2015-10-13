blindfish.p5 = new p5(function (p) {

    var beast,
           beast_mask,
           beastX,
           beastY,
           buffer,
            bgColour = [100,100,100,255];

    p.preload = function() {
        beast = p.loadImage("imgs/beast.png");
        beast_mask = p.loadImage("imgs/beast_mask.png");

    }

    p.setup = function () {
        p.createCanvas(600, 400);
        beastX = p.width/2 - beast.width/2;
        beastY = p.height - beast.height;

        p.image(beast_mask, beastX, beastY);
        buffer = p.createImage(p.width, p.height);
        // This looks - and is - convoluted: essentially we're drawing an
        // existing image to our buffer
        buffer.copy(beast_mask, 0, 0, beast_mask.width, beast_mask.height, beastX, beastY, beast_mask.width, beast_mask.height);

    };

    p.draw = function () {
        p.background(bgColour);
        p.image(beast, beastX, beastY);

    };


        p.mousePressed = function () {
            bgColour = buffer.get(p.mouseX, p.mouseY);
        };
    //
    //    p.mouseReleased = function () {
    //
    //    };


}, "sketch01");
