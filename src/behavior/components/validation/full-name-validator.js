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
};
