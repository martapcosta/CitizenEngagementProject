/**
 * News Issues Service
 */
 angular.module('app').factory('NewIssuesService', function($http) {

  var service = {};


  service.getAllIssuesTypes = function() {//add page and number of issues as arguments
    return loadIssueTypes().then(function(issueTypes) {

      return issueTypes;
    });
  };

  //newIssue.issue.tags = [];
  /*newIssue.getAllIssueTypes = function () {
    return $http({
      method: 'GET',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issueTypes'
    }).then(function (response) {
      var issueTypes = [];
      for (var i = 0; i < response.data.length; i++) {
        issueTypes.push({
          name: response.data[i].name,
          description: response.data[i].description,
          id: response.data[i].id,
          href: response.data[i].href
        });
      }
      return issueTypes;
    }, function (error) {
      return null;
    });
  }*/


//Promise All Issues Types
  var issueTypePromise;
  function loadIssueTypes() {
    if (!issueTypePromise) {
      issueTypePromise = $http({
        method: 'GET',
        url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issueTypes'
    }).then(function(res) {
      return res.data;
    });
  }

  return issueTypePromise;
}

return service;
});
//end of service



angular.module('app').controller('NewIssueCtrl', function (NewIssuesService, AuthService, $http, $log, $state, $scope) {
  var newIssue = this;
  newIssue.issue = {};
  // init issue location
  $scope.position = {
    "lat": 46.778474,
    "lng": 6.641183
  };
  newIssue.issue.location = {
    "coordinates": [$scope.position.lat, $scope.position.lat],
    "type": "Point"
  };

  NewIssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    newIssue.issueTypes = issueTypes;
  });

  newIssue.updateLocation = function()
  {
    //newIssue.issue.location = marker;
    newIssue.issue.location = {
      "coordinates": [$scope.position.lat, $scope.position.lat],
      "type": "Point"
    };
    //newIssue.issue.location.coordinates.push(marker.lat);
    //newIssue.issue.location.coordinates.push(marker.lng);
    $log.info($scope.position);
    $log.info('hello');
  };

  newIssue.createNewIssue = function()
  {
    delete newIssue.error;
    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues',
      data: newIssue.issue
    }).then(function(res) {
      $state.go('home');
    }).catch(function(error) {
      newIssue.error = "Error while trying to create a new issue";
      $log.error(newIssue.error);
    })
  };

  $scope.$on('updateLocation', function () {
    newIssue.updateLocation();
  });

});
