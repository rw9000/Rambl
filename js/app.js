var rambl = angular.module('rambl', []);

rambl.controller('ramblController', function ($scope, $timeout, countryFactory) {
	$scope.countries = [];
	$scope.correctGuesses = 0;
	$scope.guess = null;
	$scope.countryListOpen = false;

	// initialize map
	var mapRatio = 950/550,
		windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$mapContainer = $(".map-container");

	// set map width (decreases height by 80 for 30px padding on top and bottom, or width by 80
	// to give space either side plus some breathing space to prevent scrollbars)
	if ((windowHeight - 80) * mapRatio < windowWidth - 80) {
		$mapContainer.width((windowHeight - 80) * mapRatio);
	}
	else {
		$mapContainer.width(windowWidth - 80);
	}

	// init mapael
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

	// Load country data
	countryFactory.success(function(data) {
		$scope.countries = angular.fromJson(data);
	});

	// Watch the user input to see if it's in the countries object
	$scope.$watch('guess', function(newVal, oldVal){
		// Check if the value matches any country names
		var guess = newVal;
		var match = $.map($scope.countries, function(country, index) {
			var names = [];
			for (var i = 0; i < country.names.length; i++) {
			    names.push(country.names[i].toLowerCase());
			}
			if ($.inArray(guess, names) > -1) {
				// add the index of this country to the returned object
				country.index = index;
				return country;
			}
		});

		if (match[0]) {
			// Guess matched a country. Check if it's already been guessed.
			if ($.inArray(match[0], $scope.correctGuesses) === -1) {
				// Hasn't already been guessed. Highlight the country.
				$('#'+match[0].pathName).trigger('guessed');
				// Update 'guessed' property of this country in country array
				$scope.countries[match[0].index].guessed = true;
				// Increment correct guesses
				$scope.correctGuesses++;
				// Reset the text input (after a timeout - looks nicer);
				$timeout(function() {
					$scope.guess = "";
				}, 300);
			}
		}
	});
});

rambl.factory('countryFactory', function($http) {
    return $http.get('/js/data/countries.json');
});