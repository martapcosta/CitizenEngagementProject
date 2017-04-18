angular.module('app').factory('AuthInterceptor', function(AuthService) {
  return {
    request: function (config) {
      if (AuthService.token) {
        config.headers.Authorization = "Bearer " + AuthService.token;
      }
      return config;
    }
  }
});