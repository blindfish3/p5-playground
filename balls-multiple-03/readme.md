*Balls*

author: ben@blindfish.co.uk
v.0.1.0
4th May 2015

**Credit where credit's due:**
Most of the code controlling ball behaviour was taken from some previous sketches written in [Processing](http://processing.org) which were themselves originally refactored from 'ActionScript Animation 2' - Keith Peters (Friends of Ed). Despite the original target usage in Flash this is still a really useful resource.  There's no way I've got time to fully get my head around all the Maths involved here.  I remember it being very well explained in that book and most of the code is easily applied in other languages...


**What's going on here**
Just me getting up to speed using [p5.js](http://p5js.org/) and getting some practice writing something a little more complex than the dull client-side JavaScript I write for my day job.

**What might be of interest**
***multiple P5 sketches on one page***
Using so-called 'instance mode' to sandbox each p5 sketch.  Note that I also wrapped the sketch code into a function so I could produce multiple instances easily.  That's probably not recommended (you hit browser performance issues fairly quickly), nor a likely requirement, but was an easy way to test that my code supported multiple, independent p5 sketches.

***Pseudoclasses used across multiple sketches***
Objects and dependencies are structured so they won't conflict with each sketch instance.  I'd started out adding a single reference to the p5 sketch to my 'blindfish' namespacing object; which works well with a single sketch, but obviously not with multiple sketches.  The solution was using instances of the VariableManager object as a storage container for the 'global' properties of each sketch. At present `blindfish.selected` remains the only property shared across all sketches since in practice only one ball can be selected from any sketch at any given moment.

***JavaScript inheritance***
Ball inherits from the MoverObject following the pattern documented at [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#inheritance).

***Splitting resources into separate files***
This might seem trivial but when I first started playing with p5 a couple of weeks ago it wasn't at first clear how to easily separate code into files; partly because at that point I hadn't established an elegant way to pass references to the p5 object around.  Splitting of files was desired for editing convenience. In practice you wouldn't want to serve all these separate script resources: you'd almost certainly minify them into a single file; or perhaps a library of re-usable object types and the sketch file itself.