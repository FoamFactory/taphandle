import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import $ from 'jquery';

export class Username extends FieldValidator {
  constructor(prefix, options) {
    Username._defaultValueMissingMessage = 'Please enter a username';

    super(prefix, 'text', `${prefix}_usernameField`, options);
  }

  static validate(element, messageElement) {
    let message = messageElement.text();
    if (element.validity.valueMissing) {
      if (messageElement.text().length === 0) {
        message = Username._defaultValueMissingMessage;
      }

      FieldValidator.enableErrorMessage(element, messageElement, Username,
                                        message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement, Username);
    }
  }

  static getSelector() {
    return ['text', `${FieldValidator._prefix}_usernameField`];
  }
}
