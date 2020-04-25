import { Behavior } from '../../behavior';
import { ComponentBehaviors } from '../../';
import $ from 'jquery';

export class FieldValidator extends Behavior {
  constructor(prefix, expectedInputType, className, options) {
    if (!options) {
      options = ComponentBehaviors.getDefaultOptions(prefix);
    }

    FieldValidator.setPrefix(prefix);
    FieldValidator._fieldMessageClass = options['fieldMessageClass'];
    FieldValidator._fieldMessageErrorClass = options['fieldErrorClass'];

    // We delegate some methods to the actual child class. This is kind of like
    // making an abstract method in Java.
    let delegateClass = new.target;
    let changedMethod = (event) => {
      FieldValidator.changed(event, delegateClass);
    };

    let selector = `input[type="${expectedInputType}"]`;
    if (className != null) {
      selector = selector + `.${className}`;
    } else {
      for (let className in FieldValidator.getRegisteredClassNames()) {
        selector = selector + `:not(.${className})`;
      }
    }

    FieldValidator.removeAllErrors(expectedInputType, className);

    super({
      ['change']: {
        [selector]: changedMethod
      },
    });
  }

  static removeAllErrors(expectedInputType, className) {
    if (!className) {
      $(`input[type=${expectedInputType}]`).each((index, element) => {
        FieldValidator.removeAllErrorsOnElement($(element));
      });
    } else {
      $(`input[type=${expectedInputType}].${className}`).each((index, element) => {
        FieldValidator.removeAllErrorsOnElement($(element));
      });
    }
  }

  static removeAllErrorsOnElement(element) {
    let skipAVFlag = element.data('skipautovalidation');
    if (!skipAVFlag) {
      // Remove any field error messages by setting them to display: none and
      // also remove any styling on the form field itself.
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`;
      let messageElement = element.siblings(ffSelector);
      $(messageElement).css('visibility', 'hidden');
      element.removeClass(FieldValidator._fieldMessageErrorClass);
    }
  }

  static changed(event, delegateClass) {
    let target = event.target;
    let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement = $(target).siblings(ffSelector);

    let skipAVFlag = $(target).data('skipautovalidation');
    if (!skipAVFlag) {
      delegateClass.validate(target, messageElement);
    }
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

  static validate(element, messageElement) {
    throw 'Unimplemented. You want to implement this in your subclass of FieldValidator';
  }

  static getSelector() {
    throw 'Unimplemented. You want to implement this in your subclass of FieldValidator';
  }

  /**
   * Globally set the prefix to use for the `FieldValidator` objects to be
   * initialized.
   *
   * This method is used when we need to set up a prefix prior to the "real"
   * `ComponentBehavior` being initialized for a given `FieldValidator`
   * subclass. It is a fairly special dance of setting the prefix, loading the
   * necessary registered class names. The "actual" prefix is set during the
   * initialization of given `FieldValidator` instances when a specific
   * `ComponentBehavior` is constructed.
   *
   * NOTE: This may not play well when using multiple prefixes.
   *
   * @param {String} prefix The string containing the prefix to use for all CSS
   *        class names.
   */
  static setPrefix(prefix) {
    FieldValidator._prefix = prefix;
  }

  /**
   * Retrieve a dictionary of all registered CSS class names.
   *
   * @return {Array} A listing of all classes registered to validate input
   *         fields, keyed by the CSS class names used to identify them.
   */
  static getRegisteredClassNames() {
    return FieldValidator._registeredClassNames;
  }

  /**
   * Register a CSS class name as corresponding to a specific validator type.
   *
   * @param  {String} className The name of the CSS class that, in combination
   *         with an input type, identifies the given validator type.
   * @param  {Object} type The JS class type that is used to process fields with
   *         the given input type and class name.
   */
  static registerClassNameForType(className, type) {
    if (!FieldValidator._registeredClassNames) {
      FieldValidator._registeredClassNames = [];
    }

    if (className && !FieldValidator._registeredClassNames[className]) {
      FieldValidator._registeredClassNames[className] = type;
    }
  }
}
