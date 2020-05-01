import { Behavior } from '../behavior';
import toggleFormInput from '../actions/toggle-form-input';

export class PasswordRevealIndicator extends Behavior {
  constructor(prefix, options) {
    let selector = `.${prefix}_show-password, .${prefix}_show-multipassword`;

    let clickedMethod = (event) => {
      PasswordRevealIndicator.clicked(event);
    };

    super({
      ['click']: {
        [selector]: clickedMethod
      }
    });
  }

  static clicked(event) {
    event.preventDefault();
    toggleFormInput(event.target);
  }
}
