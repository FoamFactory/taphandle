import { ComponentBehaviors } from '../../src';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';

describe ('Password', () => {
  beforeEach(() => {
    expect(document).not.toBeNull();

    document.body.innerHTML =
    '<div>' +
    '  <input type="password" id="text-field-password" value="password" placeholder="" class="ninkasi_passwordField" data-shouldMatch="text-field-password-confirmation">' +
    '  <i id="eye-icon" class="fa fa-fw fa-eye field-icon ninkasi_show-password" aria-label="password-visibility-control" aria-hidden="true" aria-controls="text-field-password"></i>' +
    '  <input type="password" id="text-field-password-confirmation" value="" placeholder="" class="ninkasi_passwordConfirmationField">' +
    '</div>';
  });

  it ('should switch the icon when the show password icon is clicked', () => {
    ComponentBehaviors.init(PREFIX);

    let eyeIcon = document.getElementById('eye-icon');
    expect(eyeIcon).not.toBeNull();

    eyeIcon.click();

    eyeIcon = document.getElementById('eye-icon');
    expect(eyeIcon).not.toBeNull();
    expect(_.values(eyeIcon.classList)).toEqual(expect.arrayContaining(['fa-eye-slash']));
  });

  describe ('when validating the password',() => {

  });
});
