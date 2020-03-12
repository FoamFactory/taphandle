"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBehaviors = void 0;

var _domready = _interopRequireDefault(require("domready"));

var _password = require("./components/password");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var components = {
  // accordion,
  // banner,
  // footer,
  // navigation,
  "password": _password.Password // search,
  // skipnav,
  // validator,

};

var ComponentBehaviors = function ComponentBehaviors(prefix) {
  _classCallCheck(this, ComponentBehaviors);

  (0, _domready["default"])(function () {
    var target = document.body;
    Object.keys(components).forEach(function (key) {
      var behavior = new components[key](prefix);
      behavior.on(target);
    });
  });
};

exports.ComponentBehaviors = ComponentBehaviors;