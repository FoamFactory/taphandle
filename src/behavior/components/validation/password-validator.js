import { FieldValidator } from './field-validator';
import { PasswordConfirmationValidator } from './password-confirmation-validator';
import $ from 'jquery';

export class PasswordValidator extends FieldValidator {
  static REFERENCED_CONFIRMATION_DOES_NOT_EXIST = "The referenced password confirmation field does not exist in the document";

  constructor(prefix, options) {
    PasswordValidator._defaultValueMissingMessage = 'Password missing';
    PasswordValidator._defaultMatchFailedMessage = options['defaultMatchFailedMessage'];

    super(prefix, 'password', null, options);

    $(FieldValidator.getCSSSelector('password', null)).each(function () {
      if ($(this).data('shouldmatch')
          && !PasswordValidator._getElementToMatch($(this))) {
        throw PasswordValidator.REFERENCED_CONFIRMATION_DOES_NOT_EXIST;
      }
    });
  }

  static validate(element) {
    let requiredValuePresent = super.validate(element);

    if (!requiredValuePresent) {
      return PasswordValidator._defaultValueMissingMessage;
    }

    let requiredMatchValid = PasswordValidator.checkRequiredMatchValid(element);

    if (!requiredMatchValid) {
      return PasswordValidator._defaultMatchFailedMessage;
    }

    return true;
  }

  static checkRequiredMatchValid(element) {
    let elementToMatch = PasswordValidator._getElementToMatch(element);
    if (elementToMatch) {
      if (!elementToMatch.val()) {
        // Element isn't input yet, so just report true for validity.
        return true;
      } else {
        return elementToMatch.val() === $(element).val();
      }
    }

    // This can only happen if the matching element was not found, so let's
    // output a warning.
    let matchId = $(element).data('shouldmatch');
    console.warn(`Unable to find element with id: ${matchId} to match to password`);
    return true;
  }

  static _getElementToMatch(element) {
    let elementToMatch = $(element).data('shouldmatch');
    if (elementToMatch && $('#' + elementToMatch).get(0)) {
      return $('#' + elementToMatch);
    }

    return null;
  }

  static setOrClearValidityMessage(validityMessage, element, messageElement) {
    if (validityMessage !== true) {
      let message = validityMessage;

      FieldValidator.enableErrorMessage(element, messageElement,
                                        PasswordValidator, message);
    } else {
      FieldValidator.disableErrorMessage(element, messageElement,
                                         PasswordValidator);

      // Also clear the confirmation field's error message
      let ffSelector = `.${FieldValidator._prefix}_formFieldMessage`
      let elementToMatch = PasswordValidator._getElementToMatch(element);
      if (elementToMatch) {
        let pwMessageElement = $(elementToMatch).siblings(ffSelector);
        FieldValidator.disableErrorMessage(elementToMatch, pwMessageElement,
                                           PasswordConfirmationValidator);
      }
    }
  }

  static getSelector() {
    return ['password', null];
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
    let selector = PasswordValidator.getSelector();
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

    PasswordValidator.setOrClearValidityMessage(message, element,
                                                messageElement);
  }

  static clearElementInvalid(element) {
    $(element).data('manual-invalidation', 'true');

    let messageSelector = `.${FieldValidator._prefix}_formFieldMessage`;
    let messageElement
      = FieldValidator.getMessageElementForTarget(element, messageSelector);

    PasswordValidator.setOrClearValidityMessage(true, element, messageElement);
  }
}
