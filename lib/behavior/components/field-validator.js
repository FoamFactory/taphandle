"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldValidator = void 0;

var _behavior = require("../behavior");

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

  function FieldValidator(prefix, className, options) {
    _classCallCheck(this, FieldValidator);

    FieldValidator._prefix = prefix;
    FieldValidator._fieldMessageClass = options['fieldMessageClass'];
    FieldValidator._fieldMessageErrorClass = options['fieldMessageErrorClass']; // We delegate some methods to the actual child class. This is kind of like
    // making an abstract method in Java.

    var delegateClass = this instanceof FieldValidator ? this.constructor : void 0;

    var changedMethod = function changedMethod(event) {
      FieldValidator.changed(event, delegateClass);
    };

    FieldValidator.removeAllErrors(className);
    return _super.call(this, _defineProperty({}, 'change', _defineProperty({}, ".".concat(className), changedMethod)));
  }

  _createClass(FieldValidator, null, [{
    key: "removeAllErrors",
    value: function removeAllErrors(className) {
      // Remove any field error messages by setting them to display: none and
      // also remove any styling on the form field itself.
      (0, _jquery["default"])(".".concat(FieldValidator._fieldMessageClass)).css('visibility', 'hidden');
      (0, _jquery["default"])(".".concat(className)).removeClass(FieldValidator._fieldMessageErrorClass);
    }
  }, {
    key: "changed",
    value: function changed(event, delegateClass) {
      var target = event.target;
      var ffSelector = ".".concat(FieldValidator._prefix, "_formFieldMessage");
      var messageElement = (0, _jquery["default"])(target).siblings(ffSelector);
      delegateClass.validate(target, messageElement);
    }
  }, {
    key: "validate",
    value: function validate(element, messageElement) {
      throw 'Unimplemented. You want to implement this in your subclass of FieldValidator';
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
  }]);

  return FieldValidator;
}(_behavior.Behavior);

exports.FieldValidator = FieldValidator;