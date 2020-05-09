import { ComponentBehaviors } from '../../../src';
import { GenericTextValidator } from '../../../src/behavior/components/validation/generic-text-validator';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('GenericTextValidator', () => {
  beforeEach(() => {
    expect(document).not.toBeNull();
    document.body.innerHTML =
    '<div class="field">' +
      '<label class="label">Generic Text</label>' +
      '<input type="text" id="test-generic" value="" placeholder="Please enter something" class="input" required>' +
      '<p id="generic-text-error-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
    '</div>';
  });

  describe ('after initialization', () => {
      it ('the selector for a GenericTextValidator object should be ["text", null]', () => {
        ComponentBehaviors.getInstance(PREFIX);

        expect(GenericTextValidator.getSelector()).toStrictEqual(["text", null]);
      });

      it ('should show that the element with id test-generic matches the selector for GenericTextValidators', () => {
        expect(GenericTextValidator.doesElementMatchSelector($('#test-generic'))).toBe(true);
      });
  });

  describe('when the page first loads', () => {
    it ('should not have any fields for describing error messages', () => {
      ComponentBehaviors.getInstance(PREFIX);

      expect($('#generic-text-error-message').css('visibility')).toBe('hidden');
    });

    describe ('when a generic text field has the skip flag in its data attributes', () => {
      beforeEach(() => {
        document.body.innerHTML =
        '<div class="field">' +
          '<label class="label">Generic Text</label>' +
          '<input type="text" id="test-generic" value="" placeholder="Please enter something" class="is-danger input" data-skipautovalidation="true" required>' +
          '<p id="generic-text-error-message" class="ninkasi_formFieldMessage help is-danger">Test error message</p>' +
        '</div>';
      });

      it ('should not try to auto-validate that field', () => {
        ComponentBehaviors.getInstance(PREFIX);

        let genericTextField = document.getElementById('test-generic');
        let messageElement = document.getElementById('generic-text-error-message');

        expect($(messageElement).text()).toBe('Test error message');
        expect($(messageElement).css('visibility')).toEqual('visible');
        expect(_.values(genericTextField.classList)).toEqual(expect.arrayContaining(['is-danger']));
      });
    });
  });

  describe('after adding something to the generic text field', () => {
    describe ('where the input is valid', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);
        expect(document).not.toBeNull();
        document.body.innerHTML =
        '<div class="field">' +
          '<label class="label">Generic Text</label>' +
          '<input type="text" id="test-generic" value="" placeholder="Please enter something" class="input" required>' +
          '<p id="generic-text-error-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
        '</div>';

        let genericTextField = document.getElementById('test-generic');
        expect(genericTextField).not.toBeNull();

        $(genericTextField).val('hoopla');
        expect($(genericTextField).val()).toEqual('hoopla');
      });

      it ('should not display an error message or have error styling on the input', () => {
        let genericTextField = document.getElementById('test-generic');
        let messageElement = document.getElementById('generic-text-error-message');

        let changeEvent = new window.Event('change', {bubbles: true});
        genericTextField.dispatchEvent(changeEvent);

        expect($(genericTextField).val()).toEqual('hoopla');
        expect($(messageElement).css('visibility')).toEqual('hidden');
        expect(_.values(genericTextField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
      });
    });

    describe('where the input is empty', () => {
      describe ('when the error message has not yet been populated', () => {
        beforeEach(() => {
          document.body.innerHTML =
          '<div class="field">' +
            '<label class="label">Generic Text</label>' +
            '<input type="text" id="test-generic" value="" placeholder="Please enter something" class="input" required>' +
            '<p id="generic-text-error-message" class="ninkasi_formFieldMessage help is-danger"></p>' +
          '</div>';
        });

        it ('should display a generic error message under the generic text field', () => {
          ComponentBehaviors.init(PREFIX);

          let genericTextField = document.getElementById('test-generic');
          expect(genericTextField).not.toBeNull();
          expect(_.values(genericTextField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));

          let messageElement = document.getElementById('generic-text-error-message');
          expect($(messageElement).text()).toBe('');

          genericTextField.value = '';
          let changeEvent = new window.Event('change', {bubbles: true});
          genericTextField.dispatchEvent(changeEvent);

          expect($(messageElement).text()).toBe(GenericTextValidator._defaultValueMissingMessage);
          expect(_.values(genericTextField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });
      });
    });
  });
});
