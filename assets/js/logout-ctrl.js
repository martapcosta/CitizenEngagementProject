angular.module('app').controller('LogoutCtrl', function(AuthService, $state) {
	var logout = this;
	logout.disconnect = function() {
		AuthService.unsetToken();
		$state.go('login');
	}
});