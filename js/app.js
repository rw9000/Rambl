var rambl = angular.module('rambl', []);

rambl.controller('ramblController', function ($scope, $timeout, $interval, countryFactory) {
	$scope.countries = [];
	$scope.correctGuesses = 0;
	$scope.guess = null;
	$scope.countryListOpen = false;
	$scope.gameActive = true;
	$scope.gameTime = 15 * 60;

	// initialize map
	var mapRatio = 950/550,
		windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$mapContainer = $(".map-container"),
		$input = $(".country-text"),
		counter;

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
		var guess = newVal.toLowerCase();
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
			if (match[0].guessed === false) {
				// Hasn't already been guessed. Highlight the country.
				$('#'+match[0].pathName).trigger('guessed');
				// Update 'guessed' property of this country in country array
				$scope.countries[match[0].index].guessed = true;
				// Increment correct guesses
				$scope.correctGuesses++;
				// Run the success animation on the text input
				$input.addClass('correct');
				// Reset the text input (after a timeout - feels a bit nicer);
				$timeout(function() {
					$scope.guess = "";
					$input.removeClass('correct');
				}, 500);
			}
		}
	});

	// End game
	$scope.endGame = function() {
		// Set gamestate to inactive
		$scope.gameActive = false;

		// Stop the timer
		$interval.cancel(counter);
		$scope.gameTime = 0;

		// Open the country list
		$scope.countryListOpen = true;

		// run through the countries, marking any that haven't
		// been guessed to be revealed
		angular.forEach($scope.countries, function(country, key) {
			if (country.guessed === false) country.reveal = true;
		});
	}

	// Reset game
	$scope.reset = function() {
		// Reset all country states
		angular.forEach($scope.countries, function(country, key) {
			country.guessed = false;
			country.reveal = false;
		});

		// Reset map colours
		$(".map-container").trigger('update');

		// Reset counter
		$scope.correctGuesses = 0;

		// Set gamestate to active
		$scope.gameActive = true;

		// Begin timer
		//$scope.gameTime = 15 * 60 * 1000;
		$scope.gameTime = 2 * 1000;
		counter = $interval(function() {
			$scope.gameTime -= 1000;
			if ($scope.gameTime === 0) {
				$scope.timeUp();
			}
		}, 1000);
	}

	$scope.timeUp = function() {
		$scope.endGame();
		alert("time up!");
	}

	// start the game
	$scope.reset();
});

rambl.factory('countryFactory', function($http) {
    return $http.get('/js/data/countries.json');
});

