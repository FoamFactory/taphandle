import { ComponentBehaviors } from '../../../src';
import { FieldValidator } from '../../../src/behavior/components/validation/field-validator';

import _ from 'lodash';
import $ from 'jquery';

const PREFIX = 'ninkasi';
const UNIMPLEMENTED_ERROR = 'Unimplemented. You want to implement this in your subclass of FieldValidator';

describe ('FieldValidator', () => {
  describe ('getSelector()', () => {
    it ('should throw an exception if called directly', () => {
      expect(() => { FieldValidator.getSelector(); }).toThrow(UNIMPLEMENTED_ERROR);
    });
  });

  describe ('validate()', () => {
    it ('should throw an exception if called directly', () => {
      expect(() => { FieldValidator.validate(null, null); }).toThrow(UNIMPLEMENTED_ERROR);
    });
  });

  describe('getRegisteredClassNames()', () => {
    it ('should show there are two registered class names', () => {
      ComponentBehaviors.getInstance(PREFIX);

      let classNames = FieldValidator.getRegisteredClassNames();
      expect(Object.keys(classNames).length).toBe(2);
      expect(classNames['ninkasi_passwordConfirmationField']).toBeDefined();
      expect(classNames['ninkasi_usernameField']).toBeDefined();
    });
  });
});
