"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var debounce = require('lodash.debounce');

var forEach = require('array-foreach');

var behavior = require('../utils/behavior');

var select = require('../utils/select');

var _require = require('../events'),
    CLICK = _require.CLICK;

var _require2 = require('../config'),
    PREFIX = _require2.prefix;

var HIDDEN = 'hidden';
var SCOPE = ".".concat(PREFIX, "-footer-big");
var NAV = "".concat(SCOPE, " nav");
var BUTTON = "".concat(NAV, " .").concat(PREFIX, "-footer-primary-link");
var LIST = "".concat(NAV, " ul");
var HIDE_MAX_WIDTH = 600;
var DEBOUNCE_RATE = 180;

function showPanel() {
  if (window.innerWidth < HIDE_MAX_WIDTH) {
    var list = this.closest(LIST);
    list.classList.toggle(HIDDEN); // NB: this *should* always succeed because the button
    // selector is scoped to ".{prefix}-footer-big nav"

    var lists = list.closest(NAV).querySelectorAll('ul');
    forEach(lists, function (el) {
      if (el !== list) {
        el.classList.add(HIDDEN);
      }
    });
  }
}

var resize = debounce(function () {
  var hidden = window.innerWidth < HIDE_MAX_WIDTH;
  forEach(select(LIST), function (list) {
    list.classList.toggle(HIDDEN, hidden);
  });
}, DEBOUNCE_RATE);
module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showPanel)), {
  // export for use elsewhere
  HIDE_MAX_WIDTH: HIDE_MAX_WIDTH,
  DEBOUNCE_RATE: DEBOUNCE_RATE,
  init: function init() {
    resize();
    window.addEventListener('resize', resize);
  },
  teardown: function teardown() {
    window.removeEventListener('resize', resize);
  }
});