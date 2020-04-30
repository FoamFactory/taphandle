"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullNameValidator = void 0;

var _fieldValidator = require("./field-validator");

var _behavior = require("../../behavior");

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

var FullNameValidator = /*#__PURE__*/function (_FieldValidator) {
  _inherits(FullNameValidator, _FieldValidator);

  var _super = _createSuper(FullNameValidator);

  function FullNameValidator(prefix, options) {
    _classCallCheck(this, FullNameValidator);

    return _super.call(this, prefix, 'text', "".concat(prefix, "_fullNameField"), options);
  }

  _createClass(FullNameValidator, null, [{
    key: "validate",
    value: function validate(element) {
      var requiredValuePresent = _get(_getPrototypeOf(FullNameValidator), "validate", this).call(this, element); // Short-circuit if the input is empty


      if (!requiredValuePresent) {
        return FullNameValidator._defaultValueMissingMessage;
      } // The full name field should contain at least two separate words, with no
      // numbers in between. (Capitalization doesn't matter)
      //
      // Valid:
      // Scott Johnson
      // scott johnson
      // Scott James Johnson
      // scott james johnson
      // Scott j Johnson
      // scott james Johnson III
      // Scott J Johnson Jr
      // Scott Johnson Junior
      // Scott J. Johnson
      // scott J. Johnson
      // Scott James Johnson, III
      // Scott J. Johnson, Sr.
      // Scott J. Johnson Jr.
      // Scott Johnson, Jr
      //
      // Invalid:
      // Scott J. Johnson 3
      // Scott Johnson 3
      // scott
      // Scott
      // Scott 'Jwir3' Johnson


      var fullNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])[a-zA-Z]*)+([.])*$/;
      var match = (0, _jquery["default"])(element).val().match(fullNameRegex);
      var valid = match && match.length > 0;

      if (!valid) {
        return FullNameValidator._defaultMatchFailedMessage;
      }

      return true;
    }
  }, {
    key: "setOrClearValidityMessage",
    value: function setOrClearValidityMessage(validityMessage, element, messageElement) {
      if (validityMessage !== true) {
        var message = validityMessage;

        _fieldValidator.FieldValidator.enableErrorMessage(element, messageElement, FullNameValidator, message);
      } else {
        _fieldValidator.FieldValidator.disableErrorMessage(element, messageElement, FullNameValidator);
      }
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return ['text', "".concat(_fieldValidator.FieldValidator._prefix, "_fullNameField")];
    }
  }]);

  return FullNameValidator;
}(_fieldValidator.FieldValidator);

exports.FullNameValidator = FullNameValidator;

_defineProperty(FullNameValidator, "_defaultValueMissingMessage", 'Please enter your full name');

_defineProperty(FullNameValidator, "_defaultMatchFailedMessage", 'Please enter at least a first and last name with alphabetic numerals only');

;