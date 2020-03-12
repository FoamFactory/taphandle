"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');

var _require = require('../events'),
    CLICK = _require.CLICK;

var _require2 = require('../config'),
    PREFIX = _require2.prefix;

var HEADER = ".".concat(PREFIX, "-banner-header");
var EXPANDED_CLASS = "".concat(PREFIX, "-banner-header-expanded");

var toggleBanner = function toggleEl(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, "".concat(HEADER, " [aria-controls]"), toggleBanner)));