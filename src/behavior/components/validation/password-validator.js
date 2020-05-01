import { FieldValidator } from './field-validator';
import { PasswordConfirmationValidator } from './password-confirmation-validator';
import $ from 'jquery';

export class PasswordValidator extends FieldValidator {
  static REFERENCED_CONFIRMATION_DOES_NOT_EXIST = "The referenced password confirmation field does not exist in the document";

  constructor(prefix, options) {
    PasswordValidator._defaultValueMissingMessage = 'Password missing';
    PasswordValidator._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, 'password', null, options);

    $(FieldValidator.getCSSSelector('password', null)).each(function () {
      if ($(this).data('shouldmatch')
          && !PasswordValidator._getElementToMatch($(this))) {
        throw PasswordValidator.REFERENCED_CONFIRMATION_DOES_NOT_EXIST;
      }
    });
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return PasswordValidator._defaultValueMissingMessage;
    }

    let requiredMatchValid = PasswordValidator.checkRequiredMatchValid(element);

    if (!requiredMatchValid) {
      return PasswordValidator._defaultMatchFailedMessage;
    }

    return true;
  }

  static checkRequiredMatchValid(element) {
    let elementToMatch = PasswordValidator._getElementToMatch(element);
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
                                        PasswordValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         PasswordValidator);

      // Also clear the confirmation field's error message
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = PasswordValidator._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordConfirmationValidator);
      }
    }
  }

  static getSelector() {
    return ['password', null];
  }
}
