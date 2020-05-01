import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import $ from 'jquery';

export class UsernameValidator extends FieldValidator {
  static _defaultValueMissingMessage = 'Please enter a username'

  constructor(prefix, options) {
    super(prefix, 'text', `${prefix}_usernameField`, options);
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return UsernameValidator._defaultValueMissingMessage;
    }

    return true;
  }

  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        UsernameValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         UsernameValidator);
    }
  }

  static getSelector() {
    return ['text', `${FieldValidator._prefix}_usernameField`];
  }
}
