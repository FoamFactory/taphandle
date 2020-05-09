import { Behavior } from '../../behavior';
import { ComponentBehaviors } from '../../';
import $ from 'jquery';

export class FieldValidator extends Behavior {
  static UNIMPLEMENTED_ERROR = "Unimplemented. You must implement this in a subclass of FieldValidator"

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

    let selector = FieldValidator.getCSSSelector(expectedInputType, className);

    FieldValidator.removeAllErrors(expectedInputType, className);

    super({
      ['change']: {
        [selector]: changedMethod
      },
    });
  }

  static removeAllErrors(expectedInputType, className) {
    // TODO_jwir3: There is a bug here now that we can not have class names.
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

  static getMessageElementForTarget(target, messageSelector) {
    let messageElement = $(target).siblings(messageSelector)

    // Also check any cousin(s), if the message element isn't present
    if (!messageElement[0]) {
      messageElement = $(target).parent().siblings(messageSelector);
    }

    return messageElement;
  }

  static removeAllErrorsOnElement(element) {
    let skipAVFlag = element.data('skipautovalidation');
    if (!skipAVFlag) {
      // Remove any field error messages by setting them to display: none and
      // also remove any styling on the form field itself.
      let messageSelector = `.${FieldValidator._prefix}_formFieldMessage`;
      let messageElement
        = FieldValidator.getMessageElementForTarget(element, messageSelector);
      $(messageElement).css('visibility', 'hidden');
      element.removeClass(FieldValidator._fieldMessageErrorClass);
    }
  }

  static changed(event, delegateClass) {
    let target = event.target;
    let messageSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement
      = FieldValidator.getMessageElementForTarget(target, messageSelector);

    let skipAVFlag = $(target).data('skipautovalidation');
    if (!skipAVFlag) {
      let valid = delegateClass.validate(target);

      delegateClass.setOrClearValidityMessage(valid, target, messageElement);
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

  /**
   * Validate a field.
   *
   * This portion only validates the existence of something in the field, if the
   * field is marked as required. Individual sub-class implementations can be
   * more specific about validation.
   *
   * @param  {DOMElement} element The element to validate
   * @param  {jQuery.Element} messageElement The element that will contain the
   *         error message, if one should be set.
   *
   * @return {String} If valid, an empty string; a short descriptor as to why
   *         validation failed, otherwise.
   */
  static validate(element) {
    if (element.validity.valueMissing) {
      return false;
    }

    return true;
  }

  static getSelector() {
    throw FieldValidator.UNIMPLEMENTED_ERROR;
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

  static getCSSSelector(expectedInputType, className) {
    let selector = `input[type="${expectedInputType}"]`;
    if (className != null) {
      selector = selector + `.${className}`;
    } else {
      for (let className in FieldValidator.getRegisteredClassNames()) {
        selector = selector + `:not(.${className})`;
      }
    }

    return selector;
  }

  /**
   * Determine if an element matches the CSS selector for this
   * {FieldValidator}.
   *
   * @param {DOMElement|JQuery.Element} element An element in the DOM that
   *        should be checked against for matching the CSS selector.
   *
   * @return {boolean} `true`, if the given element matches the selector for
   *         this {FieldValidator}; `false`, otherwise.
   *
   * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if used on the
   *         {FieldValidator} base class rather than a subclass of
   *         {FieldValidator}.
   */
  static doesElementMatchSelector(element) {
    throw FieldValidator.UNIMPLEMENTED_ERROR;
  }
}
