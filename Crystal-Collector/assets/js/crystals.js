/* Global Variables
-------------------------------- */

var wins = 0;
var losses = 0;

// Computer picks a number between 19-120
var targetNumber = Math.floor(Math.random() * 120) + 1;

/* Functions
-------------------------------- */

  // Function that initializes the game.
	function newGame() {
    
    // Set initial value of counter to 0
		counter = 0;
    
    // Random number between 19-120
		targetNumber = Math.floor(Math.random() * 120) + 1;
    
    // Pick random crystal values between 1-12
		crystalOne = Math.floor(Math.random() * 12) + 1;
    crystalTwo= Math.floor(Math.random() * 12) + 1;
    crystalThree = Math.floor(Math.random() * 12) + 1;
    crystalFour = Math.floor(Math.random() * 12) + 1;
    
    // update the html
		$('#wins').text(wins);
		$('#losses').text(losses);
		$("#guess").text(targetNumber);
    $('#counter').text(counter);
    $('#one').attr("data-crystalvalue", crystalOne);
    $('#two').attr("data-crystalvalue", crystalTwo);
    $('#three').attr("data-crystalvalue", crystalThree);
    $('#four').attr("data-crystalvalue", crystalFour);
	}

  newGame();

  // Function that holds the click event for every crystal on the page
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // Game win-lose logic
    $('#counter').text(counter);

    if (counter === targetNumber) {
       // $("#message").text("You Win! You collected the right amount of crystals.");
        wins ++;
        $('#wins').text(wins);
        newGame();
    } else if (counter >= targetNumber) {
        //$("#message").text("You Lose! Looks like you collected too many crystals.");
        losses ++;
        $('#losses').text(losses);
        newGame();
    }

  });

  