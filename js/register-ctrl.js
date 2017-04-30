angular.module('app').controller('RegisterCtrl', function RegisterCtrl($http, $state) {
  var register = this;

  register.user = {};

  register.createUser = function createUser() {
    delete register.error;

    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/users', //https://citizen-api.herokuapp.com/api/auth',
      data: {
          "name": "rutepereira2",
          "password": "abcd",
          "firstname": "Rute",
          "lastname": "Pereira",
          "phone": "(460) 614-2120",
          "roles": [
          "citizen"
          ]
      }    
  }).then(function(res) {
      //AuthService.setToken(res.data.token);
      $state.go('login');
  }).catch(function(error) {
      //login.error = "Error while trying to log you in";
      //$log.error(error);
  })
}
});


/*(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterCtrl(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();*/
