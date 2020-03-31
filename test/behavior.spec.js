import { Password } from '../src/behavior/components/password';
import { ComponentBehaviors } from '../src';
import _ from 'lodash';

import { Behavior } from '../src/behavior/behavior';

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
        '  <input id="passwordPrompt" type="password" class="ninkasi-show_password" />' +
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
          [`.${PREFIX}-show_password, .${PREFIX}-show_multipassword`]: toggle
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

  describe ('password behavior class', () => {
    beforeEach(() => {
      expect(document).not.toBeNull();

      document.body.innerHTML =
      '<div>' +
      '  <input type="password" id="text-field-password" value="password" placeholder="" class="">' +
      '  <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi-show_password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
      '</div>';
    });

    it ('should switch the icon when the show password icon is clicked', () => {
      let password = new Password(PREFIX);
      password.on(document.body);

      let eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).not.toBeNull();

      eyeIcon.click();

      eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).not.toBeNull();
      expect(_.values(eyeIcon.classList)).toEqual(expect.arrayContaining(['fa-eye-slash']));
    });
  });

  describe ('ComponentBehaviors', () => {
    beforeEach(() => {
      expect(document).not.toBeNull();

      document.body.innerHTML =
      '<div>' +
      '  <input type="password" id="text-field-password" value="password" placeholder="" class="">' +
      '  <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi-show_password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
      '</div>';
    });

    it ('should set up all component behaviors', () => {
      // Check password component behavior
      let componentBehaviors = new ComponentBehaviors(PREFIX);
      let eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).not.toBeNull();

      eyeIcon.click();

      eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).not.toBeNull();
      expect(_.values(eyeIcon.classList)).toEqual(expect.arrayContaining(['fa-eye-slash']));
    });
  });
});
