/**
 * News Issues Service
 */
 angular.module('app').factory('NewIssuesService', function($http,AuthService) {

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



//Promise All Issues
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



angular.module('app').controller('NewIssueCtrl', function (NewIssuesService, $log, $scope) {
  var newIssue = this;
  newIssue.issue = {};
  newIssue.locationOK = false;

  NewIssuesService.getAllIssuesTypes().then(function(issueTypes)
  {
    newIssue.issueTypes = issueTypes;
  });

  $scope.updateLocation = function(marker)
  {
    //newIssue.issue.location = marker;
    $log.info(marker);
    newIssue.locationOK = true;
  }

  newIssue.createNewIssue = function()
  {
    delete createNewIssue.error;
    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues',
      data: newIssue.issue
    }).then(function(res) {
      $state.go('home');
    }).catch(function(error) {
      login.error = "Error while trying to create a new issue";
      $log.error(error);
    })
  };

});
