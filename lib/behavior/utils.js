"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeFunctionByName = executeFunctionByName;

/**
 * Execute a function by name and context.
 *
 * Copied from https://stackoverflow.com/a/359910/281460
 *
 * @param  {String} functionName The name of the function to execute.
 * @param  {String} context The context within which to execute the function. If
 *                          the function doesn't have a context, just pass
 *                          'window' for this parameter.
 * @param  {Array} args  The arguments to pass to the function
 *
 * @return The return value of the function within the context to execute.
 */
function executeFunctionByName(functionName, context, args) {
  var namespaces = functionName.split(".");
  var func = namespaces.pop();

  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }

  return context[func].apply(context, args);
}