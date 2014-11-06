$(function(){
	var mapRatio = 950/550,
		windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$mapContainer = $(".map-container");

	// set map width (decreases height by 80 for 30px padding on top and bottom, or width by 80 to give space either side plus some breathing space to prevent scrollbars)
	if ((windowHeight - 80) * mapRatio < windowWidth - 80) {
		$mapContainer.width((windowHeight - 80) * mapRatio);
	}
	else {
		$mapContainer.width(windowWidth - 80);
	}

	$mapContainer.mapael({
		map : {
			name : "world_countries_2",
			defaultArea: {
				attrs : {
		        	fill: "#0B2D45",
		        	stroke: "transparent",
		        	'stroke-width': 0
		        },
				attrsHover : {
					fill: "#308352",
					animDuration : 600
				}
			}
		}
	});
});


var rambl = angular.module('rambl', []);

rambl.controller('ramblController', function ($scope, mainInfo) {
	$scope.countries = null;
	$scope.correctGuesses = [];
	$scope.guess = null;

	// Load country data
	mainInfo.success(function(data) {
		$scope.countries = angular.fromJson(data);
	});

	// Watch the user input to see if it's in the countries object
	$scope.watch('guess', function(obj, oldVal, newVal){
		// Check if the value matches any country names
		var guess = newVal;
		var match = $.map($scope.countries, function(country) {
			var names = [];
			for (var i = 0; i < country.accept.length; i++) {
			    names.push(country.accept[i].toLowerCase());
			}
			if ($.inArray(guess, names) > -1) {
				return country.pathName;
			}
		});
		if (match[0]) {
			// Guess matched a country. Check if it's already been guessed.
			if ($.inArray(match[0], $scope.correctGuesses) === -1) {
				// Hasn't already been guessed. Highlight it, add it to the correct guesses list, and reset the input.
				$('#'+match[0]).trigger('guessed');
				$scope.correctGuesses.push(match[0]);
				return "";
			}			
		}

		// Update the value
		return newVal;
	});
});

rambl.factory('mainInfo', function($http) {
    return $http.get('/js/data/countries.json');
});