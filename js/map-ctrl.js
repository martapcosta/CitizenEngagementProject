/**
 * Angular Controller for handling the map on the page
 */
 angular.module("app").controller("MapCtrl", function($scope, $geolocation){
 	var map = this;

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

  /**
  * Returns a marker Object giving the user's position
  */
  function defaultMarker(position)
  {
    return {
      lat: position.lat,
      lng: position.lng,
      message: "<p>My Position</p>",
      icon: defaultIcon // change to different icon
    };
  }

  //Defines the default center of the map and the zoom level
  map.center = {
    // These are the coordinates for the center of Yverdon-les-Bains
    lat: 46.778474,
    lng: 6.641183,
    zoom: 15
  };

  angular.extend($scope, {
    draggableMarker: {
      // These are the coordinates for the center of Yverdon-les-Bains
      lat: 46.778474,
      lng: 6.641183,
      zoom: 4,
      icon: defaultIcon,
      draggable: true
    }
  });
    /*draggableMarker: {
    lat: map.center.lat,
    lng: map.center.lng,
    icon: defaultIcon,
    draggable: true,
    label: {
      message: "Hey, drag me if you want",
      options: {
        noHide: true
      }
    }
  }];*/

  /**
  * Loads the map
  */
   /* function loadMap() {
        var position = $geolocation.position;
        var dfd = $q.defer();
        // Set the map's center
        $scope.map.center = {
            lat: position.lat,
            lng: position.lng,
            zoom: 15
        };
        $scope.map.markers = [defaultMarker(position)];
        leafletData.getMap('map').then(function (map) {
            $scope.map = map;
            $scope.$on('leafletDirectiveMarker.click', function (event, args) {
                var clickedIssue = $scope.issues[args.leafletEvent.target.options.issueKey];
                if (args.markerName !== "0") {
                    $scope.activeMarker = $scope.activeMarker === clickedIssue ? null : clickedIssue;
                    $scope.map.setView(args.leafletEvent.latlng, $scope.map.zoom);
                    console.log($scope.activeMarker);
                }
            });
            $scope.map.on('dragstart', function () {
                $scope.activeMarker = null;
            });
            $scope.map.on('click', function () {
                $scope.activeMarker = null;
            });
            $scope.map.on('zoomstart', function () {
                $scope.activeMarker = null;
            });
            dfd.resolve(position);
        }, function (error) {
            dfd.reject(error);
        });
        // Show the map on the template
        //$scope.showMap = true; // add if needed like this in html: ng-if="showMap === true"
        return dfd.promise;
      }*/




  /**
  * Inserts issues data on the map with markers.
  */
  function insertIssuesData() {

    var data = $scope.issues;
    $scope.map.markers = [defaultMarker($geolocation.position)];
    // If data array is not null, create a marker for each element and add it to map_markers
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var marker = {
          lat: data[i].lat,
          lng: data[i].lng,
        };
        $scope.map.markers.push(marker);
      }
    // Set the view to encompase all the markers
    //fitBounds - Sets a map view that contains the given geographical bounds with the maximum zoom level possible.
    $scope.map.fitBounds($scope.map.markers);
  } else {
    // if no data to load =>display position marker
    //setView - sets the view of the map (geographical center and zoom) with the given animation options.
    $scope.map.setView([$scope.map.markers[0].lat, $scope.map.markers[0].lng], 15);
  }
}

//starting to show issues in map - not finished
    $scope.$on('', function () {
          if ($scope.issues) {
                insertIssuesData();
            }
    });



$geolocation.getCurrentPosition()
.then(function (position) {
        // This will be executed when the location is accessed
        map.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 15
        };
      })

$geolocation.watchPosition();
map.defaults = {
  		doubleClickZoom: true, // disable the double-click zoom
  		scrollWheelZoom: true, // disable zooming with the scroll
  		dragging: true, // disable moving the map with dragging it with the mouse
  		minZoom: 10, // Limit the minimal zoom
  		maxZoom: 16, // Limit the maximal zoom
   };




	// Defines the markers that will be added to the map.
  	// Add any marker object to this array for it to appear on the map
  	/*map.markers = [
    {
      lat: 46.781547,
      lng: 6.640351,
      icon: defaultIcon,
      draggable: true,
      	// You can add any additionnal property you want to your marker
      	// This way, we can for example add a name to identify the marker later on.
      	name: 'Yverdon gare'
      }, {
        lat: 46.781058,
        lng: 6.647179,
        icon: defaultIcon,
        name: 'HEIG-VD, St-Roch'
      }, {
        lat: 46.778246,
        lng: 6.641490,
        icon: defaultIcon,
        name: 'Place Pestalozzi'
      }
      ];*/
    });
