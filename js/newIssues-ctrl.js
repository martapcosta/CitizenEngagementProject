angular.module('app').controller('NewIssueCtrl', function (IssuesService, AuthService, $http, $state,$rootScope, $scope) {
  var newIssue = this;
  newIssue.issue = {};
  // init issue location
  $scope.position = {
    "lat": 46.778474,
    "lng": 6.641183
  };
  newIssue.issue.location = {
    "coordinates": [$scope.position.lng, $scope.position.lat],
    "type": "Point"
  };

  /**
   * Gets all issue types through issue service
   */
  IssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    newIssue.issueTypes = issueTypes;
  });

  /**
   * Updates the location of the new issue
   */
  newIssue.updateLocation = function()
  {
    //newIssue.issue.location = marker;
    newIssue.issue.location = {
      "coordinates": [$scope.position.lng, $scope.position.lat],
      "type": "Point"
    };
  };

  /**
   * Creates a new issue using the issue object from ng-model
   */
  newIssue.createNewIssue = function()
  {
    delete newIssue.error;
    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues',
      data: newIssue.issue
    }).then(function(res) {
      $rootScope.message = "New issue successfully added!";
      $state.go('home');
    }).catch(function(error) {
      newIssue.error = "Error while trying to create a new issue.";
    })
  };

  // updates location of the new issue on event
  $scope.$on('updateLocation', function () {
    newIssue.updateLocation();
  });

});
