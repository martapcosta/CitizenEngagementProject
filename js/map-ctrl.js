/**
 * Angular Controller for handling the map on the page
 */
 angular.module("app").controller("MapCtrl", function($scope){
 	var map = this;

	//Defines the default center of the map and the zoom level
	map.center = {
  		// These are the coordinates for the center of Yverdon-les-Bains
  		lat: 46.778474,
  		lng: 6.641183,
  		zoom: 15
	};

	map.defaults = {
  		doubleClickZoom: false, // disable the double-click zoom
  		scrollWheelZoom: false, // disable zooming with the scroll
  		dragging: false, // disable moving the map with dragging it with the mouse
  		minZoom: 10, // Limit the minimal zoom
  		maxZoom: 16, // Limit the maximal zoom
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

	// Defines the markers that will be added to the map.
  	// Add any marker object to this array for it to appear on the map
  	map.markers = [
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
  	];
});