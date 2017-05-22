/**
* Angular Controller for handling the map on the page
*/
angular.module("app").controller("MapCtrl", function($scope, $rootScope, $geolocation, $log){
  var map = this;

  // map default settings
  map.defaults = {
    doubleClickZoom: true, // enable the double-click zoom
    scrollWheelZoom: false, // disable zooming with the scroll
    dragging: true, // enable moving the map with dragging it with the mouse
    minZoom: 10, // Limit the minimal zoom
    maxZoom: 18, // Limit the maximal zoom
  };
  // Fixes the default Icon bug, see slide #10
  var defaultIcon = {
    iconUrl: "assets/leaflet/images/marker-icon.png",
    shadowUrl: "assets/leaflet/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  };
  // draggrable marker to create a new issue - initial position in yverdon center
  var draggableMarker = {
    // These are the coordinates for the center of Yverdon-les-Bains
    lat: 46.778474,
    lng: 6.641183,
    focus: true,
    icon: defaultIcon,
    message: "Hey, drag me if you want",
    draggable: true
  };

  angular.extend($scope, {
    yverdon: {
      lat: 46.778474,
      lng: 6.641183,
      zoom: 15,
    },
    markers: {
      draggableMarker: angular.copy(draggableMarker)
    },
    position: {
      lat: 46.778474,
      lng: 6.641183
    },
    events: { // or just {} //all events
    markers:{
      enable: [ 'dragend' ]
    }
  }
});

function GetAddress(marker) {
  var geocodeService = L.esri.Geocoding.geocodeService();
  var latlng = {lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)};
  geocodeService.reverse().latlng(latlng).run(function(error, result) {
    $log.info(result.address.Match_addr);
    $scope.address = result.address.Match_addr;
    $log.info($scope.address);
  });
}

$scope.$on("leafletDirectiveMarker.dragend", function(event, args){
  $scope.position.lat = args.model.lat;
  $scope.position.lng = args.model.lng;
  GetAddress($scope.position);
  $scope.$emit('updateLocation');
});

/**
* Inserts issues data on the map with markers.
*/
map.insertIssuesData = function() {
  var data = $scope.issues;
  $scope.map.markers = [];
  // If data array is not null, create a marker for each element and add it to map_markers
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      var marker = {
        lat: data[i].location.coordinates[1],
        lng: data[i].location.coordinates[0],
        icon: defaultIcon,
        name: data[i].id
      };
      $scope.map.markers.push(marker);
    }}
  }

  /**
  * Inserts issues data on the map with markers.
  */
  map.insertDetailedIssue = function() {
    var data = $scope.issue;
    $scope.map.markerDetail = [{
      lat: data.location.coordinates[1],
      lng: data.location.coordinates[0],
      icon: defaultIcon
    }];
    $log.info($scope.map.markerDetail);
    $scope.yverdon.lat = data.location.coordinates[1];
    $scope.yverdon.lng = data.location.coordinates[0];

  }

  //show all markers on map after load all issues
  $scope.$on('dataloaded', function () {
    map.insertIssuesData();
  });

  //show detailled issue on map
  $scope.$on('detailedissueloaded', function () {
    map.insertDetailedIssue();
  });

});
