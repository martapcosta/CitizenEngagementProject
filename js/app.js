/**
 * Main angular module with all the dependencies
 */
angular.module('app', [
    'ui.router',
    'angular-storage',
    'ngGeolocation',
    'leaflet-directive'
]);

/**
 * Config function with the navigation states
 */
angular.module('app').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'LoginCtrl as login'
    });

    $stateProvider.state('home', {
        url: '',
        templateUrl: './templates/main.html'
    });

    $stateProvider.state('second', {
        url: '/second',
        templateUrl: './templates/second.html'
    });

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('home');
    });

    $httpProvider.interceptors.push('AuthInterceptor');
})

angular.module('app').run(function (AuthService, $rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!AuthService.token && toState.name !== 'login') {
            event.preventDefault();
            $state.go('login');
        }
    });
});
