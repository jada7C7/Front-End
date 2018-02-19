
  
  /* Functions
-------------------------------- */


  // function that initializes the variables for each now round of the game
	function newGame() {
    
    // have computer pick a number between 19-120
		var targetNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    
    // pick random gem values between 1-12
		gemOne = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    gemTwo= Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    gemThree = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    gemFour = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    
    // set initial value of user's ongoing gem selections sum to 0
		counter = 0;
    
    // update the html for the game board
		$('#wins').text(wins);
		$('#losses').text(losses);
		$("#number-to-guess").text(targetNumber);
    $('#counter').text(counter);
    

    $('#one').attr("data-crystalvalue", gemOne);
    $('#two').attr("data-crystalvalue", gemTwo);
    $('#three').attr("data-crystalvalue", gemThree);
    $('#four').attr("data-crystalvalue", gemFour);

	}




/* Global Variables
-------------------------------- */

  var wins = 0;
  var losses = 0;
  var targetNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    

    newGame();

  // This time, our click event applies to every single crystal on the page. Not just one.
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

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    $('#counter').text(counter);

    if (counter === targetNumber) {
      alert("You win!");
      wins ++;
      $('#wins').text(wins);
      newGame();
    }

    else if (counter > targetNumber) {
      alert("You lose!!");
      losses ++;
      $('#losses').text(losses);
      newGame();
    }

  });