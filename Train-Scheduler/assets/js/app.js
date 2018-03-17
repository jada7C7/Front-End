
/* 1. Initialize Firebase
--------------------------------------------- */
var config = {
  apiKey: "AIzaSyBgWXkLnJrTika_2Nrp_b10XmHTDoRjsYk",
  authDomain: "train-scheduler-5ea62.firebaseapp.com",
  databaseURL: "https://train-scheduler-5ea62.firebaseio.com",
  projectId: "train-scheduler-5ea62",
  storageBucket: "",
  messagingSenderId: "584428010541"
};

firebase.initializeApp(config);

// Create a variable to reference the database
  var database = firebase.database();

/* 2. Button for adding trains
--------------------------------------------- */
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  console.log("user input:" + trainTime);

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log("--------------");
  console.log("FROM BUTTON:");
  console.log("--------------");
  console.log("TRAIN NAME: " + newTrain.name);
  console.log("DESTINATION: " + newTrain.destination);
  console.log("FIRST TRAIN: " + newTrain.time);
  console.log("FREQUENCY: " + newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  //console.log(childSnapshot.val());

  // Store everything into a variable
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // train Info
  console.log("--------------");
  console.log("FROM DATABASE:");
  console.log("--------------");
  console.log("TRAIN NAME: " + trainName);
  console.log("DESTINATION: " + trainDest);
  console.log("FIRST TRAIN: " + trainTime);
  console.log("FREQUENCY: " + trainFreq);

  // MATH PART: Find next arrival time and minutes away
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log("CONVERTED TIME: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFreq;
  console.log("REMAINDER: " + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Prettify the next train time
  var nextTrainPretty = moment(nextTrain).format("hh:mm");

  // Add each train's data into the table
  $("#train-data").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });