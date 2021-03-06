"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordConfirmationValidator = void 0;

var _fieldValidator = require("./field-validator");

var _behavior = require("../../behavior");

var _passwordValidator = require("./password-validator");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PasswordConfirmationValidator = /*#__PURE__*/function (_FieldValidator) {
  _inherits(PasswordConfirmationValidator, _FieldValidator);

  var _super = _createSuper(PasswordConfirmationValidator);

  function PasswordConfirmationValidator(prefix, options) {
    var _this;

    _classCallCheck(this, PasswordConfirmationValidator);

    PasswordConfirmationValidator._defaultValueMissingMessage = 'Please enter a password confirmation';
    _this = _super.call(this, prefix, 'password', "".concat(prefix, "_passwordConfirmationField"), options); // Make sure each password confirmation has a password to confirm

    (0, _jquery["default"])(".".concat(prefix, "_passwordConfirmationField")).each(function (index) {
      var elementToMatch = _passwordValidator.PasswordValidator._getElementToMatch((0, _jquery["default"])(this));

      if (!elementToMatch) {
        throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
      }
    });
    return _this;
  }

  _createClass(PasswordConfirmationValidator, null, [{
    key: "validate",
    value: function validate(element) {
      var requiredValuePresent = _get(_getPrototypeOf(PasswordConfirmationValidator), "validate", this).call(this, element);

      if (!requiredValuePresent) {
        return PasswordConfirmationValidator._defaultValueMissingMessage;
      }

      var requiredMatchValid = _passwordValidator.PasswordValidator.checkRequiredMatchValid(element);

      if (!requiredMatchValid) {
        return _passwordValidator.PasswordValidator._defaultMatchFailedMessage;
      }

      return true;
    }
  }, {
    key: "setOrClearValidityMessage",
    value: function setOrClearValidityMessage(validityMessage, element, messageElement) {
      if (validityMessage !== true) {
        var message = validityMessage;

        _fieldValidator.FieldValidator.enableErrorMessage(element, messageElement, PasswordConfirmationValidator, message);
      } else {
        _fieldValidator.FieldValidator.disableErrorMessage(element, messageElement, PasswordConfirmationValidator); // Also clear the password field's error message


        var ffSelector = ".".concat(_fieldValidator.FieldValidator._prefix, "_formFieldMessage");

        var elementToMatch = _passwordValidator.PasswordValidator._getElementToMatch(element);

        if (elementToMatch) {
          var pwMessageElement = (0, _jquery["default"])(elementToMatch).siblings(ffSelector);

          _fieldValidator.FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement, _passwordValidator.PasswordValidator);
        } else {
          // The password field must have been removed from the DOM
          throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
        }
      }
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return ['password', "".concat(_fieldValidator.FieldValidator._prefix, "_passwordConfirmationField")];
    }
    /**
     * Determine if an element matches the CSS selector for this
     * {FieldValidator}.
     *
     * @param {DOMElement|JQuery.Element} element An element in the DOM that
     *        should be checked against for matching the CSS selector.
     *
     * @return {boolean} `true`, if the given element matches the selector for
     *         this {FieldValidator}; `false`, otherwise.
     *
     * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if used on the
     *         {FieldValidator} base class rather than a subclass of
     *         {FieldValidator}.
     */

  }, {
    key: "doesElementMatchSelector",
    value: function doesElementMatchSelector(element) {
      var selector = PasswordConfirmationValidator.getSelector();

      var cssSelector = _fieldValidator.FieldValidator.getCSSSelector(selector[0], selector[1]);

      return (0, _jquery["default"])(element).is(cssSelector);
    }
    /**
     * Set an element as invalid manually.
     *
     * This sets a validation message on an element manually. This validity
     * message is transient, meaning it will be cleared or overridden by standard
     * validation behaviors at a later date. This is mainly used to indicate that
     * some server-side validation returned an invalid value.
     *
     * @param {DOMElement | JQuery.Element} element The element to set as invalid.
     * @param {String} message The message to set as a validation message.
     *
     * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if called directly on the
     *         `FieldValidator` class. This should only happen if you add a new
     *         subclass of `FieldValidator` and neglect to implement this method.
     */

  }, {
    key: "setElementInvalid",
    value: function setElementInvalid(element, message) {
      (0, _jquery["default"])(element).data('manual-invalidation', 'true');
      var messageSelector = ".".concat(_fieldValidator.FieldValidator._prefix, "_formFieldMessage");

      var messageElement = _fieldValidator.FieldValidator.getMessageElementForTarget(element, messageSelector);

      PasswordConfirmationValidator.setOrClearValidityMessage(message, element, messageElement);
    }
    /**
     * Clear a previously set manual invalidation message.
     *
     * This clears messages set by `setElementInvalid`. This isn't completely
     * necessary, as normal validation behavior will do this automatically.
     *
     * @param {DOMElement | JQuery.Element} element The element to set as invalid.
     *
     * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if called directly on the
     *         `FieldValidator` class. This should only happen if you add a new
     *         subclass of `FieldValidator` and neglect to implement this method.
     */

  }, {
    key: "clearElementInvalid",
    value: function clearElementInvalid(element) {
      (0, _jquery["default"])(element).data('manual-invalidation', 'true');
      var messageSelector = ".".concat(_fieldValidator.FieldValidator._prefix, "_formFieldMessage");

      var messageElement = _fieldValidator.FieldValidator.getMessageElementForTarget(element, messageSelector);

      PasswordConfirmationValidator.setOrClearValidityMessage(true, element, messageElement);
    }
  }]);

  return PasswordConfirmationValidator;
}(_fieldValidator.FieldValidator);

exports.PasswordConfirmationValidator = PasswordConfirmationValidator;

_defineProperty(PasswordConfirmationValidator, "NO_PASSWORD_ERROR", 'A password confirmation validator must be set up with a password field to confirm. One was not found when initializing the document.');