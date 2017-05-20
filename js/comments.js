/**
 * CommentsService.
 */
angular.module('app').factory('CommentsService', function ($http, AuthService,$filter) {
    
var service = {};


/**
* Adds a comment to the given issue.
*/
service.addComment = function(comment, issueId){
    return $http({
                method: 'POST',
                data: {
                    text: comment
                },
                url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId + '/comments'
            });    
};

/**
* Order the comments by createdAt
*/
service.orderComments = function (comments) {
    return $filter('orderBy')(comments, '-createdAt', true);
};

return service;
});


/**
 * Controller managing issues comments
 */
angular.module('app').controller('CommentsCtrl', function ($scope, CommentsService) {
    
    var commentsCtrl = this;

    $scope.comm = null;
    delete commentsCtrl.error;
    
    /**
     * Adds a comment
    */
    $scope.addComment = function () {
        CommentsService
                .addComment($scope.comm, $scope.issue.id)
                .success(function (data) {
                    $scope.comm = null;
                    $scope.$emit('newComment', data);
                    console.log(data);
                })
                .error(function () {
                    commentsCtrl.error ="Error adding comment";
                }); 
    }; 
});