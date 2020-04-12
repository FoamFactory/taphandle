import { Behavior } from '../behavior';
import $ from 'jquery';

export class FieldValidator extends Behavior {
  constructor(prefix, className, options) {
    FieldValidator._prefix = prefix;
    FieldValidator._fieldMessageClass = options['fieldMessageClass'];
    FieldValidator._fieldMessageErrorClass = options['fieldMessageErrorClass'];

    // We delegate some methods to the actual child class. This is kind of like
    // making an abstract method in Java.
    let delegateClass = new.target;
    let changedMethod = (event) => {
      FieldValidator.changed(event, delegateClass);
    };

    FieldValidator.removeAllErrors(className);

    super({
      ['change']: {
        [`.${className}`]: changedMethod
      },
    });
  }

  static removeAllErrors(className) {
    // Remove any field error messages by setting them to display: none and
    // also remove any styling on the form field itself.
    $(`.${FieldValidator._fieldMessageClass}`).css('visibility', 'hidden');
    $(`.${className}`).removeClass(FieldValidator._fieldMessageErrorClass);
  }

  static changed(event, delegateClass) {
    let target = event.target;
    let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement = $(target).siblings(ffSelector);

    delegateClass.validate(target, messageElement);
  }

  static validate(element, messageElement) {
    throw 'Unimplemented. You want to implement this in your subclass of FieldValidator';
  }

  static enableErrorMessage(element, messageElement, delegateClass, message) {
    $(element).addClass(delegateClass._fieldMessageErrorClass);
    $(messageElement).text(message);
    $(messageElement).css('visibility', 'visible');
  }

  static disableErrorMessage(element, messageElement, delegateClass) {
    $(element).removeClass(delegateClass._fieldMessageErrorClass);
    $(messageElement).css('visibility', 'hidden');
  }
}
