"use strict";

var assign = require('object-assign');

var behavior = require('../utils/behavior');

var validate = require('../utils/validate-input');

function change() {
  validate(this);
}

var validator = behavior({
  'keyup change': {
    'input[data-validation-element]': change
  }
});
/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */

module.exports = assign(function (el) {
  return validator.on(el);
}, validator);