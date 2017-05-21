angular.module('app').controller('NewIssueCtrl', function (IssuesService, AuthService, $http, $log, $state,$rootScope, $scope) {
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

  IssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    newIssue.issueTypes = issueTypes;
  });

  newIssue.updateLocation = function()
  {
    //newIssue.issue.location = marker;
    newIssue.issue.location = {
      "coordinates": [$scope.position.lng, $scope.position.lat],
      "type": "Point"
    };
    $log.info(newIssue.issue.location);
  };

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
      $log.error(error);
    })
  };

  $scope.$on('updateLocation', function () {
    newIssue.updateLocation();
  });

});
