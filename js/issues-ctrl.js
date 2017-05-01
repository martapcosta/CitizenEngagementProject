angular.module('app').controller('ListPageController', function(ListService) {
  var listPageCtrl = this;

  ChatsService.getChats().then(function(chats) {
    listPageCtrl.issues = issues;
  });
});

angular.module('app').controller('ListPanelController', function(ListService, $stateParams) {
  var listPanelCtrl = this;

  listPanelCtrl.alignment = 'left';

  var issueId = $stateParams.id;
  ListService.getIssue(issueId).then(function(issue) {
    listPanelCtrl.issue = issue;
  });



angular.module('app').factory('ListService', function($http) {

  var service = {};


  return service;
});
