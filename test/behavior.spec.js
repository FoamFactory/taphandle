import { ComponentBehaviors } from '../src';
import _ from 'lodash';
import $ from 'jquery';

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
        expect(opts.fieldMessageErrorClass).toEqual("ninkasi_formFieldErrorMessage");
        expect(opts.defaultValueMissingMessage).toEqual("Please fill in this field");
      });
    });


    describe('with specific options set', () => {
      it ('should set up the appropriate options in ComponentBehaviors', () => {
        let componentBehaviors = ComponentBehaviors.getInstance(PREFIX, {
          "fieldMessageClass": "someFieldMessage",
          "fieldMessageErrorClass": "anError",
          "defaultValueMissingMessage": "Invalid input"
        });

        let opts = ComponentBehaviors.getOptions();

        expect(opts.fieldMessageClass).toEqual("someFieldMessage");
        expect(opts.fieldMessageErrorClass).toEqual("anError");
        expect(opts.defaultValueMissingMessage).toEqual("Invalid input");
      });
    });
  });
});
