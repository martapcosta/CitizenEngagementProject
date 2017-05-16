/**
 * CommentsService.
 */
app.service('CommentsService', function ($http, $filter) {
    
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


/**
 * The controller managing issues comments
 */
app.controller('CommentsCtrl', function ($rootScope, $scope, CommentsService) {
    
    $scope.comment = null;
    
    /**
     * Adds a comment
    */
    $scope.addComment = function () {
        CommentsService
                .addComment($scope.comment, $scope.issue.id)
                .success(function (data) {
                    $scope.comment = null;
                })
                .error(function () {
                    $rootScope.toast.show("Error adding comment");
                });
    };
});