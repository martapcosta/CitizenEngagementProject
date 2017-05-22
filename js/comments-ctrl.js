/**
* Controller managing issues comments
*/
angular.module('app').controller('CommentsCtrl', function ($http,$scope) {

  var commentsCtrl = this;

  $scope.comm = null;
  delete commentsCtrl.error;


  // function to post a comment in API
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
  * Adds a comment
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
