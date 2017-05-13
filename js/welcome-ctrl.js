/**
 * Welcome controller
 */
angular.module('app').controller('WelcomePageController', function($location,$scope,AuthService) {
  var welcomePageCtrl = this;


welcomePageCtrl.isActive = function() {
    
    return (!AuthService.token);
};

$scope.linkTo = function(id) { 
	$location.url(id);    
};

});
