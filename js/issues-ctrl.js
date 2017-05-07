/**
 * IssuesService
 */
 angular.module('app').factory('IssuesService', function($http,AuthService) {

  var service = {};


  service.getAllIssues = function() {//add page and number of issues as arguments
    return loadIssues().then(function(issues) {

      return issues;
    });
  };


  var issuePromise;
  function loadIssues() {
    if (!issuePromise) {
      issuePromise = $http({
        method: 'POST',
        url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/searches',
        data: { "state": 
        {"$in": [ "new", "inProgress" ]}
      }
    }).then(function(res) {
      return res.data;
    });
  }

  return issuePromise;
}



return service;
});


 angular.module('app').controller('IssuesListCtrl', function($http,IssuesService,$scope,AuthService) {

  var IssuesListCtrl = this;

  IssuesService.getAllIssues().then(function(issues) {
    IssuesListCtrl.issues = issues;
  });


    // Get comments of a given issueId
  $scope.getComments = function(issueId) {
  
  return issueId;
  /*  $http ({
        method: 'GET',
        url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId + '/comments'
    }).then(function(res) {
      return res.data;
    });*/
  };

});



