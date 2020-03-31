"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordConfirmation = void 0;

var _fieldValidator = require("./field-validator");

var _behavior = require("../behavior");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var PasswordConfirmation = /*#__PURE__*/function (_FieldValidator) {
  _inherits(PasswordConfirmation, _FieldValidator);

  var _super = _createSuper(PasswordConfirmation);

  function PasswordConfirmation(prefix, options) {
    _classCallCheck(this, PasswordConfirmation);

    return _super.call(this, prefix, "".concat(prefix, "_passwordConfirmationField"), options);
  }

  _createClass(PasswordConfirmation, null, [{
    key: "validate",
    value: function validate(element, messageElement) {
      var requiredMatchValid = Password.checkRequiredMatchValid(element);

      if (element.validity.valueMissing) {
        if (messageElement.text().length === 0) {
          messageElement.text(_fieldValidator.FieldValidator._defaultValueMissingMessage);
        }

        (0, _jquery["default"])(element).addClass(_fieldValidator.FieldValidator._fieldMessageErrorClass);
        (0, _jquery["default"])(messageElement).css('visibility', 'visible');
      } else if (!requiredMatchValid) {
        (0, _jquery["default"])(element).addClass(_fieldValidator.FieldValidator._fieldMessageErrorClass);
        (0, _jquery["default"])(messageElement).text(_fieldValidator.FieldValidator._defaultMatchFailedMessage);
        (0, _jquery["default"])(messageElement).css('visibility', 'visible');
      } else {
        (0, _jquery["default"])(element).removeClass(_fieldValidator.FieldValidator._fieldMessageErrorClass);
        (0, _jquery["default"])(messageElement).css('visibility', 'hidden');
      }
    }
  }, {
    key: "checkRequiredMatchValid",
    value: function checkRequiredMatchValid(element) {
      var elementToMatch = (0, _jquery["default"])(element).data('shouldmatch');
      console.log("Element to match: ");
      console.log(elementToMatch);

      if (elementToMatch) {
        var matchingElement = (0, _jquery["default"])('#' + elementToMatch);

        if (!matchingElement.val()) {
          // Element isn't input yet, so just report true for validity.
          return true;
        } else {
          return matchingElement.val() === (0, _jquery["default"])(element).val();
        }
      }

      return true;
    }
  }]);

  return PasswordConfirmation;
}(_fieldValidator.FieldValidator);

exports.PasswordConfirmation = PasswordConfirmation;