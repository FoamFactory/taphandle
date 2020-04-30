import { FieldValidator } from './field-validator';
import { PasswordConfirmation } from './password-confirmation';
import $ from 'jquery';

export class Password extends FieldValidator {
  static REFERENCED_CONFIRMATION_DOES_NOT_EXIST = "The referenced password confirmation field does not exist in the document";

  constructor(prefix, options) {
    Password._defaultValueMissingMessage = 'Password missing';
    Password._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, 'password', null, options);

    $(FieldValidator.getCSSSelector('password', null)).each(function () {
      if ($(this).data('shouldmatch') && !Password._getElementToMatch($(this))) {
        throw Password.REFERENCED_CONFIRMATION_DOES_NOT_EXIST;
      }
    });
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return Password._defaultValueMissingMessage;
    }

    let requiredMatchValid = Password.checkRequiredMatchValid(element);

    if (!requiredMatchValid) {
      return Password._defaultMatchFailedMessage;
    }

    return true;
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

  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        Password, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement, Password);

      // Also clear the confirmation field's error message
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = Password._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordConfirmation);
      }
    }
  }

  static getSelector() {
    return ['password', null];
  }
}
