angular.module('app').controller('RegisterCtrl', function RegisterCtrl($http, $log, $state) {
  var register = this;
  register.user = {};
  // role has citizen by default
  register.user.roles = ["citizen"];

  // Creates an new user
  register.createUser = function() {
    delete register.error;
    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/users',
      data: register.user
    }).then(function(res) {
      $state.go('login');
    }).catch(function(error) {
      register.error = "Error while trying to register you";
      $log.error(error);
    })
  }
});
