"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldValidator = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Handler for validation of HTML form fields.
 *
 * Each form field to be validated should have a new instance of this class instantiated for it.
 */
var FieldValidator = /*#__PURE__*/function () {
  function FieldValidator(fieldElement) {
    _classCallCheck(this, FieldValidator);

    this.element = fieldElement[0];
    this.valid = false;
    this.messageElement = (0, _jquery["default"])(this.element).closest('div').find('.form-field-error');

    if ((0, _jquery["default"])(this.element).attr('type') === 'password') {
      this.messageElement = (0, _jquery["default"])(this.element).parent().parent().find('.form-field-error');
    } // TODO_jwir3: Eventually, what we want to do is have this validator Object
    //             create the element in question, and have the message stored
    //             in a "data-" attribute.


    this.defaultMessage = (0, _jquery["default"])(this.messageElement).text();
    this.messageShown = false;
  }

  _createClass(FieldValidator, [{
    key: "enable",
    value: function enable() {
      var self = this;
      self.element.addEventListener("blur", function (event) {
        self.validate();
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      this.element.removeEventListener("blur");
      (0, _jquery["default"])(self.element).removeClass('interacted');
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.valid;
    }
  }, {
    key: "setOnValidityChangedHandler",
    value: function setOnValidityChangedHandler(handler) {
      var self = this;
      self.onValidityChanged = handler;
    }
    /**
     * Set a temporary message to be displayed when the validation fails.
     *
     * This will set a temporary message that will be displayed up until the next
     * time validation occurs.
     *
     * @param {String} message The temporary message to set
     */

  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
      this.messageElement.text(this.message);
    }
  }, {
    key: "restoreDefaultMessage",
    value: function restoreDefaultMessage() {
      this.message = this.defaultMessage;
      this.messageElement.text(this.message);
    }
  }, {
    key: "showMessage",
    value: function showMessage() {
      this.messageShown = true;
      this.messageElement.show();
    }
  }, {
    key: "hideMessage",
    value: function hideMessage() {
      this.messageShown = false;
      this.messageElement.hide();
    }
  }, {
    key: "setValidity",
    value: function setValidity(validity) {
      if (this.messageShown) {
        this.restoreDefaultMessage();
      }

      if (validity) {
        this.hideMessage();
        this.element.setCustomValidity('');
      } else {
        (0, _jquery["default"])(this.element).addClass('interacted');
        this.element.setCustomValidity(this.message);
        this.showMessage();
      }

      this._recordValidity(validity);
    }
  }, {
    key: "validate",
    value: function validate() {
      var self = this;
      var element = self.element;
      var messageElement = self.messageElement;
      var isValid = false;
      (0, _jquery["default"])(element).addClass('interacted');

      if (element.validity.valueMissing) {
        if (messageElement.text().length === 0) {
          self.defaultMessage = 'Please fill in this field';
        }

        self.setValidity(false);
        return;
      } else if (element.validity.typeMismatch) {
        if (messageElement.text().length === 0) {
          self.defaultMessage = 'This input does not appear valid';
        }

        self.setValidity(false);
      } else {
        isValid = true;
        var elementToMatch = (0, _jquery["default"])(element).data('mustmatch');

        if (elementToMatch) {
          var matchingElement = (0, _jquery["default"])('#' + elementToMatch);

          if (!matchingElement.val()) {
            // Element isn't input yet, so just report true for validity.
            isValid = true;
          } else {
            isValid = matchingElement.val() === (0, _jquery["default"])(element).val();
          }
        }

        self.setValidity(isValid);
      }
    }
  }, {
    key: "_recordValidity",
    value: function _recordValidity(isValid) {
      if (self.onValidityChanged && isValid !== self.valid) {
        self.valid = isValid;
        self.onValidityChanged(self.valid);
      }

      self.valid = isValid;
    }
  }]);

  return FieldValidator;
}();

exports.FieldValidator = FieldValidator;