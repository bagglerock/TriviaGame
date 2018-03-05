//**  The questions stored in an array of objects   **/

var questions = [
  {
    question:
      "If a person holds 3 widgets, How many tires can fit in a locker?",
    choices: [
      { choice: "Banana", status: "true" },
      { choice: "Dirt", status: "false" },
      { choice: "Umbrella", status: "false" },
      { choice: "Square root of a triangle", status: "false" }
    ],
    link: "somelink.com"
  },
  {
    question: "If a plane is going 300mph, does Puppy like gyros?",
    choices: [
      { choice: "James Cameron", status: "true" },
      { choice: "Martian", status: "false" },
      { choice: "Guitar", status: "false" },
      { choice: "Javascript", status: "false" }
    ],
    link: "somelink.com"
  },
  {
    question: "10 times 6 is...",
    choices: [
      { choice: "Car", status: "true" },
      { choice: "George Washington", status: "false" },
      { choice: "Perpetual Motion", status: "false" },
      { choice: "Tower of Hanoi", status: "false" }
    ],
    link: "somelink.com"
  },
  {
    question: "The seven dwarfs are part of which highway",
    choices: [
      { choice: "Hans Christian Anderson", status: "true" },
      { choice: "Hamster", status: "false" },
      { choice: "17 USD", status: "false" },
      { choice: "Aorta", status: "false" }
    ],
    link: "somelink.com"
  },
  {
    question:
      "Dallas, Massachussets is adjacent to the cellular membrane on which sandwich?",
    choices: [
      { choice: "Salacious Crumb", status: "true" },
      {
        choice: "Pneumonoultramicroscopicsilicovolcanoconiosis",
        status: "false"
      },
      { choice: "6 of Diamonds", status: "false" },
      { choice: "Twelveteen", status: "false" }
    ],
    link: "somelink.com"
  }
];

//**   Variables   **//

//  Boolean to hold the status of the game
var gameRunning = false;

// countdown display
var countdown = 25;

//  Tallies
var correctAnswers;
var incorrectAnswers;

//  Timer Intervals
var intervalTimer = 18000;
var timeoutTimer = 15999;
var intervalId;

//  Variable to hold the interval for the question
var gameTimer;

//  Variable to hold the timeout for the answer
var timesUp;

var questionsTwin = [];
// Array to hold the questions that were asked
var questionsAsked = [];

//  Can't figure out how to hide the answer so I'm storing it in a global variable
var answerIndex;

//**   Functions   **//

//  Function that initializes the game when starts.  Sets game to true, resets the tallies, clears out array of questions asked.
function initialize() {
  gameRunning = true;
  correctAnswers = 0;
  incorrectAnswers = 0;
  //  Had to copy this little piece of code to deep clone an array.  A deep clone is a clone of an array that copies the objects within also
  //  This close was needed because the original array would be blank after one game was played
  questionsTwin = jQuery.extend(true, [], questions);
  questionsAsked = [];
}

//   Function to change the order of how the questions come out, as well as keep track of which questions were asked.
function pickQuestion() {
  if (questionsTwin.length > 0) {
    //  Set a random number to between 0 and the length of the array of questions
    var randomNumber = Math.floor(Math.random() * questionsTwin.length);
    //  Choose a random question object based on the randomNumber
    var chosenQuestion = questionsTwin[randomNumber];
    //  Push the question onto a new array of questions asked so questions won't be duplicated
    questionsAsked.push(chosenQuestion);
    //  Remove the question from the cloned object array so the question cannot be chosen again
    questionsTwin.splice(randomNumber, 1);
    //  If the questions have all been asked, then set the gameRunning to false
    if (questionsTwin.length === 0) {
      gameRunning = false;
    }
    //  Return the chosen question
    return chosenQuestion;
  }
}

//  Function to change the order of how the choices will be displayed.  This takes in the chosen question object from pickQuestion()
function randomizeChoices(questionObject) {
  // Make variables (Reset variables) for the choices from the question object and another array for the questions after they have been randomized
  var choices = questionObject.choices;
  var randomizedChoices = [];
  //  White there are still choices remaining, push them into the randomizedChoices array and remove them from the original choices array
  while (choices.length > 0) {
    var randomNumber = Math.floor(Math.random() * choices.length);
    randomizedChoices.push(choices[randomNumber]);
    choices.splice(randomNumber, 1);
  }
  //  Return this newly reordered bunch of choices
  return randomizedChoices;
}

//  Get the index of the answer and set the global variable as this answer
function getIndex(choicesArray) {
  var index = choicesArray.findIndex(function(choice) {
    return choice.status === "true";
  });
  answerIndex = index;
}

