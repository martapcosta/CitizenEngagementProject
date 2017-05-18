/**
 * IssuesService
 */
 angular.module('app').factory('IssuesService', function($http,AuthService,$q) {

  var service = {};

  service.getAllIssues = function() {
    return fetchAllIssues().then(function(issues) {
      return issues;
    });
  };

  service.getIssue = function(issueId) {
    return getIssueData(issueId);
  };


  service.getTypeData = function(idType) {
    return getIssueType(idType);
  };

  function fetchAllIssues(page, items) {
  page = page || 1; // Start from page 1
  items = items || [];
  // GET the current page
  return $http({
    method: 'POST',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/searches',
    data: { "state": 
    {"$in": [ "new", "inProgress","rejected", "resolved" ]}
    },
    params: {
      page: page,
      pageSize: 50
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
};

/**
* Get data for a given issue
*/
function getIssueData(id) {
  return $http({
    method: 'GET',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + id
  }).then(function(res) {
    return res.data;
  });
}

/**
* Get issue type data
*/
function getIssueType(idType) {
  return $http({
    method: 'GET',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issueTypes/' + idType
  }).then(function(res) {
    return res.data;
  });
}

return service;
});


 angular.module('app').controller('IssuesListCtrl', function($http,$state,IssuesService,$scope,$location,$anchorScroll,AuthService) {

  var IssuesListCtrl = this;

  IssuesService.getAllIssues().then(function(issues) {
    IssuesListCtrl.issues = issues;
  });

// Goes up in page - used in issues template when clicking to issues details
$scope.goUp = function () {
                $location.hash('up');
                $anchorScroll();
            }

});

/**
 * Controller to manage an issue data and show it
 */
 angular.module('app').controller('DetailsCtrl', function (IssuesService,$stateParams,$rootScope, $scope, $state, store) {

  var detailsCtrl = this;

  var issueId = $stateParams.id;

  IssuesService.getIssue(issueId).then(function(issue) {
    
    var issueTypeHref = issue['issueTypeHref'];
    // get the idType of issueTypeHref
    var issueTypeId = issueTypeHref.substr(issueTypeHref.lastIndexOf('/') + 1);
    IssuesService.getTypeData(issueTypeId).then(function(issuetype) {
    detailsCtrl.issuetype = issuetype;
    detailsCtrl.issue = issue;
    });

  });



    // Reload the data when a new comment is posted.
    //$scope.$on('newComment', function (e, data) {
    //  $scope.issue = data;
    //});

    /**
     * Register the showIssueOnMap function to the scope.
     * This function saves the localisation of the issue in the LocalStorage in order to pass them to the app.details.map view.
     */
     /*$scope.showIssueOnMap = function () {
    store.set('issue', {
        lat: $scope.issue.lat,
        lng: $scope.issue.lng,
        description: $scope.issue.description
      });
      $state.go('app.details.map');
    };*/

  });

