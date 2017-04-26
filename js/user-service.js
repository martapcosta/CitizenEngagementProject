(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetById = GetById;
        service.Create = Create;
        //service.Update = Update;
        //service.Delete = Delete;

        return service;

        function GetById(id) {
            return $http.get('https://masrad-dfa-2017-g.herokuapp.com/api/users/{id}').then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            return $http.post('https://masrad-dfa-2017-g.herokuapp.com/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        /*function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }*/

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
