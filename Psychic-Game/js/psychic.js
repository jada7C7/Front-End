// Creates an array that lists out all of the letters of the alphabet.
var psychicChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

/* Global Variables
-------------------------------- */

var wins = 0;
var losses = 0;

// User has 9 chances to guess the letter
var guessesLeft = 9;

// Array that stores the user guesses in each round
var runningGuesses = [];

// Randomly chooses a choice from the options array. This is the Computer's guess
var psychicGuess = psychicChoices[Math.floor(Math.random() * psychicChoices.length)];
console.log("Psychic Guess: " + psychicGuess);

/* Functions
-------------------------------- */

// Reset function
function reset() {
  guessesLeft = 9;
  document.querySelector("#guessesLeft").innerHTML = guessesLeft;
  runningGuesses = [];
  document.querySelector("#guesses").innerHTML = runningGuesses;
  psychicGuess = psychicChoices[Math.floor(Math.random() * psychicChoices.length)];
  console.log("Psychic Guess: " + psychicGuess);
  return;
}

// Function run whenever the user presses a key.
document.onkeyup = function(event) {
  
  // Determines which key was pressed.
  var userGuess = event.key;

  // Decreases number of guesses and displays in html
  guessesLeft--;
  document.querySelector("#guessesLeft").innerHTML = guessesLeft;
  
  // Pushes guesses to runningGuesses array and displays in html
  runningGuesses.push(userGuess);
  document.querySelector("#guesses").innerHTML = runningGuesses;

  // If psychicGuess equals userGuess then add 1 to wins. If guessesLeft gets to 0 then add 1 to losses
  if (psychicGuess == userGuess) {
    wins++;
    document.querySelector("#wins").innerHTML = wins;
    alert("You're a psychic!");

    // Reset everything
    reset();

  } else if (guessesLeft === 0) {
    losses++;
    document.querySelector("#losses").innerHTML = losses;
    alert("You're not quite a psychic yet. Keep trying.");

    // Reset everything
    reset();
  }
};