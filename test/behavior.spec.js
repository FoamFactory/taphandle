import { ComponentBehaviors } from '../src';
import { PasswordConfirmationValidator } from '../src/behavior/components/validation/password-confirmation-validator';
import { PasswordValidator } from '../src/behavior/components/validation/password-validator';
import { Behavior } from '../src/behavior/behavior';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('ComponentBehavior', () => {
  it ('should load the module', () => {
    expect(ComponentBehaviors).toBeDefined();
  });

  describe ('basic behavior class', () => {
    beforeEach(() => {
      expect(document).not.toBeNull();

      document.body.innerHTML =
        '<div>' +
        '  <input id="passwordPrompt" type="password" class="ninkasi_show-password" />' +
        '</div>';
    });

    it ('should be able to instantiate an instance of Behavior and use it to trigger specific things', () => {
      expect(Behavior).not.toBeNull();
      let didClick = false;

      let toggle = (event) => {
        didClick = true;
      };

      let testBed = new Behavior({
        ['click']: {
          [`.${PREFIX}_show-password, .${PREFIX}-show-multipassword`]: toggle
        }
      });

      expect(didClick).toBe(false);

      expect(testBed).not.toBeNull();

      let element = document.getElementById('passwordPrompt');
      expect(element).not.toBeNull();

      testBed.on(document.body);

      element.click();

      expect(didClick).toBe(true);
    });
  });

  describe ('ComponentBehaviors', () => {
    describe ('with a simple DOM', () => {
      beforeEach(() => {
        expect(document).not.toBeNull();

        document.body.innerHTML =
        '<div>' +
        '  <input type="password" id="text-field-password" value="password" placeholder="" class="">' +
        '  <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
        '</div>';
      });

      describe('with no options specified', () => {
        it ('should set up all component behaviors with default options', () => {
          let componentBehaviors = ComponentBehaviors.getInstance(PREFIX);
          let opts = ComponentBehaviors.getOptions();

          let eyeIcon = document.getElementById('eye-icon');
          expect(eyeIcon).not.toBeNull();

          eyeIcon.click();

          eyeIcon = document.getElementById('eye-icon');
          expect(eyeIcon).not.toBeNull();
          expect(_.values(eyeIcon.classList)).toEqual(expect.arrayContaining(['fa-eye-slash']));

          expect(opts.fieldMessageClass).toEqual("ninkasi_formFieldMessage");
          expect(opts.fieldErrorClass).toEqual("ninkasi_formFieldError");
          expect(opts.defaultValueMissingMessage).toEqual("Please fill in this field");
        });
      });

      describe('with specific options set', () => {
        it ('should set up the appropriate options in ComponentBehaviors', () => {
          let componentBehaviors = ComponentBehaviors.getInstance(PREFIX, {
            "fieldMessageClass": "someFieldMessage",
            "fieldErrorClass": "anError",
            "defaultValueMissingMessage": "Invalid input"
          });

          let opts = ComponentBehaviors.getOptions();

          expect(opts.fieldMessageClass).toEqual("someFieldMessage");
          expect(opts.fieldErrorClass).toEqual("anError");
          expect(opts.defaultValueMissingMessage).toEqual("Invalid input");
        });
      });
    });
  });

  describe ('with a complicated DOM', () => {
    beforeEach(() => {
      expect(document).not.toBeNull();

      document.body.innerHTML = `
        <div class="field">
          <label class="label">Full Name</label>
          <input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField input" required>
          <p class="ninkasi_formFieldMessage help is-danger"></p>
        </div>
        <div class="field">
          <label class="label">Generic Text</label>
          <input type="text" id="test-generic" value="" placeholder="Please enter something" class="input" required>
          <p class="ninkasi_formFieldMessage help is-danger"></p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="field-icon-container">
            <input type="password" id="text-field-password" value="password" placeholder="" class="input" data-shouldmatch="text-field-password-confirmation" required>
            <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>
          </div>
          <p class="ninkasi_formFieldMessage help is-danger">Please enter a password</p>
        </div>
        <div class="field">
          <label class="label">Password Confirmation</label>
          <div class="field-icon-container">
            <input type="password" id="text-field-password-confirmation" value="" placeholder="" class="ninkasi_passwordConfirmationField input" data-shouldmatch="text-field-password" required>
            <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password-confirmation"></i>
          </div>
          <p class="ninkasi_formFieldMessage help is-danger">Please enter a password confirmation</p>
        </div>
        <div class="field">
          <label class="label">Username</label>
          <input type="text" id="test-username" value="" placeholder="Please enter your username" class="ninkasi_usernameField input" required>
          <p id="username-error-mesage" class="ninkasi_formFieldMessage help is-danger"></p>
        </div>
      `.trim();
    });

    describe('#getMatchingValidatorsforElement()', () => {
      it ('should show that the element with id "text-field-password-confirmation" matches a single PasswordConfirmationValidator', () => {
        let componentBehaviors = ComponentBehaviors.getInstance(PREFIX, {
          'fieldErrorClass': 'is-danger'
        });

        let element = document.getElementById('text-field-password-confirmation');
        expect(element).not.toBeNull();

        let matchedComponents = ComponentBehaviors.getMatchingValidatorsforElement(element);
        expect(matchedComponents.length).toBe(1);
        expect(_.values(matchedComponents)).toEqual(expect.arrayContaining([PasswordConfirmationValidator]));
      });

      it ('should show that the element with id "text-field-password" matches a single PasswordValidator', () => {
        let componentBehaviors = ComponentBehaviors.getInstance(PREFIX, {
          'fieldErrorClass': 'is-danger'
        });

        let element = document.getElementById('text-field-password');
        expect(element).not.toBeNull();

        let matchedComponents = ComponentBehaviors.getMatchingValidatorsforElement(element);
        expect(matchedComponents.length).toBe(1);
        expect(_.values(matchedComponents)).toEqual(expect.arrayContaining([PasswordValidator]));
      });
    });
  });
});
