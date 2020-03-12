"use strict";

module.exports = function (element, eventTypeString, listener, options) {
  var eventTypes = eventTypeString.split(/\s+/);

  var add = function add() {
    eventTypes.forEach(function (type) {
      element.addEventListener(type, listener, options);
    });
  };

  var trigger = function trigger() {
    var type = eventTypes[0];
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, false, true);
    element.dispatchEvent(event);
  };

  var remove = function remove() {
    eventTypes.forEach(function (type) {
      element.removeEventListener(type, listener, options);
    });
  };

  add();
  return {
    on: add,
    trigger: trigger,
    off: remove
  };
};