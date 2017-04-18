angular.module('app').factory('AuthService', function AuthService(store) {
  var service = {
    token: store.get('auth-token'),
    unsetToken: function() {
      service.token = null;
      store.remove('auth-token');
    },
    setToken: function(token) {
      service.token = token;
      store.set('auth-token', token);
    }
  };

  return service;
});
