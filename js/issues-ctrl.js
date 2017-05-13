/**
 * IssuesService
 */
 angular.module('app').factory('IssuesService', function($http,AuthService) {

  var service = {};

  service.getAllIssues = function() {
    return fetchAllIssues().then(function(issues) {
      return issues;
    });
  };


  function fetchAllIssues(page, items) {
  page = page || 1; // Start from page 1
  items = items || [];
  // GET the current page
  return $http({
    method: 'POST',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/searches',
    data: { "state": 
    {"$in": [ "new", "inProgress" ]}
  },
  params: {
    page: page
  } 
}).then(function(res) {
  if (res.data.length) {
      // If there are any items, add them
      // and recursively fetch the next page
      items = items.concat(res.data);
      return fetchAllIssues(page + 1, items);
    }
    return items;
  });
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



