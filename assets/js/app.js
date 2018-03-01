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

//  Tallies
var correctAnswers;
var incorrectAnswers;

//  Timer Intervals
var intervalTimer = 30 * 1000;
var TimeoutTimer = 5 * 1000;

//  Variable to hold the interval for the question
var showQuestion;

//  Variable to hold the timeout for the answer
var showAnswer;

// Array to hold the questions that were asked
var questionsAsked = [];

//**   Functions   **//

//  Function that initializes the game when starts.  Sets game to true, resets the tallies, clears out array of questions asked.
function initialize() {
  gameRunning = true;
  correctAnswers = 0;
  incorrectAnswers = 0;
  questionsAsked = [];
}

//   Function to change the order of how the questions come out, as well as keep track of which questions were asked.
function pickQuestion() {
  var randomNumber = Math.floor(Math.random() * questions.length);
  var chosenQuestion;
  if (questions.length > 0) {
    chosenQuestion = questions[randomNumber];
    questionsAsked.push(chosenQuestion);
    questions.splice(randomNumber, 1);
    return chosenQuestion;
  } else {
    console.log("array is empty, no more questions to ask");
    gameRunning = false;
  }
}

//  Function to change the order of how the choices will be displayed.
function randomizeChoices(questionObject) {
  var choices = questionObject.choices;
  var randomizedChoices = [];
  while (choices.length > 0) {
    var randomNumber = Math.floor(Math.random() * choices.length);
    randomizedChoices.push(choices[randomNumber]);
    choices.splice(randomNumber, 1);
  }
  return randomizedChoices;
}

//**   DOM manipulation functions   **/

//  Function that clears the area where the questions are shown
function clearQuestion() {
  $(".question-area").empty();
}

//  Function that clears the area where the choices are shown
function clearChoices () {
    $(".choices").empty();
}

//  Display the question in the question area
function displayQuestion (questionObject) {
    clearQuestion();
    console.log(questionObject.question);
    var question = $("<h1>");
    question.text(questionObject.question);
    $(".question-area").append(question);
}

//  Display the buttons of the choices in the choices area
function displayChoices (choicesArray) {
    clearChoices();
    for ( var i = 0; i < choicesArray.length; i++ ){
        var choice = $("<button>");
        choice
        .text(choicesArray[i].choice)
        .addClass("btn btn-primary");
        $(".choices").append(choice);
    }
    


}


function displayResults() {
  clearQuestion();
  var summary = $("<h1>");
  summary.text("There aren't any more questions");
  $(".question-area").append(summary);
}

//**   Functions that manipulate timers   **/

function startTimer() {
  //  Show the Timed Out screen after 30 seconds
  showQuestion = setInterval(nextQuestion, 5000);
}

//  Maybe should be called show next question..  automatically chooses a next question
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
    //  Set a time out for the answers to show if the correct answer is not chosen
    showAnswer = setTimeout(showTimeOut, 4000);
  } else {
    stopQuestions();
    displayResults();
  }
}

function showTimeOut() {
  //  Increment the incorrect answers by one and show a screen that shows the correct answer
  clearQuestion();
  var test = $("<h1>");
  //var a = currentQuestion.answer;
  test.text("nothing here yet");
  $(".question-area").append(test);
  //  set another time out to show next question
}

function stopQuestions() {
  clearInterval(showQuestion);
}

$(document).ready(function() {
  $("#start-game").on("click", function() {
    $("#start-game").remove();
    initialize();
    nextQuestion();
    startTimer();
  });

  $(".selected-answer").on("click", function() {
    if (selectedAnswer === answer) {
      //showCongrats();
    } else {
      //greySelection();
    }
  });
});

/*

Its almost like a slideshow

Start button initiates the game.

Once the game is started, the timer starts and the first question is displayed.

If the correct answer is selected, the timer stops and a new timer starts as the "celebratory" picture is displayed.
If the incorrect answer is selected, the incorrect answer is crossed out but the timer continues.  
If the timer runs out without the correct answer selected, the correct answer is displayed with an "explanatory" picture is displayed.

Depending on the status of the answer, the score is changed accordingly.

After the new timer is exhausted, a new question comes up with a new timer.

After all the questions have been asked, the game stops the last timer and the score is displayed as well as the start button.


Add some classes like incorrect-answer and correct-answer so we can eliminate the wrong asnwers ever 10 seconds


Assignment Directions

### Option Two: Advanced Assignment (Timed Questions)

![Advanced](Images/2-advanced.jpg)

**[Click Here to Watch the demo](advanced-trivia-demo.mov)**.

* You'll create a trivia game that shows only one question until the player answers it or their time runs out.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* The scenario is similar for wrong answers and time-outs.

  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).





*/
