import { FieldValidator } from './components/validation/field-validator';
import { FullNameValidator } from './components/validation/full-name-validator';
import { GenericTextValidator } from './components/validation/generic-text-validator';
import { PasswordValidator } from './components/validation/password-validator';
import { PasswordConfirmationValidator } from './components/validation/password-confirmation-validator';
import { PasswordRevealIndicator } from './components/password-reveal-indicator';
import { UsernameValidator } from './components/validation/username-validator';

const components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "fullname": FullNameValidator,
  "generictext": GenericTextValidator,
  "password": PasswordValidator,
  "password-confirmation": PasswordConfirmationValidator,
  "password-reveal-indicator": PasswordRevealIndicator,
  "username": UsernameValidator
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

  /**
   * Retrieve the {FieldValidator}s for which a given element is matched.
   *
   * This method will give a set of javascript class objects for which a given
   * element (either {DOMElement} or a {JQuery.Element}) matches the CSS
   * selectors for.
   *
   * @param  {DOMElement|JQuery.Element} element  The element to check against
   *         the set of active components
   *
   * @return {Array} A set of javascript classes defining the components that
   *         are subclasses of {FieldValidator} and the given element matches
   *         CSS selectors for.
   */
  static getMatchingValidatorsforElement(element) {
    let matchingComponents = [];
    for (let componentName in components) {
      let componentClass = components[componentName];
      if (componentClass.prototype instanceof FieldValidator) {
        if (componentClass.doesElementMatchSelector(element)) {
          matchingComponents.push(componentClass);
        }
      }
    }

    return matchingComponents;
  }
}
