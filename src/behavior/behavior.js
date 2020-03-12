import { behavior } from 'receptor';

/**
 * Call a set of functions on a target in sequence.
 *
 * We used a named function here because we want it to inherit its lexical scope
 * from the behavior properties object, not from the module.
 *
 * @param {...Function} seq An array of functions that should be called on a
 *        target.
 */
const sequence = (...seq) => function callHooks(target = document.body) {
  seq.forEach((method) => {
    if (typeof this[method] === 'function') {
      this[method].call(this, target);
    }
  });
};

export class Behavior extends behavior {
  constructor(events, properties) {
    super(events, Object.assign({
      on: sequence('init', 'add'),
      off: sequence('teardown', 'remove')
    }, properties));
  }
}
