angular.module('app').controller('ListPageController', function(ListService) {
  var listPageCtrl = this;

  ChatsService.getChats().then(function(chats) {
    listPageCtrl.issues = issues;
  });
});

angular.module('app').controller('ListPanelController', function(IssuesService, $stateParams) {
  var listPanelCtrl = this;

  listPanelCtrl.alignment = 'left';

  var issueId = $stateParams.id;
  IssuesService.getIssue(issueId).then(function(issue) {
    listPanelCtrl.issue = issue;
  });



angular.module('app').factory('IssuesService', function($http) {

  var service = {};

  /**
  * Returns all the issues
  */
  service.getAllIssues = function(){




  }


  return service;
});
