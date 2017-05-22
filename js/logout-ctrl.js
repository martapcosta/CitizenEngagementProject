/**
* Controller to manage the logout function
*/
angular.module('app').controller('LogoutCtrl', function LogoutCtrl(AuthService, $state) {
  var logout = this;

  /**
   *  Logs out the currents logged user
   */
  logout.disconnect = function() {
    AuthService.unsetToken();
    $state.go('login');
  }
});
