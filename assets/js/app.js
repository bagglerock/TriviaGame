//**  The questions stored in an array of objects   **/

var questions = [{
  question: "If a person holds 3 widgets, How many tires can fit in a locker?",
  choices: [{
      choice: "Banana",
      status: "true"
    },
    {
      choice: "Dirt",
      status: "false"
    },
    {
      choice: "Umbrella",
      status: "false"
    },
    {
      choice: "Square root of a triangle",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "If a plane is going 300mph, does Puppy like gyros?",
  choices: [{
      choice: "James Cameron",
      status: "true"
    },
    {
      choice: "Martian",
      status: "false"
    },
    {
      choice: "Guitar",
      status: "false"
    },
    {
      choice: "Javascript",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "10 times 6 is...",
  choices: [{
      choice: "Car",
      status: "true"
    },
    {
      choice: "George Washington",
      status: "false"
    },
    {
      choice: "Perpetual Motion",
      status: "false"
    },
    {
      choice: "Tower of Hanoi",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "The seven dwarfs are part of which highway",
  choices: [{
      choice: "Hans Christian Anderson",
      status: "true"
    },
    {
      choice: "Hamster",
      status: "false"
    },
    {
      choice: "17 USD",
      status: "false"
    },
    {
      choice: "Aorta",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Dallas, Massachussets is adjacent to the cellular membrane on which sandwich?",
  choices: [{
      choice: "Salacious Crumb",
      status: "true"
    },
    {
      choice: "Pneumonoultramicroscopicsilicovolcanoconiosis",
      status: "false"
    },
    {
      choice: "6 of Diamonds",
      status: "false"
    },
    {
      choice: "Twelveteen",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Udo has a grain of salt. There are many wolves in a hectare.  Is rose the color of a prodigy?",
  choices: [{
      choice: "Truffles",
      status: "true"
    },
    {
      choice: "Axe Body Spray",
      status: "false"
    },
    {
      choice: "C",
      status: "false"
    },
    {
      choice: "Vincent Van Gogh",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Actor, inanimate carbon rod, stars in which Sci-Fi potato?",
  choices: [{
      choice: "Yardstick",
      status: "true"
    },
    {
      choice: "Blue",
      status: "false"
    },
    {
      choice: "February 14th 2008",
      status: "false"
    },
    {
      choice: "Chicago Bulls",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "A crystalline solution of ketchup is also known as...",
  choices: [{
      choice: "External Occipital Protubrance",
      status: "true"
    },
    {
      choice: "Edgar Allen Poe",
      status: "false"
    },
    {
      choice: "Horse",
      status: "false"
    },
    {
      choice: "Ceiling Fan",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Where is the tallest amoeba in a walnut located.",
  choices: [{
      choice: "Roast Beef Sandwich",
      status: "true"
    },
    {
      choice: "Labor Pains",
      status: "false"
    },
    {
      choice: "Jaundice",
      status: "false"
    },
    {
      choice: "A-10 Thunderbolt",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "During the War of 485, cosmonauts invented which Tetris Game?",
  choices: [{
      choice: "Astral Projection",
      status: "true"
    },
    {
      choice: "Lightning and Thunder",
      status: "false"
    },
    {
      choice: "NORAD",
      status: "false"
    },
    {
      choice: "Isildur",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Human Centipedes are most commonly used for this type of degenerative tissue behavior.",
  choices: [{
      choice: "10,000 Maniacs",
      status: "true"
    },
    {
      choice: "Speed of Sound",
      status: "false"
    },
    {
      choice: "Array of Objects",
      status: "false"
    },
    {
      choice: "a battery",
      status: "false"
    }
  ],
  link: "somelink.com"
},
{
  question: "Peanut butter and waffled french fries, sometimes, are referred to this type of oil change",
  choices: [{
      choice: "The Quickening",
      status: "true"
    },
    {
      choice: "UMDNJ",
      status: "false"
    },
    {
      choice: "United Airlines",
      status: "false"
    },
    {
      choice: "Grover Cleveland",
      status: "false"
    }
  ],
  link: "somelink.com"
},

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

//  Variable to hold the interval for the countdown
var countdownInterval;

//  Variable to hold the interval for the question
var gameTimer;

//  Variable to hold the timeout for the answer
var timesUp;

// Array to hold the questions that were asked
var questionsAsked = [];

//  Variable to hold the cloned array
var questionsTwin = [];

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
var index = choicesArray.findIndex(function (choice) {
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
  //  Make the index to the answer a global variable
  getIndex(choices);
  //  Set a time out for the answers to show if the correct answer is not chosen
  setTimesUp(choices);
  //  Clear the interval that holds the countdown
  clearInterval(countdownInterval);
  //  Reset the timer for the countdown
  countdown = 15;
  //  Display the timer in the timer-area
  $("#timer-area").text(countdown);
  //  Start the interval for the countdown timer
  countdownInterval = setInterval(showTimer, 1000);
} else {
  //  If the game is done then stop the questions from running and display the results
  clearTimers();
  clearTimerArea();
  displayResults();
}
}

//**   DOM manipulation functions   **/

function showTimer() {
countdown--;
$("#timer-area").text(countdown);
}

function clearTimerArea() {
$("#timer-area").empty();
}

//  Function that clears the area where the questions are shown
function clearQuestion() {
$("#question-area").empty();
}

//  Function that clears the area where the choices are shown
function clearChoices() {
$("#choices-area").empty();
}

//  Display the question in the question area
function displayQuestion(questionObject) {
clearQuestion();
var question = $("<h1>");
question.text(questionObject.question);
$("#question-area").append(question)
$("#question-area h1").fadeIn();

}

//  Display the buttons of the choices in the choices area
function displayChoices(choicesArray) {
clearChoices();
for (var i = 0; i < choicesArray.length; i++) {
  var choice = $("<button>");
  choice
    .text(choicesArray[i].choice)
    .addClass("btn choice")
    //  Set the index here so we have a way of determining the correct answer
    .attr("index", i);
  $("#choices-area").append(choice);
}
}

//  Displays a message if you make the correct choice
function displayCorrect(answerText) {
clearQuestion();
var correct = $("<h1>");
correct.text("That is correct! The answer is: " + answerText);
$("#question-area").append(correct);
$("#question-area h1").fadeIn();
}

//  Show the answer if the timer goes to 0 and increment the incorrect answers tally
function displayAnswer(choicesArray) {
//  Something I found that can find the index of the array where a certain key is
clearQuestion();
var index = choicesArray.findIndex(function (choice) {
  return choice.status === "true";
});
//  Show the answer on the screen
var answer = $("<h1>");
answer.text("The answer is: " + choicesArray[index].choice);
$("#question-area").append(answer);
$("#question-area h1").fadeIn();
//  Increment the incorrect answers by one and show a screen that shows the correct answer
incorrectAnswers++;
}

//  Display the results on the screen
function displayResults() {
clearQuestion();
clearChoices();
var summary = $("<p>");
summary.text(
  "You have made " +
  correctAnswers +
  " correct answers and selected " +
  incorrectAnswers +
  " incorrect answers"
);
var message = $("<h1>");
message.text("Here are your results");
$("#question-area").append(message);
$("#question-area").append(summary);
$("#question-area h1").fadeIn();
makeStartButton();
}

//  Since there are alot of clearing of the divs, we have to make the start button again
function makeStartButton() {
var startButton = $("<button>");
startButton
  .attr("id", "start-game")
  .addClass("btn btn-secondary")
  .text("Start Game");
$("#question-area").append(startButton);
}

function disableChoiceButton() {
$(this).attr("disabled", true);
}

function disableAllButtons() {
$(".choice").attr("disabled", true);
}

//**   Functions that manipulate timers   **/

//  Start the interval.. do the next question every so many seconds as specified by the intervalTimer
function startTimer() {
gameTimer = setInterval(function () {
  nextQuestion();
}, intervalTimer);
}

//  Start the timer to show the answer if you fail to choose one in the insanely long amount of time alotted
function setTimesUp(choicesArray) {
timesUp = setTimeout(function () {
  displayAnswer(choicesArray);
  clearInterval(countdownInterval);
}, timeoutTimer);
}

//  This stops the interval timer when the game is over
function clearTimers() {
clearInterval(gameTimer);
clearTimeout(timesUp);
clearInterval(countdownInterval);
}

//Set the timer for the next question
function setNextQuestion() {
setTimeout(function () {
  nextQuestion();
  startTimer();
}, 2000);


}

//**   Event Listeners   **/

//  This just makes sure that the page is fully loaded to start listening to stuff
$(document).ready(function () {
//  Start Button Listener
$(document).on("click", "#start-game", function () {
  $("#start-game").remove();
  initialize();
  nextQuestion();
  startTimer();
});

//Choice Button Listener
$(document).on("click", ".choice", function () {
  var buttonIndex = parseInt($(this).attr("index"));
  if (buttonIndex === answerIndex) {
    var answerText = $(this)[0].innerText;
    clearTimers();
    correctAnswers++;
    disableAllButtons();
    displayCorrect(answerText);
    setNextQuestion();
  } else {
    $(this)
    .attr("disabled", true)
    .addClass("incorrect")
    .text("incorrect");
    disableChoiceButton(this);
    incorrectAnswers++;
  }
});
});

/*

Issues to take on later:

If the wrong answer is chosen, make it so that it goes on to the next question and tallies the answer
Or if the wrong answer is chosen, add up the remainder of seconds to make a score.

*/
