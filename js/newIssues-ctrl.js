angular.module('app').controller('NewIssueCtrl', function NewIssueCtrl($geolocation, $http, $log, $state) {
  var newIssue = this;

  newIssue.issue = {};
  newIssue.issue.tags = [];

  newIssue.createNewIssue = function createNewIssue() {
    delete createNewIssue.error;

    $http({
      method: 'POST',
      url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues', //https://citizen-api.herokuapp.com/api/auth',
      data: newIssue.issue
    }).then(function(res) {
      $state.go('home');
    }).catch(function(error) {
      login.error = "Error while trying to create a new issue";
      $log.error(error);
    })
  }

  newIssue.getAllIssueTypes = function getAllIssueTypes() {
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
  }
});
