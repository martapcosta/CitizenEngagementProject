/**
* IssuesService
*/
angular.module('app').factory('IssuesService', function($http,AuthService,$q) {

  var service = {};


  service.getAllIssuesTypes = function() {//add page and number of issues as arguments
    return loadIssueTypes().then(function(issueTypes) {

      return issueTypes;
    });
  };

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

  /**
  * Gets comments from a given issue.
  */
  service.getComments = function(issueId) {
    return fetchAllIssueComments(issueId).then(function(comments) {
      return comments;
    });
  };
  /**
  * Gets All issues
  */
  service.getAllIssues = function() {
    return fetchAllIssues().then(function(issues) {
      return issues;
    });
  };

  /**
  * Gets given issue data
  */
  service.getIssue = function(issueId) {
    return getIssueData(issueId);
  };

  /**
  * Gets given issue data
  */
  service.getUser = function(userId) {
    return getUserData(userId);
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
* Get user data
*/
function getUserData(userId) {
  return $http({
    method: 'GET',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/users/' + userId
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

/**
* Get issue comments
*/
function fetchAllIssueComments(issueId,page, items) {
  page = page || 1; // Start from page 1
  items = items || [];
  // GET the current page
  return $http({
    method: 'GET',
    url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId + '/comments',
    params: {
      page: page,
      pageSize: 50
    }
  }).then(function(res) {
    if (res.data.length) {
      // If there are any items, add them
      // and recursively fetch the next page
      items = items.concat(res.data);
      return fetchAllIssueComments(issueId, page + 1, items);
    }
    return items;
  });
};

return service;
});
