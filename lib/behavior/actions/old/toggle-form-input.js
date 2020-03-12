"use strict";

var resolveIdRefs = require('resolve-id-refs');

var toggleFieldMask = require('./toggle-field-mask');

var CONTROLS = 'aria-controls';
var PRESSED = 'aria-pressed';
var SHOW_ATTR = 'data-show-icon';
var HIDE_ATTR = 'data-hide-icon';
/**
 * Replace the text 'fa-eye' with 'fa-eye-slash' for use in the password show
 * indicator's class list.
 *
 * @param {string} showIcon The name of the class which indicates that the icon
 *                 for "password shown" should be displayed.
 */

var getHideIconText = function getHideIconText(showIcon) {
  return showIcon.replace(/\bfa-eye\b/i, function (show) {
    return "fa-eye-slash";
  });
};
/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */


module.exports = function (el) {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  var pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== 'true';
  var fields = resolveIdRefs(el.getAttribute(CONTROLS));
  fields.forEach(function (field) {
    return toggleFieldMask(field, pressed);
  });

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, 'fa-eye');
  }

  var showIconName = el.getAttribute(SHOW_ATTR);
  var hideIconName = el.getAttribute(HIDE_ATTR) || getHideIconText(showIconName);
  el.classList.remove(pressed ? hideIconName : showIconName);
  el.classList.add(pressed ? showIconName : hideIconName);
  el.setAttribute(PRESSED, pressed);
  return pressed;
};