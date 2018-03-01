//  Array of Questions with answers
var questions = [
  {
    question: "If a person holds 3 widgets, How many tires can fit in a locker?",
    a: "Banana",
    b: "Dirt",
    c: "Umbrella",
    d: "Square root of a triangle",
    answer: "d",
    link: "somelink.com"
  },
  {
    question: "If a plane is going 300mph, does Puppy like gyros?",
    a: "Any",
    b: "Martian",
    c: "guitar",
    d: "javascript",
    answer: "d",
    link: "somelink.com"
  },
  {
    question: "10 times 6 is...",
    a: "car",
    b: "George Washington",
    c: "perpetual motion",
    d: "Tower of Hanoi",
    answer: "d",
    link: "somelink.com"
  },
  {
    question: "The seven dwarfs are part of which highway",
    a: "Frank Sinatra - My Way",
    b: "hamster",
    c: "17 dollars",
    d: "aorta",
    answer: "c",
    link: "somelink.com"
  },
  {
    question:
      "Dallas, Massachussets is adjacent to the cellular membrane on which sandwich?",
    a: "Salacious Crumb",
    b: "pneumonoultramicroscopicsilicovolcanoconiosis",
    c: "85858",
    d: "Twelveteen",
    answer: "b",
    link: "somelink.com"
  }
];

/*for ( var i = 0; i < questions.length; i++){
    console.log(questions[i].question);
    console.log(questions[i].a);
    console.log(questions[i].b);
    console.log(questions[i].c);
    console.log(questions[i].d);
    console.log(questions[i].answer);
    console.log(questions[i].link);
}*/

var questionsAsked = []; //  this will be the questions that were already asked
var currentQuestion;

// randomizes the question asked
function pickQuestion() {
  var randomNumber = Math.floor(Math.random() * questions.length);
  if (questions.length > 0) {
    questionsAsked.push(questions[randomNumber]);
    currentQuestion = questions[randomNumber];
    questions.splice(randomNumber, 1);
  } else {
    console.log("array is empty, no more questions to ask");
    gameRunning = false;
  }
}

$("#another-button").on("click", function() {
  pickQuestion();
});

//  Variables
var correctAnswers;
var incorrectAnswers;
var timer = 30;
var gameRunning = false;
var showQuestion;
var showAnswer;
var usedQuestions = [];

//  Functions

function initialize() {
  gameRunning = true;
  correctAnswers = 0;
  incorrectAnswers = 0;
}

function startTimer() {
  //  Show the Timed Out screen after 30 seconds
  showQuestion = setInterval(nextQuestion, 5000);
}

//  Maybe should be called show next question..  automatically chooses a next question
function nextQuestion() {
    clearQArea();
  pickQuestion();
  var questionHTML = $("<h1>");
  questionHTML.text(currentQuestion.question);
  $(".question-area").append(questionHTML);
  showAnswer = setTimeout(showTimeOut, 2000);
}

function clearQArea () {
    $(".question-area").empty();

}

function stopInterval () {
    clearInterval(showQuestion);

}

function showCongrats() {}

function showTimeOut() {
  //  Increment the incorrect answers by one and show a screen that shows the correct answer
  clearQArea();
  var test = $("<h1>");
  var a = currentQuestion.answer;
  test.text(currentQuestion.a);
  $(".question-area").append(test);
  //  set another time out to show next question
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



*/
