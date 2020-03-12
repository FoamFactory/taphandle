import domready from 'domready';
import { Password } from './components/password';

const components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "password": Password
  // search,
  // skipnav,
  // validator,
};

export class ComponentBehaviors {
  constructor(prefix) {
    domready(() => {
      const target = document.body;
      Object.keys(components)
        .forEach((key) => {
          const behavior = new components[key](prefix);
          behavior.on(target);
        });
    });
  }
}
