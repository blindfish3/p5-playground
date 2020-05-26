blindfish.VariableManager = function (properties) {
  for (var i = 0, limit = properties.length; i < limit; i++) {
    var property = properties[i];
    this[property.name] = property.default;
  }
};

blindfish.VariableManager.prototype.addSlider = function (
  targetID,
  variable,
  attrs,
  calcVal,
  calcOutput
) {
  var self = this,
    target = document.getElementById(targetID),
    controlWrapper = document.createElement('div'),
    input = document.createElement('input'),
    output = document.createElement('span'),
    label = document.createElement('label');

  controlWrapper.setAttribute('class', 'slider control');
  output.setAttribute('class', 'output');
  input.setAttribute('type', 'range');
  for (var key in attrs) {
    input.setAttribute(key, attrs[key]);
  }

  label.innerHTML = variable;

  if (calcOutput) {
    output.innerHTML = calcOutput(attrs.value);
  } else {
    output.innerHTML = attrs.value;
  }

  controlWrapper.appendChild(label);
  controlWrapper.appendChild(output);
  controlWrapper.appendChild(input);
  target.appendChild(controlWrapper);

  input.addEventListener(
    'mouseup',
    function () {
      var sliderVal = input.value,
        val = calcVal(sliderVal);

      // 'this' inside addEventListener does *not*
      // point to the parent object
      self[variable] = val;

      if (calcOutput) {
        output.innerHTML = calcOutput(sliderVal);
      } else {
        output.innerHTML = sliderVal;
      }
    },
    false
  );
};

blindfish.VariableManager.prototype.addCheckbox = function (
  targetID,
  variable,
  attrs,
  labelTxt
) {
  var self = this,
    target = document.getElementById(targetID),
    controlWrapper = document.createElement('div'),
    input = document.createElement('input'),
    label = document.createElement('label');

  controlWrapper.setAttribute('class', 'checkbox control');
  input.setAttribute('type', 'checkbox');
  for (var key in attrs) {
    input.setAttribute(key, attrs[key]);
  }
  label.innerHTML = labelTxt;

  controlWrapper.appendChild(input);
  controlWrapper.appendChild(label);
  target.appendChild(controlWrapper);

  input.addEventListener(
    'click',
    function () {
      self[variable] = input.checked;
    },
    false
  );
};
