"use strict";

// TODO: remove this file in 2.0
var forEach = require('array-foreach');

var toggleFieldMask = require('../utils/toggle-field-mask');

module.exports = function (fields, mask) {
  forEach(fields, function (field) {
    return toggleFieldMask(field, mask);
  });
};