//  Array of Questions with answers
var questions = [
    { 
        "question": "What color is the sky?",
        "a" : "Red",
        "b" : "Green",
        "c" : "Blue",
        "d" : "Orange",
        "answer" : "d",
        "link" : "somelink.com"
    },
    { 
        "question": "How many fingers does a human person have?",
        "a" : "11",
        "b" : "2",
        "c" : "3",
        "d" : "5",
        "answer" : "d",
        "link" : "somelink.com"
    },
    { 
        "question": "What is the temperature on Mars?",
        "a" : "110C",
        "b" : "42C",
        "c" : "3C",
        "d" : "I haven't an effin clue!",
        "answer" : "d",
        "link" : "somelink.com"
    },
    { 
        "question": "What does the fox say?",
        "a" : "EEEE EEE EEEE EEEE EEEE EEEE",
        "b" : "CHUM CHUM CHUM CHUM CHUM CHUM",
        "c" : "I forget.",
        "d" : "yakayakayakayaka",
        "answer" : "c",
        "link" : "somelink.com"
    },
    { 
        "question": "How much wood could a woodchuck chuck if a woodchuck could chuck wood",
        "a" : "632",
        "b" : "infinity",
        "c" : "85858",
        "d" : "x^7",
        "answer" : "b",
        "link" : "somelink.com"
    }

];

for ( var i = 0; i < questions.length; i++){
    console.log(questions[i].question);
    console.log(questions[i].a);
    console.log(questions[i].b);
    console.log(questions[i].c);
    console.log(questions[i].d);
    console.log(questions[i].answer);
    console.log(questions[i].link);
}

//  Variables
var correctAnswers;
var incorrectAnswers;
var timer = 30;
var gameRunning = false;
var showQuestion;
var usedQuestions = [];

//  Functions

function initialize () {
    gameRunning = true;
    correctAnswers = 0;
    incorrectAnswers = 0;


}

function chooseQuestion () {}

function startTimer () {
    //  Show the Timed Out screen after 30 seconds
    showQuestion = setTimeout(showTimeOut, 3000);
}

function showQuestion () {
    var question = $("<h1>");
    question.text(questions[0].question);
    $(".question-area").append(question);
}

function showAnswer () {}

function showCongrats () {}

function showTimeOut () {
    //  Increment the incorrect answers by one and show a screen that shows the correct answer
    console.log("test");

    $(".question-area").empty();
    var test = $("<h1>");
    test.text("some generic text");
    $(".question-area").append(test);
    
}

$(document).ready(function () {

    $("#start-game").on("click", function() {
        $("#start-game").remove();
        initialize();
        showQuestion();
        startTimer();
        

    });

    $(".selected-answer").on("click", function() {
        if ( selectedAnswer === answer ){
            //showCongrats();
        } else {
            //greySelection();
        }

    })







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