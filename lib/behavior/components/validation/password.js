"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Password = void 0;

var _fieldValidator = require("./field-validator");

var _passwordConfirmation = require("./password-confirmation");

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

var Password = /*#__PURE__*/function (_FieldValidator) {
  _inherits(Password, _FieldValidator);

  var _super = _createSuper(Password);

  function Password(prefix, options) {
    _classCallCheck(this, Password);

    Password._defaultValueMissingMessage = 'Password missing';
    Password._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];
    return _super.call(this, prefix, 'password', null, options);
  }

  _createClass(Password, null, [{
    key: "validate",
    value: function validate(element) {
      var requiredValuePresent = _get(_getPrototypeOf(Password), "validate", this).call(this, element);

      if (!requiredValuePresent) {
        return Password._defaultValueMissingMessage;
      }

      var requiredMatchValid = Password.checkRequiredMatchValid(element);

      if (!requiredMatchValid) {
        return Password._defaultMatchFailedMessage;
      }

      return true;
    }
  }, {
    key: "checkRequiredMatchValid",
    value: function checkRequiredMatchValid(element) {
      var elementToMatch = Password._getElementToMatch(element);

      if (elementToMatch) {
        if (!elementToMatch.val()) {
          // Element isn't input yet, so just report true for validity.
          return true;
        } else {
          return elementToMatch.val() === (0, _jquery["default"])(element).val();
        }
      } // This can only happen if the matching element was not found, so let's
      // output a warning.


      var matchId = (0, _jquery["default"])(element).data('shouldmatch');
      console.warn("Unable to find element with id: ".concat(matchId, " to match to password"));
      return true;
    }
  }, {
    key: "_getElementToMatch",
    value: function _getElementToMatch(element) {
      var elementToMatch = (0, _jquery["default"])(element).data('shouldmatch');

      if (elementToMatch && (0, _jquery["default"])('#' + elementToMatch).get(0)) {
        return (0, _jquery["default"])('#' + elementToMatch);
      }

      return null;
    }
  }, {
    key: "setOrClearValidityMessage",
    value: function setOrClearValidityMessage(validityMessage, element, messageElement) {
      if (validityMessage !== true) {
        var message = validityMessage;

        _fieldValidator.FieldValidator.enableErrorMessage(element, messageElement, Password, message);
      } else {
        _fieldValidator.FieldValidator.disableErrorMessage(element, messageElement, Password); // Also clear the confirmation field's error message


        var ffSelector = ".".concat(_fieldValidator.FieldValidator._prefix, "_formFieldMessage");

        var elementToMatch = Password._getElementToMatch(element);

        if (elementToMatch) {
          var pwMessageElement = (0, _jquery["default"])(elementToMatch).siblings(ffSelector);

          _fieldValidator.FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement, _passwordConfirmation.PasswordConfirmation);
        }
      }
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return ['password', null];
    }
  }]);

  return Password;
}(_fieldValidator.FieldValidator);

exports.Password = Password;