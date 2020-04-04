import { FieldValidator } from './field-validator';
import { Behavior } from '../behavior';
import { Password } from './password';
import $ from 'jquery';

export class PasswordConfirmation extends FieldValidator {
  constructor(prefix, options) {
    super(prefix, `${prefix}_passwordConfirmationField`, options);
  }

  static validate(element, messageElement) {
    let requiredMatchValid = Password.checkRequiredMatchValid(element);

    if (element.validity.valueMissing) {
      if (messageElement.text().length === 0) {
        messageElement.text(Password._defaultValueMissingMessage);
      }

      $(element).addClass(Password._fieldMessageErrorClass);
      $(messageElement).css('visibility', 'visible');
    } else if (!requiredMatchValid) {
      $(element).addClass(Password._fieldMessageErrorClass);
      $(messageElement).text(Password._defaultMatchFailedMessage);
      $(messageElement).css('visibility', 'visible');
    } else {
      $(element).removeClass(Password._fieldMessageErrorClass);
      $(messageElement).css('visibility', 'hidden');
    }
  }
}
