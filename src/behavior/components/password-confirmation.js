import { FieldValidator } from './field-validator';
import { Behavior } from '../behavior';
import { Password } from './password';
import $ from 'jquery';

export class PasswordConfirmation extends FieldValidator {
  constructor(prefix, options) {
    PasswordConfirmation._defaultValueMissingMessage = 'Password confirmation missing';

    super(prefix, `${prefix}_passwordConfirmationField`, options);
  }

  static validate(element, messageElement) {
    let requiredMatchValid = Password.checkRequiredMatchValid(element);

    if (element.validity.valueMissing) {
      let message = messageElement.text();
      if (message.length === 0) {
        message = PasswordConfirmation._defaultValueMissingMessage;
      }

      FieldValidator.enableErrorMessage(element, messageElement,
                                        PasswordConfirmation, message);
    } else if (!requiredMatchValid) {
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
}
