/**
 * Controller managing issues comments
 */
angular.module('app').controller('CommentsCtrl', function ($http,$scope) {

  var commentsCtrl = this;

  $scope.comm = null;
  delete commentsCtrl.error;

  /**
   *  Posts the received comment object to the database
   *  having in consideration the specified issue
   *  @param {Object} comment
   *  @param {String} issueId
   */
  function addComment (comment, issueId){
    return $http({
      method: 'POST',
      data: {
        text: comment
      },
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId + '/comments'
    });
  };

  /**
   *  Gets the comment object through $scope
   * and posts it through addComment method
   */
  commentsCtrl.newComment = function () {
    addComment($scope.comm, $scope.issue.id)
    .then(function (response) {
      $scope.comm = null;
      $scope.$emit('newComment', response.data);
    })
    .catch(function () {
      $scope.error ="Error adding comment";
    });
  };
});
