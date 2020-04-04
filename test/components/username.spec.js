import { ComponentBehaviors } from '../../src';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('Username', () => {
  beforeEach(() => {
    expect(document).not.toBeNull();
    document.body.innerHTML =
    '<div class="field">' +
    '  <label class="label">Username</label>' +
    '  <input type="username" id="test-username" value="" placeholder="Please enter your username" class="ninkasi_usernameField input" required>' +
    '  <p id="usernameErrorMessage" class="ninkasi_formFieldMessage help is-danger">Username not valid</p>' +
    '</div>';
  });

  describe('when the page first loads', () => {
    it ('should not have any fields for describing error messages', () => {
      expect($('.form-field-error').length).toBe(0);
    });
  });

  describe('after adding something to the username field', () => {
    describe ('where the input is valid', () => {
      beforeEach(() => {
        ComponentBehaviors.init(PREFIX);
        expect(document).not.toBeNull();
        document.body.innerHTML =
        '<div class="field">' +
        '  <label class="label">Username</label>' +
        '  <input type="username" id="test-username" value="" placeholder="Please enter your username" class="ninkasi_usernameField input" required>' +
        '  <p id="usernameErrorMessage" class="ninkasi_formFieldMessage usernameField help is-danger">Username not valid</p>' +
        '</div>';

        let usernameField = document.getElementById('test-username');
        expect(usernameField).not.toBeNull();

        $(usernameField).val('zim');
        expect($(usernameField).val()).toEqual('zim');
      });

      it ('should not display an error message or have error styling on the input', () => {
        let usernameField = document.getElementById('test-username');
        let messageElement = document.getElementById('usernameErrorMessage');

        let changeEvent = new window.Event('change', {bubbles: true});
        usernameField.dispatchEvent(changeEvent);

        expect($(usernameField).val()).toEqual('zim');
        expect($(messageElement).text()).toBe('Username not valid');
        expect($(messageElement).css('visibility')).toEqual('hidden');
        expect(_.values(usernameField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldErrorMessage']));
      });
    });

    describe('where the input is empty', () => {
      describe ('when the error message is already populated', () => {
        it ('should display the specified error message under the username field', () => {
          ComponentBehaviors.init(PREFIX);

          let usernameField = document.getElementById('test-username');
          expect(usernameField).not.toBeNull();
          expect(_.values(usernameField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldErrorMessage']));

          let messageElement = document.getElementById('usernameErrorMessage');

          usernameField.value = '';
          let changeEvent = new window.Event('change', {bubbles: true});
          usernameField.dispatchEvent(changeEvent);

          expect($(messageElement).text()).toBe('Username not valid');
          expect(_.values(usernameField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldErrorMessage']));
        });
      });

      describe ('when the error message has not yet been populated', () => {
        beforeEach(() => {
          document.body.innerHTML =
          '<div class="field">' +
          '  <label class="label">Username</label>' +
          '  <input type="username" id="test-username" value="" placeholder="Please enter your username" class="ninkasi_usernameField input" required>' +
          '  <p id="usernameErrorMessage" class="ninkasi_formFieldMessage help is-danger"></p>' +
          '</div>';
        });

        it ('should display a generic error message under the username field', () => {
          ComponentBehaviors.init(PREFIX);

          let usernameField = document.getElementById('test-username');
          expect(usernameField).not.toBeNull();
          expect(_.values(usernameField.classList)).not.toEqual(expect.arrayContaining(['ninkasi_formFieldErrorMessage']));

          let messageElement = document.getElementById('usernameErrorMessage');
          expect($(messageElement).text()).toBe('');

          usernameField.value = '';
          let changeEvent = new window.Event('change', {bubbles: true});
          usernameField.dispatchEvent(changeEvent);

          expect($(messageElement).text()).toBe('Please enter a username');
          expect(_.values(usernameField.classList)).toEqual(expect.arrayContaining(['ninkasi_formFieldErrorMessage']));
        });
      });
    });
  });
});
