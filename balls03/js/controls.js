(function () {
    var p = blindfish.p5;
//        gravitySlider = document.getElementById('gravitySlider')
//        gravityOutput = document.getElementById('gValue');
//
//    
//        gravitySlider.addEventListener('mouseup', function() {
//            var g = -gravitySlider.value;
//            blindfish.g.gravity = g;
//            gravityOutput.innerHTML = g;
//
//        }, false);
    
    
    
    var updateSlider = function(sliderID, outputID, target, calc) {
        var slider = document.getElementById(sliderID),
               output = document.getElementById(outputID);
console.info(slider);
    
        return slider.addEventListener('mouseup', function() {
            var val = calc(slider.value);
            blindfish.g[target] = val;
            output.innerHTML = val;

        }, false);
    };
    
    
    var gravityEventListener = updateSlider(
        'gravitySlider', 
        'gValue', 
        'gravity', 
        function(x) { return -x}
    );
    
    var frictionEventListener = updateSlider(
        'frictionSlider', 
        'fValue', 
        'friction', 
        function(x) { return  1-x }
    );
    
    var addCheckBoxListener = function(id, target) {

        var button = document.getElementById(id);
        button.addEventListener('click', function() {
             blindfish.g[target] = button.checked;
        }, false);
    
    }
    

    addCheckBoxListener('polarityButton', 'polarityOn');
    addCheckBoxListener('collisionButton', 'collisionsOn');
    
    
})();