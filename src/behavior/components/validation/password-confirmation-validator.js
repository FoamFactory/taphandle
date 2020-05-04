import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import { PasswordValidator } from './password-validator';
import $ from 'jquery';

export class PasswordConfirmationValidator extends FieldValidator {
  static NO_PASSWORD_ERROR = 'A password confirmation validator must be set up with a password field to confirm. One was not found when initializing the document.'

  constructor(prefix, options) {
    PasswordConfirmationValidator._defaultValueMissingMessage = 'Please enter a password confirmation';

    super(prefix, 'password', `${prefix}_passwordConfirmationField`, options);

    // Make sure each password confirmation has a password to confirm
    $(`.${prefix}_passwordConfirmationField`).each(function (index) {
      let elementToMatch = PasswordValidator._getElementToMatch($(this));

      if (!elementToMatch) {
        throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
      }
    });
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return PasswordConfirmationValidator._defaultValueMissingMessage;
    }

    let requiredMatchValid = PasswordValidator.checkRequiredMatchValid(element);

    if (!requiredMatchValid) {
      return PasswordValidator._defaultMatchFailedMessage;
    }

    return true;
  }


  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        PasswordConfirmationValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         PasswordConfirmationValidator);

      // Also clear the password field's error message
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = PasswordValidator._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordValidator);
      } else {
        // The password field must have been removed from the DOM
        throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
      }
    }
  }

  static getSelector() {
    return ['password', `${FieldValidator._prefix}_passwordConfirmationField`];
  }
}
