/**
 * Main angular module with all the dependencies
 */
 angular.module('app', [
    'ui.router',
    'angular-storage',
    'ngGeolocation',
    'leaflet-directive',
    'ngTagsInput'
    ]);


 /**
 * This is the router of the application, where the different states are declared and nested.
 */
 angular.module('app').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'LoginCtrl as login'
    });
    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
    });

    $stateProvider.state('home', {
        url: '',
        templateUrl: './templates/main.html',
        controller: 'HomePageController',
        controllerAs: 'homePageCtrl'
    });

    $stateProvider.state('issues', {
    url: '/issues',
    templateUrl: '/templates/issues.html',
    controller: 'HomePageController',
    controllerAs: 'homePageCtrl'
    });

     $stateProvider.state('newissue', {
        url: '/newissue',
        templateUrl: './templates/new-issue.html'
    });

    $stateProvider.state('register', {
      url: "/register",
      templateUrl: "./templates/register.html",
      controller: 'RegisterCtrl as register'
    });



    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('home');
    });

    $httpProvider.interceptors.push('AuthInterceptor');
})

 angular.module('app').run(function (AuthService, $rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!AuthService.token && toState.name !== 'login' && toState.name !== 'register' && toState.name !== 'welcome') {
            event.preventDefault();
            $state.go('welcome');
        }
    });
});
