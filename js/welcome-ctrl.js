/**
 * Welcome controller
 */
angular.module('app').controller('WelcomePageController', function($anchorScroll,$location,$scope,AuthService) {
  var welcomePageCtrl = this;


welcomePageCtrl.isActive = function() {
    
    return (!AuthService.token);
};

$scope.linkTo = function(id) { 
	$location.url(id);    
};

$scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

});
