/**
 * IssuesService
 */
 angular.module('app').factory('IssuesService', function($http,AuthService,$q) {

  var service = {};

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


 angular.module('app').controller('IssuesListCtrl', function($http,$state,IssuesService,$scope,$location,$anchorScroll,AuthService) {

  var IssuesListCtrl = this;

  IssuesService.getAllIssues().then(function(issues) {
    $scope.issues = issues;
    $scope.$broadcast('dataloaded');
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
 angular.module('app').controller('DetailsCtrl', function (IssuesService,$stateParams,$rootScope, $scope, $state, $http,$filter) {

  var detailsCtrl = this;

  var issueId = $stateParams.id;


  IssuesService.getIssue(issueId).then(function(issue) {

    var issueTypeHref = issue['issueTypeHref'];
    // get the idType of issueTypeHref
    var issueTypeId = issueTypeHref.substr(issueTypeHref.lastIndexOf('/') + 1);
    IssuesService.getTypeData(issueTypeId).then(function(issuetype) {
      detailsCtrl.issuetype = issuetype;
      $scope.issue = issue;
      $scope.$broadcast('detailedissueloaded');

      IssuesService.getComments(issueId).then(function (comments) {
        var commentsArray =[];

        _.each(comments, function(comment) {
          var userHref = comment['authorHref'];
          var userid = userHref.substr(userHref.lastIndexOf('/') + 1);
          IssuesService.getUser(userid).then(function (user) {
            var obj = angular.merge(comment,user);
            commentsArray.push(obj);
          });
        });
        //comments with new data about the user
       detailsCtrl.comments = commentsArray;
      });
    });

  });


    // To reload the data after a new posted comment.
    $scope.$on('newComment', function (e, data) {
      var userHref = data['authorHref'];
      console.log(userHref);
      var userid = userHref.substr(userHref.lastIndexOf('/') + 1);

      IssuesService.getUser(userid).then(function (user) {
            var obj = angular.merge(data,user);
            detailsCtrl.comments.push(obj);
          });
    });

     // function to update tags a from a given issue in API
    function updateTags(tagsArray, issueId) {
            return $http({
                method: 'PATCH',
                data: {
                    tags: tagsArray
                },
                url: 'https://masrad-dfa-2017-g.herokuapp.com/api/issues/' + issueId
            });
        };

    // add to the controller the function called from the html to update tags when
    // on-tag-added or on-tag-removed
    detailsCtrl.updateTag = function() {
        // $scope.issue.zags not beeing updated here only after ajax call ??
        updateTags($scope.issue.tags, $scope.issue.id)
        .then(function(){
          updateTags($scope.issue.tags, $scope.issue.id).then(function(response){
          console.log("Antes" + response);
          console.log("Antes2" + response.data);
          $scope.$emit('updateTags', response.data);
        })
        })
        
        .catch(function () {
          $scope.error ="Error changing issue tags";
        });
    };

  $scope.$on('updateTags', function (e, data) {
     console.log(data);
    });


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
