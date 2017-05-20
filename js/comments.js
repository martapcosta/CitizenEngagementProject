/**
 * CommentsService.
 */
app.service('CommentsService', function ($http, AuthService,$filter) {
    
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
 * Controller managing issues comments
 */
app.controller('CommentsCtrl', function ($rootScope, $scope, CommentsService) {
    
    //$scope.comm = null;
    //var commentsCtrl = this;
    /**
     * Adds a comment
    */
    /*$scope.addComment = function () {
        CommentsService
                .addComment($scope.comm, issueId)
                .success(function (data) {
                    $scope.comm = null;
                })
                .error(function () {
                    $rootScope.toast.show("Error adding comment");
                }); 
    };*/ 
});