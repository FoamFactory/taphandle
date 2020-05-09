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
    let selector = UsernameValidator.getSelector();
    let cssSelector = FieldValidator.getCSSSelector(selector[0], selector[1]);
    return $(element).is(cssSelector);
  }
}
