import { PaulRevere } from '@foamfactory/paulrevere';
import $ from 'jquery';

/**
 * A messaging error handler for HTML forms.
 *
 * This class is a static class - it's not designed to be instantiated. Instead, its static methods
 * should be used within a page's dedicated Javascript to communicate UI error events.
 */
export class ErrorHandler {
  static processError(statusCode, errorMessage) {
    switch (statusCode) {
      case 401:
        if (errorMessage === "An invalid username or password was supplied as part of the Authorization header") {
          PaulRevere.getMessenger().displayErrorMessage('Invalid username or password');
        } else {
          PaulRevere.getMessenger().displayErrorMessage('You are not authorized to access that resource');
        }
        break;
      case 409:
        PaulRevere.getMessenger().displayErrorMessage(errorMessage);
        break;
      default:
        PaulRevere.getMessenger().displayErrorMessage('An error has occurred on our servers. If this persists, please contact support.');
        break;
    }
  }
}
