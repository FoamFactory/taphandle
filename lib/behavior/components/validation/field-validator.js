"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldValidator = void 0;

var _behavior = require("../../behavior");

var _ = require("../../");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FieldValidator = /*#__PURE__*/function (_Behavior) {
  _inherits(FieldValidator, _Behavior);

  var _super = _createSuper(FieldValidator);

  function FieldValidator(prefix, expectedInputType, className, options) {
    _classCallCheck(this, FieldValidator);

    if (!options) {
      options = _.ComponentBehaviors.getDefaultOptions(prefix);
    }

    FieldValidator.setPrefix(prefix);
    FieldValidator._fieldMessageClass = options['fieldMessageClass'];
    FieldValidator._fieldMessageErrorClass = options['fieldErrorClass']; // We delegate some methods to the actual child class. This is kind of like
    // making an abstract method in Java.

    var delegateClass = this instanceof FieldValidator ? this.constructor : void 0;

    var changedMethod = function changedMethod(event) {
      FieldValidator.changed(event, delegateClass);
    };

    var selector = FieldValidator.getCSSSelector(expectedInputType, className);
    FieldValidator.removeAllErrors(expectedInputType, className);
    return _super.call(this, _defineProperty({}, 'change', _defineProperty({}, selector, changedMethod)));
  }

  _createClass(FieldValidator, null, [{
    key: "removeAllErrors",
    value: function removeAllErrors(expectedInputType, className) {
      // TODO_jwir3: There is a bug here now that we can not have class names.
      if (!className) {
        (0, _jquery["default"])("input[type=".concat(expectedInputType, "]")).each(function (index, element) {
          FieldValidator.removeAllErrorsOnElement((0, _jquery["default"])(element));
        });
      } else {
        (0, _jquery["default"])("input[type=".concat(expectedInputType, "].").concat(className)).each(function (index, element) {
          FieldValidator.removeAllErrorsOnElement((0, _jquery["default"])(element));
        });
      }
    }
  }, {
    key: "removeAllErrorsOnElement",
    value: function removeAllErrorsOnElement(element) {
      var skipAVFlag = element.data('skipautovalidation');

      if (!skipAVFlag) {
        // Remove any field error messages by setting them to display: none and
        // also remove any styling on the form field itself.
        var ffSelector = ".".concat(FieldValidator._prefix, "_formFieldMessage");
        var messageElement = element.siblings(ffSelector);
        (0, _jquery["default"])(messageElement).css('visibility', 'hidden');
        element.removeClass(FieldValidator._fieldMessageErrorClass);
      }
    }
  }, {
    key: "changed",
    value: function changed(event, delegateClass) {
      var target = event.target;
      var ffSelector = ".".concat(FieldValidator._prefix, "_formFieldMessage");
      var messageElement = (0, _jquery["default"])(target).siblings(ffSelector);
      var skipAVFlag = (0, _jquery["default"])(target).data('skipautovalidation');

      if (!skipAVFlag) {
        var valid = delegateClass.validate(target);
        delegateClass.setOrClearValidityMessage(valid, target, messageElement);
      }
    }
  }, {
    key: "enableErrorMessage",
    value: function enableErrorMessage(element, messageElement, delegateClass, message) {
      (0, _jquery["default"])(element).addClass(delegateClass._fieldMessageErrorClass);
      (0, _jquery["default"])(messageElement).text(message);
      (0, _jquery["default"])(messageElement).css('visibility', 'visible');
    }
  }, {
    key: "disableErrorMessage",
    value: function disableErrorMessage(element, messageElement, delegateClass) {
      (0, _jquery["default"])(element).removeClass(delegateClass._fieldMessageErrorClass);
      (0, _jquery["default"])(messageElement).css('visibility', 'hidden');
    }
    /**
     * Validate a field.
     *
     * This portion only validates the existence of something in the field, if the
     * field is marked as required. Individual sub-class implementations can be
     * more specific about validation.
     *
     * @param  {DOMElement} element The element to validate
     * @param  {jQuery.Element} messageElement The element that will contain the
     *         error message, if one should be set.
     *
     * @return {String} If valid, an empty string; a short descriptor as to why
     *         validation failed, otherwise.
     */

  }, {
    key: "validate",
    value: function validate(element) {
      if (element.validity.valueMissing) {
        return false;
      }

      return true;
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      throw 'Unimplemented. You want to implement this in your subclass of FieldValidator';
    }
    /**
     * Globally set the prefix to use for the `FieldValidator` objects to be
     * initialized.
     *
     * This method is used when we need to set up a prefix prior to the "real"
     * `ComponentBehavior` being initialized for a given `FieldValidator`
     * subclass. It is a fairly special dance of setting the prefix, loading the
     * necessary registered class names. The "actual" prefix is set during the
     * initialization of given `FieldValidator` instances when a specific
     * `ComponentBehavior` is constructed.
     *
     * NOTE: This may not play well when using multiple prefixes.
     *
     * @param {String} prefix The string containing the prefix to use for all CSS
     *        class names.
     */

  }, {
    key: "setPrefix",
    value: function setPrefix(prefix) {
      FieldValidator._prefix = prefix;
    }
    /**
     * Retrieve a dictionary of all registered CSS class names.
     *
     * @return {Array} A listing of all classes registered to validate input
     *         fields, keyed by the CSS class names used to identify them.
     */

  }, {
    key: "getRegisteredClassNames",
    value: function getRegisteredClassNames() {
      return FieldValidator._registeredClassNames;
    }
    /**
     * Register a CSS class name as corresponding to a specific validator type.
     *
     * @param  {String} className The name of the CSS class that, in combination
     *         with an input type, identifies the given validator type.
     * @param  {Object} type The JS class type that is used to process fields with
     *         the given input type and class name.
     */

  }, {
    key: "registerClassNameForType",
    value: function registerClassNameForType(className, type) {
      if (!FieldValidator._registeredClassNames) {
        FieldValidator._registeredClassNames = [];
      }

      if (className && !FieldValidator._registeredClassNames[className]) {
        FieldValidator._registeredClassNames[className] = type;
      }
    }
  }, {
    key: "getCSSSelector",
    value: function getCSSSelector(expectedInputType, className) {
      var selector = "input[type=\"".concat(expectedInputType, "\"]");

      if (className != null) {
        selector = selector + ".".concat(className);
      } else {
        for (var _className in FieldValidator.getRegisteredClassNames()) {
          selector = selector + ":not(.".concat(_className, ")");
        }
      }

      return selector;
    }
  }]);

  return FieldValidator;
}(_behavior.Behavior);

exports.FieldValidator = FieldValidator;