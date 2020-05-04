import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import $ from 'jquery';

export class GenericTextValidator extends FieldValidator {
  static _defaultValueMissingMessage = 'Please fill out this field';

  constructor(prefix, options) {
    super(prefix, 'text', null, options);
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return GenericTextValidator._defaultValueMissingMessage;
    }

    return true;
  }

  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        GenericTextValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         GenericTextValidator);
    }
  }

  static getSelector() {
    return ['text', null];
  }
}
