import { Particle } from './particle.js';
const globals = {
  gravity: 0.05,
  friction: 0.999,
  spring: 0.05,
};

const bufferImg = function (buffer, img, x, y) {
  var w = img.width,
    h = img.height;
  buffer.copy(img, 0, 0, w, h, x, y, w, h);
};

new p5(function (p) {
  globals.bgColour = [166, 166, 100, 255];

  var beast,
    beast_mask,
    beastX,
    beastY,
    buffer,
    numParticles = 10,
    particles = [],
    defaultBG = globals.bgColour;

  p.preload = function () {
    beast = p.loadImage('imgs/beast.png');
    beast_mask = p.loadImage('imgs/beast_mask.png');
  };

  p.setup = function () {
    p.createCanvas(600, 400);
    beastX = p.width / 2 - beast.width / 2;
    beastY = p.height - beast.height;

    p.image(beast_mask, beastX, beastY);
    buffer = p.createImage(p.width, p.height);
    globals.buffer = buffer;
    // This looks - and is - convoluted: essentially we're drawing an
    // existing image to our buffer
    //        buffer.copy(beast_mask, 0, 0, beast_mask.width, beast_mask.height, beastX, beastY, beast_mask.width, beast_mask.height);
    // using simplified helper function instead:
    bufferImg(buffer, beast_mask, beastX, beastY);

    for (var i = 0; i < numParticles; i++) {
      particles[i] = new Particle(
        {
          x: Math.random() * p.width,
          y: Math.random() * (p.height / 2),
        },
        p,
        globals
      );
    }
  };

  p.draw = function () {
    p.background(globals.bgColour);
    p.image(beast, beastX, beastY);

    for (var i = 0; i < numParticles; i++) {
      particles[i].render();
    }
  };

  p.mousePressed = function () {
    //TODO: optimise = test for proximity to beast...
    if (
      p.mouseX > 0 &&
      p.mouseX < p.width &&
      p.mouseY > 0 &&
      p.mouseY < p.height
    ) {
      globals.bgColour = buffer.get(p.mouseX, p.mouseY);
      if (globals.bgColour[3] !== 0) {
        // hit!
      } else {
        globals.bgColour = defaultBG;
      }
    } else {
      globals.bgColour = defaultBG;
    }
  };

  //    p.mouseReleased = function () {
  //
  //    };
}, 'sketch01');
