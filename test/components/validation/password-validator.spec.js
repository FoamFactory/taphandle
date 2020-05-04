import { ComponentBehaviors } from '../../../src';
import { PasswordValidator } from '../../../src/behavior/components/validation/password-validator';
import { PasswordConfirmationValidator } from '../../../src/behavior/components/validation/password-confirmation-validator';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('PasswordValidator', () => {
  beforeEach(() => {
    expect(document).not.toBeNull();

    document.body.innerHTML =
      '<div class="field">'+
        '<label class="label">Password</label>' +
        '<input type="password" id="text-field-password" value="password" placeholder="" class="input" data-shouldmatch="text-field-password-confirmation" required>' +
        '<i id="eye-icon-password" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
        '<p id="password-error-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
      '</div>' +
      '<div class="field">' +
        '<label class="label">Password Confirmation</label>' +
        '<input type="password" id="text-field-password-confirmation" value="" placeholder="" class="ninkasi_passwordConfirmationField input" data-shouldmatch="text-field-password" required>' +
        '<i id="eye-icon-passwordConfirmation" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password-confirmation"></i>' +
        '<p id="password-confirmation-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
      '</div>';
  });

  describe ('after initialization', () => {
    describe ('when both the password field and password confirmation field are present', () => {
      beforeEach(() => {
        ComponentBehaviors.getInstance(PREFIX);
      });

      it ('should switch the icon when the show password icon is clicked', () => {
        // TODO_jwir3: There's a bug here. If ComponentBehaviors.getInstance() is
        // called one or more times _BEFORE_ this test, then the test fails.

        let eyeIcon = document.getElementById('eye-icon-password');
        expect(eyeIcon).not.toBeNull();

        eyeIcon.click();

        eyeIcon = document.getElementById('eye-icon-password');
        expect(eyeIcon).not.toBeNull();
        expect(_.values(eyeIcon.classList)).toEqual(expect.arrayContaining(['fa-eye-slash']));
      });

      it ('the selector for a Password object should be ["password", null]', () => {
        expect(PasswordValidator.getSelector()).toStrictEqual(["password", null]);
      });
    });
  });

  describe ('during initialization', () => {
    describe ('when there is a password confirmation field but no password field', () => {
      beforeEach(() => {
        document.body.innerHTML =
          '<div class="field">' +
            '<label class="label">Password Confirmation</label>' +
            '<input type="password" id="text-field-password-confirmation" value="" placeholder="" class="ninkasi_passwordConfirmationField input" data-shouldmatch="text-field-password" required>' +
            '<i id="eye-icon-passwordConfirmation" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password-confirmation"></i>' +
            '<p id="password-confirmation-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
          '</div>';
      })

      it ('should throw an exception', () => {
        expect(() => { ComponentBehaviors.getInstance(PREFIX); }).toThrow(PasswordConfirmationValidator.NO_PASSWORD_ERROR);
      });
    });

    describe ('when there is a password field but no password confirmation', () => {
      describe ('when the password field refers to a password confirmation', () => {
        beforeEach(() => {
          document.body.innerHTML =
            '<div class="field">'+
              '<label class="label">Password</label>' +
              '<input type="password" id="text-field-password" value="password" placeholder="" class="input" data-shouldmatch="text-field-password-confirmation" required>' +
              '<i id="eye-icon-password" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
              '<p id="password-error-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
            '</div>';
        });

        it ('should throw an exception', () => {
          expect(() => { ComponentBehaviors.getInstance(PREFIX); }).toThrow(PasswordValidator.REFERENCED_CONFIRMATION_DOES_NOT_EXIST);
        });
      });
    });
  });

  describe ('when validating the password', () => {
    describe ('after a password was input to the password confirmation field', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);

        $('#text-field-password-confirmation').val('password');
      });

      describe ('when the password input is empty', () => {
        it ('should not show an error message for the password confirmation', () => {
          let confField = document.getElementById('text-field-password-confirmation');
          let messageElement = document.getElementById('password-confirmation-message');

          let changeEvent = new window.Event('change', {bubbles: true});
          confField.dispatchEvent(changeEvent);

          expect($(confField).val()).toEqual('password');
          expect($(messageElement).css('visibility')).toEqual('hidden');
          expect(_.values(confField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });

        describe ('after clearing the password confirmation input', () => {
          beforeEach(() => {
              let confField = document.getElementById('text-field-password-confirmation');
              let messageElement = document.getElementById('password-confirmation-message');

              let changeEvent = new window.Event('change', {bubbles: true});
              confField.dispatchEvent(changeEvent);
          });

          it ('should display an error message for the password confirmation', () => {
            let confField = document.getElementById('text-field-password-confirmation');
            let messageElement = document.getElementById('password-confirmation-message');

            $(confField).val('');

            let changeEvent = new window.Event('change', {bubbles: true});
            confField.dispatchEvent(changeEvent);

            expect($(confField).val()).toEqual('');
            expect($(messageElement).css('visibility')).toEqual('visible');
            expect($(messageElement).text()).toEqual('Please enter a password confirmation');
            expect(_.values(confField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
          });
        });
      });

      describe ('after a password is input to the password field', () => {
        describe('when the password matches the confirmation field value', () => {
          beforeEach(() => {
            ComponentBehaviors.init(PREFIX);

            let passwordField = document.getElementById('text-field-password');
            expect(passwordField).not.toBeNull();

            $(passwordField).val('password');
            expect($(passwordField).val()).toEqual('password');
          });

          it ('should not display an error message for the password input', () => {
            let passwordField = document.getElementById('text-field-password');
            let messageElement = document.getElementById('password-error-message');

            let changeEvent = new window.Event('change', {bubbles: true});
            passwordField.dispatchEvent(changeEvent);

            expect($(passwordField).val()).toEqual('password');
            expect($(messageElement).css('visibility')).toEqual('hidden');
            expect(_.values(passwordField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
          });
        });

        describe('when the password input is different than the confirmation value', () => {
          beforeEach(() => {
            ComponentBehaviors.init(PREFIX);

            let passwordField = document.getElementById('text-field-password');
            expect(passwordField).not.toBeNull();

            $(passwordField).val('passw0rd');
            expect($(passwordField).val()).toEqual('passw0rd');
          });

          it ('should not display an error message for the password input', () => {
            let passwordField = document.getElementById('text-field-password');
            let messageElement = document.getElementById('password-error-message');

            let changeEvent = new window.Event('change', {bubbles: true});
            passwordField.dispatchEvent(changeEvent);

            expect($(passwordField).val()).toEqual('passw0rd');
            expect($(messageElement).css('visibility')).toEqual('visible');
            expect($(messageElement).text()).toEqual('The field and its confirmation do not match');
            expect(_.values(passwordField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
          });
        });
      });
    });

    describe ('after a password is input to the password field', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);

        let passwordField = document.getElementById('text-field-password');
        expect(passwordField).not.toBeNull();

        $(passwordField).val('zim');
        expect($(passwordField).val()).toEqual('zim');
      });

      it ('should not display an error message for the password input', () => {
        let passwordField = document.getElementById('text-field-password');
        let messageElement = document.getElementById('password-error-message');

        let changeEvent = new window.Event('change', {bubbles: true});
        passwordField.dispatchEvent(changeEvent);

        expect($(passwordField).val()).toEqual('zim');
        expect($(messageElement).css('visibility')).toEqual('hidden');
        expect(_.values(passwordField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
      });

      describe ('when the matching element cannot be found', () => {
        beforeEach(() => {
          let passwordField = document.getElementById('text-field-password');
          $(passwordField).data('shouldmatch', 'blahblablah');
        });

        it ('should not display an error message for the password input', () => {
          let passwordField = document.getElementById('text-field-password');
          let messageElement = document.getElementById('password-error-message');

          let changeEvent = new window.Event('change', {bubbles: true});
          passwordField.dispatchEvent(changeEvent);

          expect($(passwordField).val()).toEqual('zim');
          expect($(messageElement).css('visibility')).toEqual('hidden');
          expect(_.values(passwordField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });
      });

      describe ('when the password field is cleared', () => {
        beforeEach(() => {
          let passwordField = document.getElementById('text-field-password');
          expect(passwordField).not.toBeNull();

          $(passwordField).val('');
          expect($(passwordField).val()).toEqual('');
        });

        it ('should display an error message for the password input', () => {
          let passwordField = document.getElementById('text-field-password');
          let messageElement = document.getElementById('password-error-message');

          let changeEvent = new window.Event('change', {bubbles: true});
          passwordField.dispatchEvent(changeEvent);

          expect($(passwordField).val()).toEqual('');
          expect($(messageElement).css('visibility')).toEqual('visible');
          expect($(messageElement).text()).toEqual('Password missing');
          expect(_.values(passwordField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });
      });

      describe ('when a different password is input into the confirmation field', () => {
        beforeEach(() => {
          let confField = document.getElementById('text-field-password-confirmation');
          $(confField).val('zoop');
        });

        it ('should report an error on the password confirmation field', () => {
          let confField = document.getElementById('text-field-password-confirmation');
          let messageElement = document.getElementById('password-confirmation-message');

          let changeEvent = new window.Event('change', {bubbles: true});
          confField.dispatchEvent(changeEvent);

          expect($(confField).val()).toEqual('zoop');
          expect($(messageElement).css('visibility')).toEqual('visible');
          expect($(messageElement).text()).toEqual('The field and its confirmation do not match');
          expect(_.values(confField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });
      });
    });
  });

  describe ('when validating the password confirmation', () => {
    describe ('after the password field has been removed from the dom', () => {
      describe ('when input is made to the password confirmation field', () => {
        beforeEach(() => {
          ComponentBehaviors.getInstance(PREFIX);

          let confField = document.getElementById('text-field-password-confirmation');
          $(confField).val('zoop');

          // TODO_jwir3: This is trying to test line 60 in
          // password-confirmation.js, but it doesn't seem to be working.

          // let passwordElement = document.getElementById('text-field-password');
          // passwordElement.parentNode.removeChild(passwordElement);
        });

        xit ('should throw an exception', () => {
          let confField = document.getElementById('text-field-password-confirmation');
          let messageElement = document.getElementById('password-confirmation-message');

          let changeEvent = new window.Event('change', {bubbles: true});

          expect(() => { confField.dispatchEvent(changeEvent); }).toThrow(PasswordConfirmationValidator.NO_PASSWORD_ERROR);
        });
      });
    });
  });
});
