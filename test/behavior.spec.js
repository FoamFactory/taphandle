import { expect } from 'chai';
import { Password } from '../src/behavior/components/password';
import { ComponentBehaviors } from '../src';
import _ from 'lodash';

import { Behavior } from '../src/behavior/behavior';

const PREFIX = 'ninkasi';

describe ('ComponentBehavior', () => {
  it ('should load the module', () => {
    expect(ComponentBehaviors).to.not.be.undefined;
  });

  describe ('basic behavior class', () => {
    beforeEach(() => {
      expect(document).to.not.be.null;

      document.body.innerHTML =
        '<div>' +
        '  <input id="passwordPrompt" type="password" class="ninkasi-show_password" />' +
        '</div>';
    });

    it ('should be able to instantiate an instance of Behavior and use it to trigger specific things', () => {
      expect(Behavior).to.not.be.null;
      let didClick = false;

      let toggle = (event) => {
        didClick = true;
      };

      let testBed = new Behavior({
        ['click']: {
          [`.${PREFIX}-show_password, .${PREFIX}-show_multipassword`]: toggle
        }
      });

      expect(didClick).to.be.false;

      expect(testBed).to.not.be.null;

      let element = document.getElementById('passwordPrompt');
      expect(element).to.not.be.null;

      testBed.on(document.body);

      element.click();

      expect(didClick).to.be.true;
    });
  });

  describe ('password behavior class', () => {
    beforeEach(() => {
      expect(document).to.not.be.null;

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
      expect(eyeIcon).to.not.be.null;

      eyeIcon.click();

      eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).to.not.be.null;
      expect(_.values(eyeIcon.classList)).to.contain('fa-eye-slash');
    });
  });

  describe ('ComponentBehaviors', () => {
    beforeEach(() => {
      expect(document).to.not.be.null;

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
      expect(eyeIcon).to.not.be.null;

      eyeIcon.click();

      eyeIcon = document.getElementById('eye-icon');
      expect(eyeIcon).to.not.be.null;
      expect(_.values(eyeIcon.classList)).to.contain('fa-eye-slash');
    });
  });
});
