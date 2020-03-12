"use strict";

var assign = require('object-assign');

var _require = require('receptor'),
    keymap = _require.keymap;

var behavior = require('./behavior');

var select = require('./select');

var activeElement = require('./active-element');

var FOCUSABLE = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

var tabHandler = function tabHandler(context) {
  var focusableElements = select(FOCUSABLE, context);
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1]; // Special rules for when the user is tabbing forward from the last focusable element,
  // or when tabbing backwards from the first focusable element

  function tabAhead(event) {
    if (activeElement() === lastTabStop) {
      event.preventDefault();
      firstTabStop.focus();
    }
  }

  function tabBack(event) {
    if (activeElement() === firstTabStop) {
      event.preventDefault();
      lastTabStop.focus();
    }
  }

  return {
    firstTabStop: firstTabStop,
    lastTabStop: lastTabStop,
    tabAhead: tabAhead,
    tabBack: tabBack
  };
};

module.exports = function (context) {
  var additionalKeyBindings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tabEventHandler = tabHandler(context); //  TODO: In the future, loop over additional keybindings and pass an array
  // of functions, if necessary, to the map keys. Then people implementing
  // the focus trap could pass callbacks to fire when tabbing

  var keyMappings = keymap(assign({
    Tab: tabEventHandler.tabAhead,
    'Shift+Tab': tabEventHandler.tabBack
  }, additionalKeyBindings));
  var focusTrap = behavior({
    keydown: keyMappings
  }, {
    init: function init() {
      // TODO: is this desireable behavior? Should the trap always do this by default or should
      // the component getting decorated handle this?
      tabEventHandler.firstTabStop.focus();
    },
    update: function update(isActive) {
      if (isActive) {
        this.on();
      } else {
        this.off();
      }
    }
  });
  return focusTrap;
};