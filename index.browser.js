(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var keycode = require('keycode'),
    currentSection;

function getAllSections(){
    return Array.prototype.slice.call(document.querySelectorAll('section'));
}

function setCurrentSection(section){
    currentSection && currentSection.classList.remove('current');
    currentSection = section;
    currentSection.classList.add('current');
    saveState();
}

function saveState(){
    var sections = getAllSections();
    var currentSectionIndex = Math.max(sections.indexOf(currentSection), 0);
    window.localStorage.setItem('currentSection', currentSectionIndex);
}

function loadState(){
    var allSections = document.querySelectorAll('section');
        currentSectionIndex = Math.min(parseInt(window.localStorage.getItem('currentSection')) || 0, allSections.length);

    setCurrentSection(allSections[currentSectionIndex]);
}

function nextSlide(){
    var current = currentSection || document.querySelector('section'),
        nextSection = current.nextElementSibling || current;

    setCurrentSection(nextSection);
}

function previousSlide(){
    var current = currentSection || document.querySelector('section'),
        previousSection = current.previousElementSibling || current;

    setCurrentSection(previousSection);
}

window.addEventListener('DOMContentLoaded', function(){
    loadState();

    window.addEventListener('keydown', function(event){
        var key = keycode(event);
        event.preventDefault();

        if(key === 'left'){
            previousSlide();
        }

        if(~['right', 'enter', 'space'].indexOf(key)){
            nextSlide();
        }
    });

    window.addEventListener('click', function(event){
        // 20% border click moves to next/prev slide.

        var x = 1 / window.innerWidth * event.pageX - 0.5;
        x = (x < -0.3 || x > 0.3) ? x : 0;
        var y = 1 / window.innerHeight * event.pageY - 0.5;
        y = (y < -0.3 || y > 0.3) ? y : 0;

        var direction = (x + y) / 2;

        if(direction < 0){
            previousSlide();
        }else if(direction > 0){
            nextSlide();
        }
    });
});
},{"keycode":2}],2:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}]},{},[1]);
