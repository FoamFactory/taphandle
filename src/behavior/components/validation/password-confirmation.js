import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import { Password } from './password';
import $ from 'jquery';

export class PasswordConfirmation extends FieldValidator {
  constructor(prefix, options) {
    PasswordConfirmation._defaultValueMissingMessage = 'Password confirmation missing';

    super(prefix, 'password', `${prefix}_passwordConfirmationField`, options);
  }

  static validate(element, messageElement) {
    let requiredValidation = super.validate(element, messageElement);

    let requiredMatchValid = Password.checkRequiredMatchValid(element);

    if (!requiredValidation) {
      return false;
    }

    if (!requiredMatchValid) {
      FieldValidator.enableErrorMessage(element, messageElement,
                                        PasswordConfirmation,
                                        Password._defaultMatchFailedMessage);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         PasswordConfirmation);
      // Make sure the matching element's validity message is cleared.
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = Password._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           Password);
      }
    }
  }

  static getSelector() {
    return ['password', `${FieldValidator._prefix}_passwordConfirmationField`];
  }
}
