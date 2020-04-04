import { FieldValidator } from './field-validator';
import { Behavior } from '../behavior';
import $ from 'jquery';

export class Password extends FieldValidator {
  constructor(prefix, options) {
    Password._defaultValueMissingMessage = 'Password missing';
    Password._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, `${prefix}_passwordField`, options);
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

  static checkRequiredMatchValid(element) {
    let elementToMatch = $(element).data('shouldmatch');
    if (elementToMatch) {
      let matchingElement = $('#' + elementToMatch);
      if (!matchingElement.val()) {
        // Element isn't input yet, so just report true for validity.
        return true;
      } else {
        return matchingElement.val() === $(element).val();
      }
    }

    return true;
  }
}
