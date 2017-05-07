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
* Order the comments by their createdAt property.
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
     * Adds a comment by calling the addComment function from the CommentsService.
    */
    $scope.addComment = function () {
        CommentsService
                .addComment($scope.comment, $scope.issue.id)
                .success(function (data) {
                    $scope.comment = null;
                    //$scope.$emit('newComment', DataManager.orderData(data));
                })
                .error(function () {
                    $rootScope.toast.show("Error adding comment");
                });
    };
});