import { ComponentBehaviors } from '../../../src';
import { FullNameValidator } from '../../../src/behavior/components/validation/full-name-validator';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('FullNameValidator', () => {
  beforeEach(() => {
    expect(document).not.toBeNull();
    document.body.innerHTML =
    '<div class="field">'
      + '<label class="label">Full Name</label>'
      + '<input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField input" required>'
      + '<p id="fullNameErrorMessage" class="ninkasi_formFieldMessage help is-danger"></p>'
    + '</div>'
  });

  describe ('before initialization', () =>{
      it ('should show FullNameValidator._defaultValueMissingMessage as defined', () => {
        expect(FullNameValidator._defaultValueMissingMessage).toBe('Please enter your full name');
      });
  });

  describe ('after initialization', () => {
      it ('the selector for a FullNameValidator object should be ["text", "ninkasi_fullNameField"]', () => {
        ComponentBehaviors.getInstance(PREFIX);

        expect(FullNameValidator.getSelector()).toStrictEqual(["text", "ninkasi_fullNameField"]);
      });
  });

  describe('when the page first loads', () => {
    it ('should not have any fields for describing error messages', () => {
      ComponentBehaviors.getInstance(PREFIX);

      expect($('#fullNameErrorMessage').css('visibility')).toBe('hidden');
    });

    describe ('when a full name validation field has the skip flag in its data attributes', () => {
      beforeEach(() => {
        document.body.innerHTML =
        '<div class="field">' +
        '  <label class="label">Full Name</label>' +
        '  <input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField is-danger input" data-skipautovalidation="true" required>' +
        '  <p id="fullNameErrorMessage" class="ninkasi_formFieldMessage help is-danger">Please enter your first and last name</p>' +
        '</div>';
      });

      it ('should not try to auto-validate that field', () => {
        ComponentBehaviors.getInstance(PREFIX);

        let fullNameField = document.getElementById('test-fullname');
        let messageElement = document.getElementById('fullNameErrorMessage');

        expect($(messageElement).text()).toBe('Please enter your first and last name');
        expect($(messageElement).css('visibility')).toEqual('visible');
        expect(_.values(fullNameField.classList)).toEqual(expect.arrayContaining(['is-danger']));
      });
    });
  });

  describe('after adding something to the full name field', () => {
    describe ('where the input is valid', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);
        expect(document).not.toBeNull();
        document.body.innerHTML =
          '<div class="field">'
            + '<label class="label">Full Name</label>'
            + '<input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField input" required>'
            + '<p id="fullNameErrorMessage" class="ninkasi_formFieldMessage help is-danger"></p>'
          + '</div>';

        let fullNameField = document.getElementById('test-fullname');
        expect(fullNameField).not.toBeNull();

        $(fullNameField).val('Scott Johnson');
        expect($(fullNameField).val()).toEqual('Scott Johnson');
      });

      it ('should not display an error message or have error styling on the input', () => {
        let fullNameField = document.getElementById('test-fullname');
        let messageElement = document.getElementById('fullNameErrorMessage');

        let changeEvent = new window.Event('change', {bubbles: true});
        fullNameField.dispatchEvent(changeEvent);

        expect($(fullNameField).val()).toEqual('Scott Johnson');
        expect($(messageElement).text()).toBe('');
        expect($(messageElement).css('visibility')).toEqual('hidden');
        expect(_.values(fullNameField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
      });
    });

    describe ('where the input is not valid', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);
        expect(document).not.toBeNull();
        document.body.innerHTML =
          '<div class="field">'
            + '<label class="label">Full Name</label>'
            + '<input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField input" required>'
            + '<p id="fullNameErrorMessage" class="ninkasi_formFieldMessage help is-danger"></p>'
          + '</div>';

        let fullNameField = document.getElementById('test-fullname');
        expect(fullNameField).not.toBeNull();

        $(fullNameField).val('Scott J. Johnson 3');
        expect($(fullNameField).val()).toEqual('Scott J. Johnson 3');
      });

      it ('should display an error message', () => {
        let fullNameField = document.getElementById('test-fullname');
        let messageElement = document.getElementById('fullNameErrorMessage');

        let changeEvent = new window.Event('change', {bubbles: true});
        fullNameField.dispatchEvent(changeEvent);

        expect($(fullNameField).val()).toEqual('Scott J. Johnson 3');
        expect($(messageElement).text()).toBe(FullNameValidator._defaultMatchFailedMessage);
        expect($(messageElement).css('visibility')).toEqual('visible');
        expect(_.values(fullNameField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
      });
    });

    describe('where the input is empty', () => {
      describe ('when the error message has not yet been populated', () => {
        beforeEach(() => {
          document.body.innerHTML =
          '<div class="field">' +
          '  <label class="label">Full Name</label>' +
          '  <input type="text" id="test-fullname" value="" placeholder="Please enter your full name" class="ninkasi_fullNameField is-danger input" required>' +
          '  <p id="fullNameErrorMessage" class="ninkasi_formFieldMessage help is-danger"></p>' +
          '</div>';
        });

        it ('should display a generic error message under the full name field', () => {
          ComponentBehaviors.init(PREFIX);

          let fullNameField = document.getElementById('test-fullname');
          expect(fullNameField).not.toBeNull();
          expect(_.values(fullNameField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldError']));

          let messageElement = document.getElementById('fullNameErrorMessage');
          expect($(messageElement).text()).toBe('');

          fullNameField.value = '';
          let changeEvent = new window.Event('change', {bubbles: true});
          fullNameField.dispatchEvent(changeEvent);

          expect($(messageElement).text()).toBe('Please enter your full name');
          expect(_.values(fullNameField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldError']));
        });
      });
    });
  });
});
