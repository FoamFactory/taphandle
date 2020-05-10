import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import $ from 'jquery';

export class FullNameValidator extends FieldValidator {
  static _defaultValueMissingMessage = 'Please enter your full name';
  static _defaultMatchFailedMessage = 'Please enter at least a first and last name with alphabetic numerals only';

  constructor(prefix, options) {
    super(prefix, 'text', `${prefix}_fullNameField`, options);
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    // Short-circuit if the input is empty
    if (!requiredValuePresent) {
      return FullNameValidator._defaultValueMissingMessage;
    }

    // The full name field should contain at least two separate words, with no
    // numbers in between. (Capitalization doesn't matter)
    //
    // Valid:
    // Scott Johnson
    // scott johnson
    // Scott James Johnson
    // scott james johnson
    // Scott j Johnson
    // scott james Johnson III
    // Scott J Johnson Jr
    // Scott Johnson Junior
    // Scott J. Johnson
    // scott J. Johnson
    // Scott James Johnson, III
    // Scott J. Johnson, Sr.
    // Scott J. Johnson Jr.
    // Scott Johnson, Jr
    //
    // Invalid:
    // Scott J. Johnson 3
    // Scott Johnson 3
    // scott
    // Scott
    // Scott 'Jwir3' Johnson

    let fullNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])[a-zA-Z]*)+([.])*$/;
    let match = $(element).val().match(fullNameRegex);
    let valid = match && match.length > 0;

    if (!valid) {
      return FullNameValidator._defaultMatchFailedMessage;
    }

    return true;
  }

  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        FullNameValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         FullNameValidator);
    }
  }

  static getSelector() {
    return ['text', `${FieldValidator._prefix}_fullNameField`];
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
    let selector = FullNameValidator.getSelector();
    let cssSelector = FieldValidator.getCSSSelector(selector[0], selector[1]);
    return $(element).is(cssSelector);
  }

  /**
   * Set an element as invalid manually.
   *
   * This sets a validation message on an element manually. This validity
   * message is transient, meaning it will be cleared or overridden by standard
   * validation behaviors at a later date. This is mainly used to indicate that
   * some server-side validation returned an invalid value.
   *
   * @param {DOMElement | JQuery.Element} element The element to set as invalid.
   * @param {String} message The message to set as a validation message.
   *
   * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if called directly on the
   *         `FieldValidator` class. This should only happen if you add a new
   *         subclass of `FieldValidator` and neglect to implement this method.
   */
  static setElementInvalid(element, message) {
    $(element).data('manual-invalidation', 'true');

    let messageSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement
      = FieldValidator.getMessageElementForTarget(element, messageSelector);

    FullNameValidator.setOrClearValidityMessage(message, element,
                                                messageElement);
  }

  /**
   * Clear a previously set manual invalidation message.
   *
   * This clears messages set by `setElementInvalid`. This isn't completely
   * necessary, as normal validation behavior will do this automatically.
   *
   * @param {DOMElement | JQuery.Element} element The element to set as invalid.
   *
   * @throws `FieldValidator.UNIMPLEMENTED_ERROR` if called directly on the
   *         `FieldValidator` class. This should only happen if you add a new
   *         subclass of `FieldValidator` and neglect to implement this method.
   */
  static clearElementInvalid(element) {
    $(element).data('manual-invalidation', 'true');

    let messageSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement
      = FieldValidator.getMessageElementForTarget(element, messageSelector);

    FullNameValidator.setOrClearValidityMessage(true, element,
                                                messageElement);
  }
}
