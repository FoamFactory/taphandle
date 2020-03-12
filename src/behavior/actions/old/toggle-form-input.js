const resolveIdRefs = require('resolve-id-refs');
const toggleFieldMask = require('./toggle-field-mask');

const CONTROLS = 'aria-controls';
const PRESSED = 'aria-pressed';
const SHOW_ATTR = 'data-show-icon';
const HIDE_ATTR = 'data-hide-icon';

/**
 * Replace the text 'fa-eye' with 'fa-eye-slash' for use in the password show
 * indicator's class list.
 *
 * @param {string} showIcon The name of the class which indicates that the icon
 *                 for "password shown" should be displayed.
 */
const getHideIconText = showIcon => showIcon.replace(/\bfa-eye\b/i, show => "fa-eye-slash");

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */
module.exports = (el) => {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  const pressed = el.hasAttribute(PRESSED)
    && el.getAttribute(PRESSED) !== 'true';

  const fields = resolveIdRefs(el.getAttribute(CONTROLS));
  fields.forEach(field => toggleFieldMask(field, pressed));

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, 'fa-eye');
  }

  const showIconName = el.getAttribute(SHOW_ATTR);
  const hideIconName = el.getAttribute(HIDE_ATTR) || getHideIconText(showIconName);

  el.classList.remove(pressed ? hideIconName : showIconName);
  el.classList.add(pressed ? showIconName : hideIconName);
  el.setAttribute(PRESSED, pressed);
  return pressed;
};
