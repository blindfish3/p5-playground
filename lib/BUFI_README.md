# BUFI
_simple scripted UI controls_

## Description
As much an exercise in getting more familiar with Browserify, Gulp etc. as addressing a common requirement I have to quickly add controls to a sketch from within my sketch code.  I suspect there are libraries out there that already do much of this; so if you're looking for something equivalent have a dig around first: I haven't thoroughly tested or documented this yet and may not continue to develop it going forward.

## Dependencies
- [MaterialiseCSS](http://materializecss.com/) ([github](https://github.com/Dogfalo/materialize))
- [EJS](https://www.npmjs.com/package/ejs) - templates
- [eventlistener](https://www.npmjs.com/package/eventlistener)

## Usage
Pull the script from the foot of your body tag (ondomready/load listener has not been implemented as yet):

`<script src="js/bufi.min.js"></script>`

Add the control object (ideally specifying the #id of a target container element already added to your HTML - failing that your controls will be appended to `<body>`):

`var controls = new bufi('#control01');`

Then, to add controls, use `bufiInstance.add(type [String], options [Object].  For example:

    controls.add('button',
        {
            btnClass: 'btn-large',
            colour: 'red',
            label: 'my special button'
        },
        myCallbackFunction);

Available control types are as follows:

- **button**<br />
    returns: true<br />
    options:  
    - id
    - btnClass ["btn", "btn-large"]
    - colour []
    - label


- **checkbox**<br />
    returns: true/false<br />
    options:  
    - id
    - label
    - checked [true]


- **switch**<br />
    _like a checkbox, but fancier with off/on labels_<br />
    returns: true/false<br />
    options:
    - off
    - on
    - checked [true]


- **radio**<br />
    returns: event.target.value<br />
    options:
    - id
    - input - accepts an array of objects:<br />{label : "label", value: "value", [checked: true]}


- **range**<br />
    returns: true/false<br />
    options:  
    - id
    - label
    - value
    - min
    - max
    - step


You can also group controls into a fieldset with `bufiInstance.addControlGroup([controlParamObjects], label, id)`

Each controlParamObject should be in the form:

`{type: controlType, options: optionsObject, callback: callbackFunction}`

Which match the options described when adding individual controls.

A couple of examples are included; including a p5js sketch.

## TODO:
- more documentation :/
- minify CSS properly (e.g. with uncss)
- testing
- use browserify standalone mode to allow use of require()
- allow control values to be set externally
