import { Password } from './components/password';
import { PasswordConfirmation } from './components/password-confirmation';
import { PasswordRevealIndicator } from './components/password-reveal-indicator';
import { Username } from './components/username';

const components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
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
    ComponentBehaviors._options = {
      "fieldMessageClass": `${prefix}_formFieldMessage`,
      "fieldErrorClass": `${prefix}_formFieldError`,
      "defaultValueMissingMessage": "Please fill in this field",
      "defaultMatchFailedMessage": "The field and its confirmation do not match"
    };

    Object.assign(ComponentBehaviors._options, options);

    ComponentBehaviors._setupComponentsOnDomReady();
  }

  static _setupComponentsOnDomReady() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      const target = document.body;
      Object.keys(components)
        .forEach((key) => {
          const behavior = new components[key](ComponentBehaviors._prefix, ComponentBehaviors._options);
          behavior.on(target);
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
}
