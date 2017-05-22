angular.module('app').controller('IssuesListCtrl', function($http,$state,IssuesService,$scope,$location,$anchorScroll,AuthService) {

  var IssuesListCtrl = this;

  IssuesService.getAllIssues().then(function(issues) {
    $scope.issues = issues;
    $scope.$broadcast('dataloaded');
  });

  IssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    $scope.issueTypes = issueTypes;
  });

  $scope.$on('updateTags', function (e, data) {
    console.log(data['id']);
    //Marta: not the best way of doing because it calls all issues again
    // but for now I don't have the time to do it better
    //but it updates the view with the updated tags
    IssuesService.getAllIssues().then(function(issues) {
      $scope.issues = issues;
    });
  });

});
