(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tests = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var log = function(input) {
    console.log(input);
};

// Tell the module what to return/export
module.exports = log;

},{}],2:[function(require,module,exports){
"use strict";

var log = require('../../_lib/_log');


var controls;
var testCallback = function(val) {
    log("value in callback: " + val)
};

controls = new bufi('#control01');
// adding grouped controls
controls.addControlGroup([{
    type: 'button',
    options: {
        label: 'group button'
    },
    callback: testCallback
}, {
    type: 'button',
    options: {
        label: 'another group button'
    },
    callback: testCallback
}], "buttons", "controlsgroup01");

controls.addControlGroup([{
            type: 'radio',
            options: {
                label: "does her head have no room?",
                input: [{
                    label: "she is weird",
                    value: "weird",
                    checked: true
                }, {
                    label: "she is white",
                    value: "white"
                }, {
                    label: "she is married to the night",
                    value: "married"
                }]
            },
            callback: testCallback
        },

        {
            type: 'checkbox',
            options: {
                label: "Is she weird",
                checked: true
            },
            callback: testCallback
        },

        {
            type: 'range',
            options: {
                label: "percent"
            },
            callback: testCallback
        }
    ],
    "controls");


// adding individual control elements
controls.add('radio', {
        id: "radio_foo",
        input: [{
            label: "she is weird",
            value: "weird",
            checked: true
        }, {
            label: "she is white",
            value: "white"
        }, {
            label: "she is married to the night",
            value: "married"
        }]
    },
    testCallback);
controls.add('checkbox', {
    id: "chk_foo",
    label: "Is she weird",
    checked: true
}, testCallback);
controls.add('checkbox', {
    label: "Is she white"
}, testCallback);
controls.add('checkbox', {
    label: "Is she married to the night"
}, testCallback);
controls.add('switch', {
    off: "foo",
    on: "bar"
}, testCallback);
controls.add('switch', {
    off: "false",
    on: "true",
    checked: true
}, testCallback);
controls.add('range', {
    id: 'myrange01',
    step: 1
}, testCallback);
controls.add('range', {
    label: 'a very long label that is too long',
    id: 'strange01',
    step: 1000,
    max: 1000000,
    value: 0
}, testCallback);
controls.add('range', {
    id: 'strange02',
    step: 0.00001,
    max: 0.1,
    value: 0.05
}, testCallback);
controls.add('button', testCallback);
controls.add('button', {
    btnClass: 'btn-large',
    colour: 'red',
    label: 'my special button',
    anotherOption: 'foo'
}, testCallback);
controls.add('button', {
    btnClass: 'btn-foo',
    colour: 'cyan',
    label: 'another button'
}, testCallback);
controls.add('button', {
    btnClass: 'btn-flat',
    colour: 'light-green',
    label: 'eat me'
}, testCallback);

},{"../../_lib/_log":1}]},{},[2])(2)
});


//# sourceMappingURL=tests.js.map
