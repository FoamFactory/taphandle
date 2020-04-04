import $ from 'jquery';

/**
 * Handler for validation of HTML form fields.
 *
 * Each form field to be validated should have a new instance of this class instantiated for it.
 */
export class FieldValidator {
  constructor (fieldElement) {
    this.element = fieldElement[0];
    this.valid = false;

    this.messageElement = $(this.element).closest('div').find('.form-field-error');
    if ($(this.element).attr('type') === 'password') {
      this.messageElement = $(this.element).parent().parent().find('.form-field-error');
    }

    // TODO_jwir3: Eventually, what we want to do is have this validator Object
    //             create the element in question, and have the message stored
    //             in a "data-" attribute.
    this.defaultMessage = $(this.messageElement).text();
    this.messageShown = false;
  }

  enable() {
    let self = this;

    self.element.addEventListener("blur", function(event) {
      self.validate();
    });
  }

  disable() {
    this.element.removeEventListener("blur");
    $(self.element).removeClass('interacted');
  }

  isValid() {
    return this.valid;
  }

  setOnValidityChangedHandler(handler) {
    let self = this;
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
  setMessage(message) {
    this.message = message;
    this.messageElement.text(this.message);
  }

  restoreDefaultMessage() {
    this.message = this.defaultMessage;
    this.messageElement.text(this.message);
  }

  showMessage() {
    this.messageShown = true;
    this.messageElement.show();
  }

  hideMessage() {
    this.messageShown = false;
    this.messageElement.hide();
  }

  setValidity(validity) {
    if (this.messageShown) {
      this.restoreDefaultMessage();
    }

    if (validity) {
      this.hideMessage();
      this.element.setCustomValidity('');
    } else {
      $(this.element).addClass('interacted');
      this.element.setCustomValidity(this.message);
      this.showMessage();
    }

    this._recordValidity(validity);
  }

  validate() {
    let self = this;
    let element = self.element;
    let messageElement = self.messageElement;
    let isValid = false;

    $(element).addClass('interacted');

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
      let elementToMatch = $(element).data('mustmatch');
      if (elementToMatch) {
        let matchingElement = $('#' + elementToMatch);
        if (!matchingElement.val()) {
          // Element isn't input yet, so just report true for validity.
          isValid = true;
        } else {
          isValid = matchingElement.val() === $(element).val();
        }
      }

      self.setValidity(isValid);
    }
  }

  _recordValidity(isValid) {
    if (self.onValidityChanged && isValid !== self.valid) {
      self.valid = isValid;
      self.onValidityChanged(self.valid);
    }

    self.valid = isValid;
  }
}
