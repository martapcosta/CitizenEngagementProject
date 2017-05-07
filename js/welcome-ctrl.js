/**
 * Welcome controller
 */
angular.module('app').controller('WelcomePageController', function($scope,AuthService) {
  var welcomePageCtrl = this;


welcomePageCtrl.isActive = function() {
    
    return (!AuthService.token);
};

});
