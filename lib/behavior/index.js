"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBehaviors = void 0;

var _password = require("./components/password");

var _passwordConfirmation = require("./components/password-confirmation");

var _passwordRevealIndicator = require("./components/password-reveal-indicator");

var _username = require("./components/username");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "password": _password.Password,
  "password-confirmation": _passwordConfirmation.PasswordConfirmation,
  "password-reveal-indicator": _passwordRevealIndicator.PasswordRevealIndicator,
  "username": _username.Username // search,
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
      ComponentBehaviors._options = {
        "fieldMessageClass": "".concat(prefix, "_formFieldMessage"),
        "fieldMessageErrorClass": "".concat(prefix, "_formFieldErrorMessage"),
        "defaultValueMissingMessage": "Please fill in this field",
        "defaultMatchFailedMessage": "The field and its confirmation do not match"
      };
      Object.assign(ComponentBehaviors._options, options);

      ComponentBehaviors._setupComponentsOnDomReady();
    }
  }, {
    key: "_setupComponentsOnDomReady",
    value: function _setupComponentsOnDomReady() {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        var target = document.body;
        Object.keys(components).forEach(function (key) {
          var behavior = new components[key](ComponentBehaviors._prefix, ComponentBehaviors._options);
          behavior.on(target);
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
  }]);

  return ComponentBehaviors;
}();

exports.ComponentBehaviors = ComponentBehaviors;