import { Behavior } from '../behavior';
import toggleFormInput from '../actions/toggle-form-input';

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

export class Password extends Behavior {
  constructor(prefix) {
    const LINK = `.${prefix}-show_password, .${prefix}-show_multipassword`;

    super({
      ['click']: {
        [LINK]: toggle
      }
    });
  }
}
