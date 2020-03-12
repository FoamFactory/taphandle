"use strict";

var EXPANDED = 'aria-expanded';
var CONTROLS = 'aria-controls';
var HIDDEN = 'aria-hidden';

module.exports = function (button, expanded) {
  var safeExpanded = expanded;

  if (typeof safeExpanded !== 'boolean') {
    safeExpanded = button.getAttribute(EXPANDED) === 'false';
  }

  button.setAttribute(EXPANDED, safeExpanded);
  var id = button.getAttribute(CONTROLS);
  var controls = document.getElementById(id);

  if (!controls) {
    throw new Error("No toggle target found with id: \"".concat(id, "\""));
  }

  controls.setAttribute(HIDDEN, !safeExpanded);
  return safeExpanded;
};