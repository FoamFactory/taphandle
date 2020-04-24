import { FieldValidator } from './field-validator';
import { PasswordConfirmation } from './password-confirmation';
import $ from 'jquery';

export class Password extends FieldValidator {
  constructor(prefix, options) {
    Password._defaultValueMissingMessage = 'Password missing';
    Password._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, 'password', `${prefix}_passwordField`, options);
  }

  static validate(element, messageElement) {
    let requiredMatchValid = Password.checkRequiredMatchValid(element);

    if (element.validity.valueMissing) {
      let message = messageElement.text();
      if (message.length === 0) {
        message = Password._defaultValueMissingMessage;
      }

      FieldValidator.enableErrorMessage(element, messageElement, Password,
                                        message);
    } else if (!requiredMatchValid) {
      FieldValidator.enableErrorMessage(element, messageElement, Password,
                                        Password._defaultMatchFailedMessage);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement, Password);

      // Make sure the matching element's validity message is cleared.
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = Password._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordConfirmation);
      }
    }
  }

  static checkRequiredMatchValid(element) {
    let elementToMatch = Password._getElementToMatch(element);
    if (elementToMatch) {
      if (!elementToMatch.val()) {
        // Element isn't input yet, so just report true for validity.
        return true;
      } else {
        return elementToMatch.val() === $(element).val();
      }
    }

    // This can only happen if the matching element was not found, so let's
    // output a warning.
    let matchId = $(element).data('shouldmatch');
    console.warn(`Unable to find element with id: ${matchId} to match to password`);
    return true;
  }

  static _getElementToMatch(element) {
    let elementToMatch = $(element).data('shouldmatch');
    if (elementToMatch && $('#' + elementToMatch).get(0)) {
      return $('#' + elementToMatch);
    }

    return null;
  }

  static getSelector() {
    return ['password', `${FieldValidator._prefix}_passwordField`];
  }
}
