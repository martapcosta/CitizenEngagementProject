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


});

/**
 * Controller to manage an issue data and show it to the user.
 */
angular.module('app').controller('DetailsCtrl', function ($rootScope, $scope, $state, issue, store) {

    // Disable the swipe menu for this view.
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.enableLeft = false;
    });

    // Reload the data when a new comment is posted.
    $scope.$on('newComment', function (e, data) {
        $scope.issue = data;
    });

    /**
     * Register the showIssueOnMal function to the scope.
     * This function saves the localisation of the issue in the LocalStorage in order to pass them to the app.details.map view.
     */
    $scope.showIssueOnMap = function () {
        store.set('issue', {
            lat: $scope.issue.lat,
            lng: $scope.issue.lng,
            description: $scope.issue.description
        });
        $state.go('app.details.map');
    };

    // Loads the issue's data in the view or show an error message if this fails.
    Loading.show(messages.loading);
    if (issue) {
        $scope.issue = issue;
        Loading.hide();
    } else {
        $scope.error = {msg: messages.error_issue};
        Loading.hide();
    }
});

