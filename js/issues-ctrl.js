/**
* Controller to manage an issues in general
*/
angular.module('app').controller('IssuesListCtrl', function($http,$state,IssuesService,$scope,$location,$anchorScroll,AuthService) {

  var IssuesListCtrl = this;

  /**
   *  Gets an array with all issues saved on database
   */
  IssuesService.getAllIssues().then(function(issues) {
    $scope.issues = issues;
    $scope.$broadcast('dataloaded');
  });

  /**
   *  Gets an array with all issues types saved on database
   */
  IssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    $scope.issueTypes = issueTypes;
  });

  // call method get all issues on event
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
