/* Set global variables
----------------------------- */


// Create an array of states
var states = ["maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana"];

// Randomly pick a state out of states array and store in selected state variable
var selectedState;
console.log(selectedState);

// This will break the solution into individual letters to be stored in array
var lettersInChosenWord = [];

// This will be the number of blanks we show based on the solution
var numBlanks = 0;

// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];





// // Initiating dash as an empty string
// var underscore = "";

// Game counters
var wins = 0;
var losses = 0;
var guessesLeft = 9;

// Array that stores the wrong guesses
var runningGuesses = [];






// Initiate game
function initiateGame() {

  // Reset the guesses back to 0.
  numGuesses = 9;

  // Randomly choose a state
  var selectedState = states[Math.floor(Math.random() * states.length)];

  


  
  // define the length of each state by letter and dispaly underscores.
  for (i=0; i < selectedState.length; i++) {
  // console.log(selectedState[i]);
  underscore = underscore + "_ ";
  //console.log(underscore);
  document.querySelector("#word").innerHTML = underscore;
  }

}

// Will replace underscores with the appropriate letter.


// Create an array of all the letters
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

initiateGame();

//Key-up function

// Function run whenever the user presses a key.
document.onkeyup = function(event) {
  
  // Determines which key was pressed.
  var userGuess = event.key;

  
  
  

  // If psychicGuess equals userGuess then add 1 to wins. If guessesLeft gets to 0 then add 1 to losses
  for (i=0; i < selectedState.length; i++) {
          console.log(selectedState[i]);
           if (selectedState.charAt(i) === userGuess) {  //** myFarm[i][0] is same as myFarm[i].charAt(0) **
               var letterPosition = selectedState.indexOf(userGuess);
               console.log(letterPosition);
            
          //alert("True");
               
               //break; - this may not work with states duplicate letters
            //set the charAt number to a variable


           }
           
         }

         if (selectedState.charAt(i) !== userGuess) {
          // Pushes guesses to runningGuesses array and displays in html
         runningGuesses.push(userGuess);
         document.querySelector("#guesses").innerHTML = runningGuesses;
         
         // Decreases number of guesses and displays in html
         guessesLeft--;
         document.querySelector("#guessesLeft").innerHTML = guessesLeft;
      }




  // if (selectedState == userGuess) {
  //   wins++;
  //   document.querySelector("#wins").innerHTML = wins;
  //   alert("You're a psychic!");

  //   // Reset everything
  //   //reset();

  // } else if (guessesLeft === 0) {
  //   losses++;
  //   document.querySelector("#losses").innerHTML = losses;
  //   alert("You're not quite a psychic yet. Keep trying.");

  //   // Reset everything
  //   //reset();
  // }
};


// Need an empty array for incorrect guesses

// create an function to call letters and display when correct

// keep scrore of wins/losses

// randomly select word from states array and add to varible






// // var myFarm = ["chickens", "pigs", "cows", "horses", "ostriches"];

//      for (i=0; i < myFarm.length; i++) {
//        console.log(myFarm[i]);
//        if (myFarm[i].charAt(0) === "c") {  //** myFarm[i][0] is same as myFarm[i].charAt(0) **
//            alert("Starts with C!");
//        }
//        if (myFarm[i].charAt(0) === "o") {
//            alert("Starts with O!");
//        }
//      }