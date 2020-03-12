"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorHandler = void 0;

var _paulrevere = require("@foamfactory/paulrevere");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A messaging error handler for HTML forms.
 *
 * This class is a static class - it's not designed to be instantiated. Instead, its static methods
 * should be used within a page's dedicated Javascript to communicate UI error events.
 */
var ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }

  _createClass(ErrorHandler, null, [{
    key: "processError",
    value: function processError(statusCode, errorMessage) {
      switch (statusCode) {
        case 401:
          if (errorMessage === "An invalid username or password was supplied as part of the Authorization header") {
            _paulrevere.PaulRevere.getMessenger().displayErrorMessage('Invalid username or password');
          } else {
            _paulrevere.PaulRevere.getMessenger().displayErrorMessage('You are not authorized to access that resource');
          }

          break;

        case 409:
          _paulrevere.PaulRevere.getMessenger().displayErrorMessage(errorMessage);

          break;

        default:
          _paulrevere.PaulRevere.getMessenger().displayErrorMessage('An error has occurred on our servers. If this persists, please contact support.');

          break;
      }
    }
  }]);

  return ErrorHandler;
}();

exports.ErrorHandler = ErrorHandler;