import { FieldValidator } from './components/validation/field-validator';
import { FullNameValidator } from './components/validation/full-name-validator';
import { Password } from './components/validation/password';
import { PasswordConfirmation } from './components/validation/password-confirmation';
import { PasswordRevealIndicator } from './components/password-reveal-indicator';
import { Username } from './components/validation/username';

const components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "fullname": FullNameValidator,
  "password": Password,
  "password-confirmation": PasswordConfirmation,
  "password-reveal-indicator": PasswordRevealIndicator,
  "username": Username
  // search,
  // skipnav,
  // validator,
};

export class ComponentBehaviors {
  static init(prefix, options) {
    ComponentBehaviors._prefix = prefix;
    ComponentBehaviors._options = ComponentBehaviors.getDefaultOptions(prefix);
    ComponentBehaviors._behaviors = [];

    Object.assign(ComponentBehaviors._options, options);

    // Initialize all of the field validators with appropriate class names, if
    // they have one.
    FieldValidator.setPrefix(prefix);
    for (let nextComponent in components) {
      if (components[nextComponent].prototype instanceof FieldValidator) {
        FieldValidator.registerClassNameForType(components[nextComponent].getSelector()[1],
                                                components[nextComponent])
      }
    }

    ComponentBehaviors._setupComponentsOnDomReady();
  }

  static _setupComponentsOnDomReady() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      const target = document.body;
      Object.keys(components)
        .forEach((key) => {
          // if the target already has an on() handler for the given behavior,
          // we shouldn't re-enable a new one.
          ComponentBehaviors._enableComponentIfNotAlreadyEnabled(target,
                                                                 components[key]);
        });
    } else {
      window.setTimeout(ComponentBehaviors._setupComponentsOnDomReady, 100);
    }
  }

  static getOptions() {
    return ComponentBehaviors._options;
  }

  static getInstance(prefix, options) {
    if (!ComponentBehaviors._instances) {
      ComponentBehaviors._instances = [];
    }

    if (!(prefix in ComponentBehaviors._instances)
        || (!ComponentBehaviors._instances[prefix])) {
      ComponentBehaviors._instances[prefix]
        = ComponentBehaviors.init(prefix, options);
    }

    return ComponentBehaviors._instances[prefix];
  }

  static _enableComponentIfNotAlreadyEnabled(target, component) {
    // console.log(`TARGET: ${target}, COMPONENT: ${component}`);

    if (!(ComponentBehaviors._behaviors[target]
         && ComponentBehaviors._behaviors[target].includes(component))) {
      const behavior = new component(ComponentBehaviors._prefix,
                                     ComponentBehaviors._options);
      behavior.on(target);

      if (!ComponentBehaviors._behaviors[target]) {
        ComponentBehaviors._behaviors[target] = [];
      }

      ComponentBehaviors._behaviors[target].push(component);
    }
  }

  static getDefaultOptions(prefix) {
    return {
      "fieldMessageClass": `${prefix}_formFieldMessage`,
      "fieldErrorClass": `${prefix}_formFieldError`,
      "defaultValueMissingMessage": "Please fill in this field",
      "defaultMatchFailedMessage": "The field and its confirmation do not match"
    };
  }
}
