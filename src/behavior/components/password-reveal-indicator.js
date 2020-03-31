import { Behavior } from '../behavior';
import toggleFormInput from '../actions/toggle-form-input';

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

export class PasswordRevealIndicator extends Behavior {
  constructor(prefix, options) {
    const LINK = `.${prefix}_show-password, .${prefix}_show-multipassword`;

    super({
      ['click']: {
        [LINK]: toggle
      }
    });
  }
}