//  Pretty much the main function ... automatically chooses a next question
function nextQuestion() {
  //  If the game is running...
  if (gameRunning) {
    //  Pick a question out of a hat and set it to an object called currentQuestion
    var currentQuestion = pickQuestion();
    //  Changed the order of the choices and set them to a new array called choices
    var choices = randomizeChoices(currentQuestion);
    //  Display the question in the question-area
    displayQuestion(currentQuestion);
    //  Display the choices in the choice area
    displayChoices(choices);
    //  Make the index into a global variable
    getIndex(choices);
    //  Set a time out for the answers to show if the correct answer is not chosen
    setTimesUp(choices);
    clearInterval(intervalId);
    countdown = 15;
    $(".timer-area").text(countdown);
    intervalId = setInterval(showTimer, 1000);
  } else {
    //  If the game is done then stop the questions from running and display the results
    clearTimers();
    displayResults();
  }
}

//**   DOM manipulation functions   **/

function showTimer() {
  countdown--;
  $(".timer-area").text(countdown);
}

//  Function that clears the area where the questions are shown
function clearQuestion() {
  $(".question-area").empty();
}

//  Function that clears the area where the choices are shown
function clearChoices() {
  $(".choices").empty();
}

//  Display the question in the question area
function displayQuestion(questionObject) {
  clearQuestion();
  var question = $("<h1>");
  question.text(questionObject.question);
  $(".question-area").append(question);
}

//  Display the buttons of the choices in the choices area
function displayChoices(choicesArray) {
  clearChoices();
  for (var i = 0; i < choicesArray.length; i++) {
    var choice = $("<button>");
    choice
      .text(choicesArray[i].choice)
      .addClass("btn btn-warning choice")
      //  Set the index here so we have a way of determining the correct answer
      .attr("index", i);
    $(".choices").append(choice);
  }
}

//  Display the results on the screen
function displayResults() {
  clearQuestion();
  var summary = $("<p>");
  summary.text(
    "You have made " +
      correctAnswers +
      " correct answers and " +
      incorrectAnswers +
      " incorrect answers"
  );
  var message = $("<h1>");
  message.text("Here are your results");
  $(".question-area").append(message);
  $(".question-area").append(summary);
  makeStartButton();
}

//  Since there are alot of clearing of the divs, we have to make the start button again
function makeStartButton() {
  var startButton = $("<button>");
  startButton
    .attr("id", "start-game")
    .addClass("btn btn-secondary")
    .text("Start Game");
  $(".question-area").append(startButton);
}

//  Show the answer if the timer goes to 0 and increment the incorrect answers tally
function showAnswer(choicesArray) {
  //  Something I found that can find the index of the array where a certain key is
  clearQuestion();
  var index = choicesArray.findIndex(function(choice) {
    return choice.status === "true";
  });
  //  Show the answer on the screen
  var answer = $("<h1>");
  answer.text("The answer is: " + choicesArray[index].choice);
  $(".question-area").append(answer);
  //  Increment the incorrect answers by one and show a screen that shows the correct answer
  incorrectAnswers++;
}

function displayCorrect() {
  clearQuestion();
  var correct = $("<h1>");
  correct.text("That is correct!");
  $(".question-area").append(correct);
}

//**   Functions that manipulate timers   **/

//  Start the timer for the questions to show
function startTimer() {
  gameTimer = setInterval(function() {
    nextQuestion();
  }, intervalTimer);
}

//  Start the timer to show the answer if you fail to choose one in the insanely long amount of time alotted
function setTimesUp(choicesArray) {
  timesUp = setTimeout(function() {
    showAnswer(choicesArray);
    clearInterval(intervalId);
  }, timeoutTimer);
}

//  This stops the interval timer when the game is over
function clearTimers() {
  clearInterval(gameTimer);
  clearTimeout(timesUp);
  clearInterval(intervalId);
}

//Celebrate
function correctAnswer() {
  setTimeout(function() {
    nextQuestion();
  }, 2000);
  displayCorrect();
}

//**   Event Listeners   **/

//  This just makes sure that the page is fully loaded to start listening to stuff
$(document).ready(function() {
  //  Start Button Listener
  $(document).on("click", "#start-game", function() {
    $("#start-game").remove();
    initialize();
    nextQuestion();
    startTimer();
  });

  //Choice Button Listener
  $(document).on("click", ".choice", function() {
    var buttonIndex = parseInt($(this).attr("index"));
    if (buttonIndex === answerIndex) {
      console.log("correct answer");
      clearTimers();
      correctAnswers++;
      correctAnswer();
    } else {
      console.log("incorrect answer");
      incorrectAnswers++;
    }
  });
});

/*

Issues to take on later:

Visually needs some flair
Message system needed, like please choose another choice or things like that.
Have to change the questions to be more serious... or maybe add more unserious questions



*/