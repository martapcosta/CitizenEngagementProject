angular.module('app').controller('LoginCtrl', function LoginCtrl(AuthService, $http, $log, $state) {
  var login = this;

  login.user = {};

  login.connect = function connect() {
    delete login.error;

    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/auth', //https://citizen-api.herokuapp.com/api/auth',
      //data: login.user
      data: { "name": "jdoe", 
      "password":"test"}
    }).then(function(res) {
      AuthService.setToken(res.data.token);
      $state.go('home');
    }).catch(function(error) {
      login.error = "Error while trying to log you in";
      $log.error(error);
    })
  }
});
