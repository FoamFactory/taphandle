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

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        ComponentBehaviors.initialized = true;
        Object.keys(components).forEach(function (key) {
          // if the target already has an on() handler for the given behavior,
          // we shouldn't re-enable a new one.
          ComponentBehaviors._enableComponentIfNotAlreadyEnabled(target, components[key]);

          ComponentBehaviors._processQueuedOperations();
        });
      } else {
        // XXX_jwir3: 5ms might seem a little excessive, but what we want is to
        //            catch the DOM once it's loaded, but BEFORE it's been
        //            rendered for the first time. Since the browser renders at 60
        //            FPS (ideally), the first frame will be rendered within 16.67
        //            ms of the DOM being ready. Hopefully, if we check soon
        //            enough, this will set the appropriate CSS and re-layout the
        //            page in time to coalesce with the first render. Or, browsers
        //            don't work this way and I'm shooting in the dark here.
        window.setTimeout(ComponentBehaviors._setupComponentsOnDomReady, 5);
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
    /**
     * Retrieve the {FieldValidator}s for which a given element is matched.
     *
     * This method will give a set of javascript class objects for which a given
     * element (either {DOMElement} or a {JQuery.Element}) matches the CSS
     * selectors for.
     *
     * @param  {DOMElement|JQuery.Element} element  The element to check against
     *         the set of active components
     *
     * @return {Array} A set of javascript classes defining the components that
     *         are subclasses of {FieldValidator} and the given element matches
     *         CSS selectors for.
     */

  }, {
    key: "getMatchingValidatorsforElement",
    value: function getMatchingValidatorsforElement(element) {
      var matchingComponents = [];

      for (var componentName in components) {
        var componentClass = components[componentName];

        if (componentClass.prototype instanceof _fieldValidator.FieldValidator) {
          if (componentClass.doesElementMatchSelector(element)) {
            matchingComponents.push(componentClass);
          }
        }
      }

      return matchingComponents;
    }
  }, {
    key: "setElementInvalid",
    value: function setElementInvalid(element, message) {
      if (!ComponentBehaviors.initialized) {
        ComponentBehaviors.queued_operations.push({
          "operation": "setElementInvalid",
          "args": [element, message]
        });
        return;
      }

      var validators = ComponentBehaviors.getMatchingValidatorsforElement(element); // So it actually doesn't matter whether we set all of these, but if an
      // element has more than one validator, we need to make sure to set all of
      // them to invalid, otherwise one of the other validators might clear the
      // validation status.
      // In practice, each element should have at most one validator associated
      // with it, but who knows?

      for (var validatorIdx in validators) {
        var validator = validators[validatorIdx];
        validator.setElementInvalid(element, message);
      }
    }
  }, {
    key: "clearElementInvalid",
    value: function clearElementInvalid(element) {
      if (!ComponentBehaviors.initialized) {
        ComponentBehaviors.queued_operations.push({
          "operation": "clearElementInvalid",
          "args": [element]
        });
        return;
      }

      var validators = ComponentBehaviors.getMatchingValidatorsforElement(element); // So it actually doesn't matter whether we set all of these, but if an
      // element has more than one validator, we need to make sure to set all of
      // them to invalid, otherwise one of the other validators might clear the
      // validation status.
      // In practice, each element should have at most one validator associated
      // with it, but who knows?

      for (var validatorIdx in validators) {
        var validator = validators[validatorIdx];
        validator.clearElementInvalid(element);
      }
    }
  }, {
    key: "_processQueuedOperations",
    value: function _processQueuedOperations() {
      for (var operationIdx in ComponentBehaviors.queued_operations) {
        var nextOp = ComponentBehaviors.queued_operations[operationIdx];
        var opName = nextOp.operation;
        var args = nextOp.args;
        (0, _utils.executeFunctionByName)(opName, ComponentBehaviors, args);
      }
    }
  }]);

  return ComponentBehaviors;
}();

exports.ComponentBehaviors = ComponentBehaviors;

_defineProperty(ComponentBehaviors, "queued_operations", []);

_defineProperty(ComponentBehaviors, "initialized", false);