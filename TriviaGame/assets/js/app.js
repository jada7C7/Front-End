/* Global Variables
---------------------------------------------------------------------- */

// Create an object to store all the questions and answers
var triviaQuestions = [{
	question: "What creature is depicted in the emblem for Gryffindor house?",
	possibleAnswers: ["A badger", "A snake", "A lion", "An eagle"],
  answer: "A lion",
  questionNumber: "1"
},{
	question: "What is the incantation for the Summoning Charm?",
	possibleAnswers: ["accio", "aparecium", "anapneo", "avis"],
  answer: "accio",
  questionNumber: "2"
},{
	question: "Which one of these ghosts is not a Hogwarts house ghost?",
	possibleAnswers: ["Nearly Headless Nick", "Moaning Myrtle", "The Bloody Baron", "The Gray Lady"],
  answer: "Moaning Myrtle",
  questionNumber: "3"
},{
	question: "How are parcels and letters sent in the wizarding world?",
	possibleAnswers: ["Via broomsticks", "Via wizarding postmen", "Via the Floo Network", "Via owls"],
  answer: "Via owls",
  questionNumber: "4"
},{
	question: "What do Harry and Ron crash into when they fly Arthur Weasley's Ford Anglia to Hogwarts?",
	possibleAnswers: ["The Whomping Willow", "The Great Lake", "The Astonomy Tower", "The Hogwarts Express"],
  answer: "The Whomping Willow",
  questionNumber: "5"
},{
	question: "Which one of these items is not a Deathly Hallow?",
	possibleAnswers: ["The Elder Wand", "The Cloak of Invisibility", "The Ravenclaw Diadem", "the Ressurection Stone"],
  answer: "The Ravenclaw Diadem",
  questionNumber: "6"
},{
	question: "Among the wizarding community, the term \"Muggle\" refers to what kind of person?",
	possibleAnswers: ["A magical person who is really bad at magic", "A magical person with only one magical parent", "A non-magical person from a magical family", "A non-magical person from a non-magical family"],
  answer: "A non-magical person from a non-magical family",
  questionNumber: "7"
},{
	question: "Which mode of transportation do students use when arriving at Hogwarts for the first time?",
	possibleAnswers: ["Side-along-apparition", "Magical boats across the lake", "Hippogriffs", "Broomsticks"],
  answer: "Magical boats across the lake",
  questionNumber: "8"
}];

var intervalId;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswered = 0;
var number = 120;

/* Functions
---------------------------------------------------------------------- */

$(document).on("click", ".form-check-input", function() {
  
  // Check all the answers and tally correct & incorrect
  var index = $(this).attr("name");

  if($(this).attr("value") == triviaQuestions[index].answer){
    correctAnswer++;
  } else if($(this).attr("value") !== triviaQuestions[index].answer) {
    incorrectAnswer++;
  }

  // Unanswered
  unanswered = triviaQuestions.length - (incorrectAnswer + correctAnswer);

})

/* Start Game
------------------------------- */
// Hide start button once clicked
$("#start").on("click", function() {
  $("#start").hide();
  $("#wand1").hide();

  // Call timer function
  countDown();
  
  for (var i = 0; i < triviaQuestions.length; i++) {
    $(".col-md-8").append("<div class='questionNumber'>Question #" + triviaQuestions[i].questionNumber + "/" + triviaQuestions.length + "</div>");
    $(".col-md-8").append("<h2>" + triviaQuestions[i].question + "</h2>");
      
    for (var j = 0; j < triviaQuestions[i].possibleAnswers.length; j++) { 
      $(".col-md-8").append("<div class='form-check'><input class='form-check-input' type='radio' name='" + i + "' value='" + triviaQuestions[i].possibleAnswers[j] + "'><label class='form-check-label'>" + triviaQuestions[i].possibleAnswers[j] + "</label></div>");
    }
  }

  // Create a submit button
  $(".col-md-8").append("<div class='text-center'><button class='btn btn-primary results' id='results'>Accio Results</button></div>");
  
  $("#results").on("click", function() {
    results();
  })
  
})

/* Timer function
------------------------------- */
function countDown() {

  // Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  // The decrement function.
  function decrement() {
    number--;
    $("#show-number").html("<div class='col-md-12'><h4>Time Remaining: " + number + "</h4></div>");

    //  Once number hits zero...
    if (number === 0) {
      results();
    }
  }

  // Execute the run function.
  run();
}

/* Results function
------------------------------- */
function results() {
  clearInterval(intervalId);
  $(".col-md-8").replaceWith("<div class='col-md-8 text-center'><h3>Results</h3><p><strong>Correct Answers:</strong> " + correctAnswer + "</p><p><strong>Incorrect Answers:</strong> " + incorrectAnswer + "</p><p><strong>Unanswered:</strong> " + unanswered + "</p><img src='assets/images/wand-2.png' class='wand img-fluid' /></div>");
}