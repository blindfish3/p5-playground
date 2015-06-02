(function () {

    var updateSlider = function (sliderID, outputID, target, calcVal, calcOutput) {
        var slider = document.getElementById(sliderID),
            output = document.getElementById(outputID);


        return slider.addEventListener('mouseup', function () {
            var sliderVal = slider.value,
                val = calcVal(sliderVal);
                blindfish.g[target] = val;
            
            if(calcOutput) {
                output.innerHTML = calcOutput(sliderVal);
            }
            else {
                output.innerHTML = sliderVal;
            }

        }, false);
    };


    var gravityEventListener = updateSlider(
        'gravitySlider',
        'gValue',
        'gravity',
        function (x) {
            return -x
        },
        function(x) {
            return x*25   
        }
    );

    var frictionEventListener = updateSlider(
        'frictionSlider',
        'fValue',
        'friction',
        function (x) {
            return 1 - x
        },
        function(x) {
         return Math.floor(x * 10000)/100; 
        }
    );

    var addCheckBoxListener = function (id, target) {
        var button = document.getElementById(id);
        button.addEventListener('click', function () {
            blindfish.g[target] = button.checked;
        }, false);

    }


    addCheckBoxListener('polarityButton', 'polarityOn');
    addCheckBoxListener('collisionButton', 'collisionsOn');


})();