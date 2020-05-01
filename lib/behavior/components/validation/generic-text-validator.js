"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericTextValidator = void 0;

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

var GenericTextValidator = /*#__PURE__*/function (_FieldValidator) {
  _inherits(GenericTextValidator, _FieldValidator);

  var _super = _createSuper(GenericTextValidator);

  function GenericTextValidator(prefix, options) {
    _classCallCheck(this, GenericTextValidator);

    return _super.call(this, prefix, 'text', null, options);
  }

  _createClass(GenericTextValidator, null, [{
    key: "validate",
    value: function validate(element) {
      var requiredValuePresent = _get(_getPrototypeOf(GenericTextValidator), "validate", this).call(this, element);

      if (!requiredValuePresent) {
        return GenericTextValidator._defaultValueMissingMessage;
      }

      return true;
    }
  }, {
    key: "setOrClearValidityMessage",
    value: function setOrClearValidityMessage(validityMessage, element, messageElement) {
      if (validityMessage !== true) {
        var message = validityMessage;

        _fieldValidator.FieldValidator.enableErrorMessage(element, messageElement, GenericTextValidator, message);
      } else {
        _fieldValidator.FieldValidator.disableErrorMessage(element, messageElement, GenericTextValidator);
      }
    }
  }, {
    key: "getSelector",
    value: function getSelector() {
      return ['text', null];
    }
  }]);

  return GenericTextValidator;
}(_fieldValidator.FieldValidator);

exports.GenericTextValidator = GenericTextValidator;

_defineProperty(GenericTextValidator, "_defaultValueMissingMessage", 'Please fill out this field');