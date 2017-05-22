/**
* Controller to manage an issue data and show it
*/
angular.module('app').controller('DetailsCtrl', function (IssuesService,$stateParams,$rootScope, $scope, $state, $http,$filter) {

  var detailsCtrl = this;

  var issueId = $stateParams.id;


  IssuesService.getIssue(issueId).then(function(issue) {

    var issueTypeHref = issue['issueTypeHref'];
    // get the idType of issueTypeHref
    var issueTypeId = issueTypeHref.substr(issueTypeHref.lastIndexOf('/') + 1);
    IssuesService.getTypeData(issueTypeId).then(function(issuetype) {
      detailsCtrl.issuetype = issuetype;
      $scope.issue = issue;
      $scope.$broadcast('detailedissueloaded');

      IssuesService.getComments(issueId).then(function (comments) {
        var commentsArray =[];

        _.each(comments, function(comment) {
          var userHref = comment['authorHref'];
          var userid = userHref.substr(userHref.lastIndexOf('/') + 1);
          IssuesService.getUser(userid).then(function (user) {
            var obj = angular.merge(comment,user);
            commentsArray.push(obj);
          });
        });
        //comments with new data about the user
        detailsCtrl.comments = commentsArray;
      });
    });

  });


  // To reload the data after a new posted comment.
  $scope.$on('newComment', function (e, data) {
    var userHref = data['authorHref'];
    console.log(userHref);
    var userid = userHref.substr(userHref.lastIndexOf('/') + 1);

    IssuesService.getUser(userid).then(function (user) {
      var obj = angular.merge(data,user);
      detailsCtrl.comments.push(obj);
    });
  });

  // function to update tags a from a given issue in API
  function updateTags(tagsArray, issueId) {
    return $http({
      method: 'PATCH',
      data: {
        tags: tagsArray
      },
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId
    });
  };

  // add to the controller the function called from the html to update tags when
  // on-tag-added or on-tag-removed
  detailsCtrl.updateTag = function() {
    // $scope.issue.tags not beeing updated here only after ajax call ??
    updateTags($scope.issue.tags, $scope.issue.id)
    .then(function(){
      updateTags($scope.issue.tags, $scope.issue.id).then(function(response){
        $rootScope.$broadcast('updateTags', response.data);
      })
    })
    .catch(function () {
      $scope.error ="Error changing issue tags";
    });
  };
});
