var rambl = angular.module('rambl', ['ngTouch','ngDialog']);

rambl.controller('ramblController', function ($scope, $timeout, $interval, ngDialog, countryFactory) {
	$scope.countries = [];
	$scope.correctGuesses = 0;
	$scope.guess = null;
	$scope.countryListOpen = false;
	$scope.gameStarted = false;
	$scope.gameActive = false;
	$scope.gameTime = 15 * 60;
	$scope.modalShown = true;
	$scope.modalTitle = "Rambl";
	$scope.modalText =  "Type country names into the box below, try to get all 196. That's all.";

	// initialize map
	var $input = $(".country-text"),
		counter;

	// Load country data
	countryFactory.success(function(data) {
		$scope.countries = angular.fromJson(data);
	});

	$scope.toggleModal = function() {
	    $scope.modalShown = !$scope.modalShown;
	};

	// Check the user input to see if it's in the countries object
	$scope.checkInput = function(guess){
		$scope.modalTitle = "test";
		// Check if the value matches any country names
		var guess = guess.toLowerCase();
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
				// Reset the text input
				$scope.guess = "";
				// Do the correct answer animation
				$timeout(function() {
					$input.removeClass('correct');
				}, 500);

				// If they've just won, run the win function
				if ($scope.correctGuesses === $scope.countries.length) {
					$scope.win();
				}
			}
		}
	}

	// Start game
	$scope.startGame = function() {
		// Flag game as started
		$scope.gameStarted = true;

		// Close the modal
		$scope.modalShown = false;

		// Start the game
		$scope.reset();
	}

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

		// Reset map
		$("mapael").trigger('update');

		// Reset counter
		$scope.correctGuesses = 0;

		// Set gamestate to active
		$scope.gameStarted = true;
		$scope.gameActive = true;
		
		$scope.gameTime = 15 * 60 * 1000;
		counter = $interval(function() {
			$scope.gameTime -= 1000;
			if ($scope.gameTime === 0) {
				$scope.timeUp();
			}
		}, 1000);
	}

	$scope.timeUp = function() {
		$scope.endGame();
		// Update modal text and show it
		$scope.modalTitle = "Time up!";
		$scope.modalText =  "Owp... you ran out of time. Tweet your score below, or close this window to see which ones you missed.";
		$scope.modalShown = true;
	}

	$scope.win = function() {
		$scope.endGame();
		// Update modal text and show it
		$scope.modalTitle = "You win!";
		$scope.modalText =  "You got them all! Tweet your score below, or close this window to play again.";
		$scope.modalShown = true;
	}

	$scope.giveUp = function() {
		$scope.endGame();
		// Update modal text and show it
		$scope.modalTitle = "You wuss";
		$scope.modalText =  "You quit like a baby. Tweet your score below, or close this window to see which ones you missed.";
		$scope.modalShown = true;
	}
});

rambl.factory('countryFactory', function($http) {
    return $http.get('/js/data/countries.json');
});

