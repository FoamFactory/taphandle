import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import { PasswordValidator } from './password-validator';
import $ from 'jquery';

export class PasswordConfirmationValidator extends FieldValidator {
  static NO_PASSWORD_ERROR = 'A password confirmation validator must be set up with a password field to confirm. One was not found when initializing the document.'

  constructor(prefix, options) {
    PasswordConfirmationValidator._defaultValueMissingMessage = 'Please enter a password confirmation';

    super(prefix, 'password', `${prefix}_passwordConfirmationField`, options);

    // Make sure each password confirmation has a password to confirm
    $(`.${prefix}_passwordConfirmationField`).each(function (index) {
      let elementToMatch = PasswordValidator._getElementToMatch($(this));

      if (!elementToMatch) {
        throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
      }
    });
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return PasswordConfirmationValidator._defaultValueMissingMessage;
    }

    let requiredMatchValid = PasswordValidator.checkRequiredMatchValid(element);

    if (!requiredMatchValid) {
      return PasswordValidator._defaultMatchFailedMessage;
    }

    return true;
  }


  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        PasswordConfirmationValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         PasswordConfirmationValidator);

      // Also clear the password field's error message
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = PasswordValidator._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordValidator);
      } else {
        // The password field must have been removed from the DOM
        throw PasswordConfirmationValidator.NO_PASSWORD_ERROR;
      }
    }
  }

  static getSelector() {
    return ['password', `${FieldValidator._prefix}_passwordConfirmationField`];
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
    let selector = PasswordConfirmationValidator.getSelector();
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

    PasswordConfirmationValidator.setOrClearValidityMessage(message, element,
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

    PasswordConfirmationValidator.setOrClearValidityMessage(true, element,
                                                            messageElement);
  }
}
