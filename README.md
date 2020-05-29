# p5-playground

Various experiments with p5js.

[p5js](http://p5js.org/) is a Javascript port of [Processing](http://www.processing.org).

## Updates
I've restructured the source code to facilitate more modern dev practices:

- moved all source code into /src
- added a build process with Gulp: that's getting old now but is relatively straightforward to work with and adequate for my needs
- run babel on all js files to leverage modern ES6 features
- refactor index files to import sketch code as a module.  This should work in most modern browsers.  It also means (most) source files are now structured to allow them to be imported in other contexts.

To benefit from the changes you'll need to have node installed and may have to install gulp-cli.
Install all dependencies with `npm install` or `yarn` if that's your preference.
Then just run `gulp` and - assuming the console doesn't display any errors - open `localhost:3000` in your browser.  When you make changes to files in /src they'll be processed and the browser will reload.

## References
Some of the code is inspired/ported from the following source material:

- Peters, K 2006, Actionscript Animation, Friends of Ed
- Greenberg, I 2007, Processing, Friends of Ed
- mulitple authors 2004, Flash Math Creativity, Friends of Ed
- Osmani, A 2015, [Learning JavaScriptDesign Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/), O'Reilly
