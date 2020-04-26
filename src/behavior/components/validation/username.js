import { FieldValidator } from './field-validator';
import { Behavior } from '../../behavior';
import $ from 'jquery';

export class Username extends FieldValidator {
  static _defaultValueMissingMessage = 'Please enter a username'

  constructor(prefix, options) {
    super(prefix, 'text', `${prefix}_usernameField`, options);
  }

  static validate(element, messageElement) {
    return super.validate(element, messageElement);
  }

  static getSelector() {
    return ['text', `${FieldValidator._prefix}_usernameField`];
  }
}
