(function () {
  var controls = new bufi('#controls');
  controls.addControlGroup(
    [
      {
        type: 'range',
        options: {
          label: 'Gravity',
          min: -0.2,
          max: 0.2,
          value: 0,
          step: 0.025,
        },
        callback: function (val) {
          blindfish.g.gravity = val;
        },
      },
      {
        type: 'range',
        options: {
          label: 'Friction',
          min: 0,
          max: 0.05,
          value: 0.01,
          step: 0.001,
        },
        callback: function (val) {
          console.info(val);
          blindfish.g.friction = 1 - val;
        },
      },
      {
        type: 'checkbox',
        options: {
          id: 'polarityButton',
          label: 'ball polarity',
          checked: true,
        },
        callback: function (val) {
          blindfish.g.polarityOn = val;
        },
      },
      {
        type: 'checkbox',
        options: {
          id: 'collisionButton',
          label: 'ball collisions',
          checked: true,
        },
        callback: function (val) {
          blindfish.g.collisionsOn = val;
        },
      },
    ],
    'options'
  );
})();
