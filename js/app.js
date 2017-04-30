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
 * Issues list controller
 */
 angular.module('app').controller('ListPanelController', function(DataService) {

    var listPanelCtrl = this;

    //listPanelCtrl.user = "Ken Bogard";

    DataService.getIssues().then(function(descriptions) {
        listPanelCtrl.descriptions = descriptions;
    });

});

 angular.module('app').factory('DataService', function($q) {

    var service = {};

    service.getIssues = function() {
        return $q.when([
        {
            title: 'Head 1',
            text: 'Problem 1 blabla',
            time: moment().hour(12).minute(40).toDate(),
            ncomments: 2
        },
        {
            title: 'Head 2',
            text: 'Problem 2 blablaHey\nWhat\'s up?',
            time: moment().hour(12).minute(50).toDate(),
            ncomments: 23
        },
        {
            title: 'Headsss 3',
            text: 'Problem 3 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        }
        ]);
    };

    return service;
});


/**
 * Config function with the navigation states
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
    });

     $stateProvider.state('newissue', {
        url: '/newissue',
        templateUrl: './templates/newissue.html'
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
