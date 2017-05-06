/**
 * IssuesService
 */
 angular.module('app').factory('IssuesService', function($http,AuthService) {

  var service = {};

  /**
  * Returns all the issues
  */
  service.getAllIssues = function(){ //add page and number of issues as arguments
   return $http({
    method: 'POST',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/searches',
    data: { "state": 
    {"$in": [ "new", "inProgress" ]}
  }
});
 };

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


 angular.module('app').controller('IssuesListCtrl', function(IssuesService) {

  var IssuesListCtrl = this;

  IssuesService.getAllIssues().then(function(issues) {
    console.log(issues);
    IssuesListCtrl.issues = issues;
  });

});



