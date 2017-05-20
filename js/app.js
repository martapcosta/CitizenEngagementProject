/**
 * Main angular module with all the dependencies
 */
 angular.module('app', [
  'ui.router',
  'angular-storage',
  'ngGeolocation',
  'leaflet-directive',
  'ngTagsInput',
  'ui.bootstrap'
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
    controller: 'WelcomePageController',
    controllerAs: 'welcomePageCtrl'

  });
  $stateProvider.state('home', {
    url: '',
    templateUrl: './templates/main.html',
    controller: 'IssuesListCtrl',
    controllerAs: 'issuelistctrl'
  });
  $stateProvider.state('issues', {
    url: '/issues',
    templateUrl: '/templates/issues.html',
    controller: 'IssuesListCtrl',
    controllerAs: 'issuelistctrl'
  });
  $stateProvider.state('newissue', {
    url: '/newissue',
    templateUrl: './templates/new-issue.html',
    controller: 'NewIssueCtrl',
    controllerAs: 'newIssue'
  });
  $stateProvider.state('register', {
    url: "/register",
    templateUrl: "./templates/register.html",
    controller: 'RegisterCtrl as register'
  });
  $stateProvider.state('issues.details', {
    url: "/:id",
    onEnter: function($modal){
      $modal.open({
        templateUrl: "./templates/issueDetails.html",
        controller: 'DetailsCtrl as details'
      });
    }
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
