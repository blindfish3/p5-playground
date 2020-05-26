var blindfish = {};

blindfish.c = {
  POS: 1,
  NEG: -1,
  POLES: [-1, 1],
};

blindfish.g = {
  gravity: 0.0,
  friction: 0.99,
  spring: 0.05,
  gravityOn: true,
  polarityOn: true,
  collisionsOn: true,
};

//Balls  ideally this should be limited to type Balll
// (or parent Mover Class if I get round to writing one)
blindfish.selected = undefined;

blindfish.dragTracker = function (sampleLength) {
  var p = blindfish.p5,
    limit = sampleLength,
    vectors = [],
    track = function (vector) {
      if (vectors.length >= limit) {
        vectors.shift();
      }

      vectors.push(vector);
    },
    release = function () {
      var totalDX = 0,
        totalDY = 0,
        vectorsLength = vectors.length;

      for (var i = 1; i < vectorsLength; i++) {
        var a = vectors[i - 1],
          b = vectors[i];

        totalDX += b.x - a.x;
        totalDY += b.y - a.y;
      }

      blindfish.selected.vx = totalDX / vectorsLength;
      blindfish.selected.vy = totalDY / vectorsLength;
    };

  return {
    track: track,
    release: release,
  };
};
