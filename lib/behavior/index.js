"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBehaviors = void 0;

var _fieldValidator = require("./components/validation/field-validator");

var _fullNameValidator = require("./components/validation/full-name-validator");

var _genericTextValidator = require("./components/validation/generic-text-validator");

var _passwordValidator = require("./components/validation/password-validator");

var _passwordConfirmationValidator = require("./components/validation/password-confirmation-validator");

var _passwordRevealIndicator = require("./components/password-reveal-indicator");

var _usernameValidator = require("./components/validation/username-validator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "fullname": _fullNameValidator.FullNameValidator,
  "generictext": _genericTextValidator.GenericTextValidator,
  "password": _passwordValidator.PasswordValidator,
  "password-confirmation": _passwordConfirmationValidator.PasswordConfirmationValidator,
  "password-reveal-indicator": _passwordRevealIndicator.PasswordRevealIndicator,
  "username": _usernameValidator.UsernameValidator // search,
  // skipnav,
  // validator,

};

var ComponentBehaviors = /*#__PURE__*/function () {
  function ComponentBehaviors() {
    _classCallCheck(this, ComponentBehaviors);
  }

  _createClass(ComponentBehaviors, null, [{
    key: "init",
    value: function init(prefix, options) {
      ComponentBehaviors._prefix = prefix;
      ComponentBehaviors._options = ComponentBehaviors.getDefaultOptions(prefix);
      ComponentBehaviors._behaviors = [];
      Object.assign(ComponentBehaviors._options, options); // Initialize all of the field validators with appropriate class names, if
      // they have one.

      _fieldValidator.FieldValidator.setPrefix(prefix);

      for (var nextComponent in components) {
        if (components[nextComponent].prototype instanceof _fieldValidator.FieldValidator) {
          _fieldValidator.FieldValidator.registerClassNameForType(components[nextComponent].getSelector()[1], components[nextComponent]);
        }
      }

      ComponentBehaviors._setupComponentsOnDomReady();
    }
  }, {
    key: "_setupComponentsOnDomReady",
    value: function _setupComponentsOnDomReady() {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        var target = document.body;
        Object.keys(components).forEach(function (key) {
          // if the target already has an on() handler for the given behavior,
          // we shouldn't re-enable a new one.
          ComponentBehaviors._enableComponentIfNotAlreadyEnabled(target, components[key]);
        });
      } else {
        window.setTimeout(ComponentBehaviors._setupComponentsOnDomReady, 100);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return ComponentBehaviors._options;
    }
  }, {
    key: "getInstance",
    value: function getInstance(prefix, options) {
      if (!ComponentBehaviors._instances) {
        ComponentBehaviors._instances = [];
      }

      if (!(prefix in ComponentBehaviors._instances) || !ComponentBehaviors._instances[prefix]) {
        ComponentBehaviors._instances[prefix] = ComponentBehaviors.init(prefix, options);
      }

      return ComponentBehaviors._instances[prefix];
    }
  }, {
    key: "_enableComponentIfNotAlreadyEnabled",
    value: function _enableComponentIfNotAlreadyEnabled(target, component) {
      // console.log(`TARGET: ${target}, COMPONENT: ${component}`);
      if (!(ComponentBehaviors._behaviors[target] && ComponentBehaviors._behaviors[target].includes(component))) {
        var behavior = new component(ComponentBehaviors._prefix, ComponentBehaviors._options);
        behavior.on(target);

        if (!ComponentBehaviors._behaviors[target]) {
          ComponentBehaviors._behaviors[target] = [];
        }

        ComponentBehaviors._behaviors[target].push(component);
      }
    }
  }, {
    key: "getDefaultOptions",
    value: function getDefaultOptions(prefix) {
      return {
        "fieldMessageClass": "".concat(prefix, "_formFieldMessage"),
        "fieldErrorClass": "".concat(prefix, "_formFieldError"),
        "defaultValueMissingMessage": "Please fill in this field",
        "defaultMatchFailedMessage": "The field and its confirmation do not match"
      };
    }
  }]);

  return ComponentBehaviors;
}();

exports.ComponentBehaviors = ComponentBehaviors;