"use strict";

var toggleFormInput = require('../utils/toggle-form-input');

module.exports = function (control) {
  control.addEventListener('click', function () {
    toggleFormInput(control);
  });
};