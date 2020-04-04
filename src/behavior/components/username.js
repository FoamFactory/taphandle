import { FieldValidator } from './field-validator';
import { Behavior } from '../behavior';
import $ from 'jquery';

export class Username extends FieldValidator {
  constructor(prefix, options) {
    Username._fieldMessageClass = options['fieldMessageClass'];
    Username._defaultValueMissingMessage = 'Please enter a username';
    Username._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, `${prefix}_usernameField`, options);
  }

  static validate(element, messageElement) {
    if (element.validity.valueMissing) {
      if (messageElement.text().length === 0) {
        messageElement.text(Username._defaultValueMissingMessage);
      }

      $(element).addClass(Username._fieldMessageErrorClass);
      $(messageElement).css('visibility', 'visible');
    } else {
      $(element).removeClass(Username._fieldMessageErrorClass);
      $(messageElement).css('visibility', 'hidden');
    }
  }
}
