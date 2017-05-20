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

  $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
    $scope.position.lat = args.model.lat;
    $scope.position.lng = args.model.lng;
    $log.info($scope.position);
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
        };
        $scope.map.markers.push(marker);
    }}
  }

  //starting to show issues in map - not finished
    $scope.$on('dataloaded', function () {
        map.insertIssuesData();
    });

});
