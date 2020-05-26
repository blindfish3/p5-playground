/* loading unloading sketches code adapted from:
                                                 http://stackoverflow.com/questions/11178450/dynamically-unload-a-processing-js-sketch-from-canvas
         
         
         */

(function () {
  var previews = document.getElementById('previews'),
    // generate lightbox elements dynamically
    overlay = document.createElement('div'),
    canvasWrapper = document.createElement('div'),
    sketchCanvas = document.createElement('canvas');

  // add IDs and classes
  overlay.id = 'overlay';
  overlay.className = 'hidden';
  canvasWrapper.id = 'canvasWrapper';
  sketchCanvas.id = 'sketchCanvas';

  // add fallback content
  sketchCanvas.innerHTML =
    '<p>Your browser does not support the canvas tag.</p>';
  canvasWrapper.innerHTML =
    '<noscript><p>JavaScript is required to view the contents of this page.</p></noscript>';

  // combine and insert into the page
  canvasWrapper.appendChild(sketchCanvas);
  overlay.appendChild(canvasWrapper);
  previews.parentNode.insertBefore(overlay, previews);

  (context = sketchCanvas.getContext('2d')),
    (stopProcessingInstances = function () {
      processingInstances = Processing.instances.length;
      // stop any running sketch
      if (processingInstances > 0) {
        Processing.instances[0].exit();
      }
      // these don't appear to be essential...
      // but might be relevant when changing canvas size
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, sketchCanvas.width, sketchCanvas.height);
    });

  previews.addEventListener(
    'click',
    function (evt) {
      var target = evt.target;

      if (target.hasAttribute('data-src')) {
        // data pulled from preview buttons
        var sketchURL = target.getAttribute('data-src'),
          sketchWidth = target.getAttribute('data-width'),
          sketchHeight = target.getAttribute('data-height'),
          styleString =
            'min-width: ' +
            sketchWidth +
            'px; ' +
            'min-height: ' +
            sketchHeight +
            'px;';

        canvasWrapper.setAttribute('style', styleString);
        //assuming no other classes are present now this is added dynamically
        overlay.className = 'shown';
        stopProcessingInstances();

        // Now, load the new Processing script
        Processing.loadSketchFromSources(sketchCanvas, [sketchURL]);
      }
    },
    false
  );

  overlay.addEventListener(
    'click',
    function (evt) {
      var target = evt.target;
      // important: ensures clicks on canvas don't bubble up
      // and trigger the contents of the condition
      if (target.id === 'overlay') {
        stopProcessingInstances();
        //assuming no other classes are present now this is added dynamically
        overlay.className = 'hidden';
      }
    },
    false
  );
})();
