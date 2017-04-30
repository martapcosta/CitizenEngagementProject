angular.module('app').controller('RegisterCtrl', function RegisterCtrl($http, $log, $state) {
  var register = this;

  register.user = {};
  register.user.roles = ["citizen"];
  register.createUser = function() {
    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/users', //https://citizen-api.herokuapp.com/api/auth',
      data: register.user
    }).then(function(res) {
      $state.go('login');
    }).catch(function(error) {
      login.error = "Error while trying to log you in";
      $log.error(error);
    })
  }
});
