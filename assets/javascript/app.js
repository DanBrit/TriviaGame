// global variables

var gameLength=10;
var answerTimer=3;
var questionLength= 10;
var library;
var timeToGuess;
var timer;
var currentQuestion;
var numberRight;
var numberWrong;

//function to display intro

function initGame() {
	$("#qText").html('Welcome to my James Bond Trivia Game <button id="startGame">Begin Game</button>')
	$("#result").hide();
	$("#choices").hide();
	$("#choices li").empty();
	$(".scoreBoard").empty();
	$("#choices .answer").off().on("click", makeGuess);
	$("#startGame").off().on("click", newQuestion);
	numberWrong=0;
	numberRight=0;
	library= questionLibrary.slice();
	timeToGuess= questionLength;
	gameLength= library.length;
}

//new question function

function newQuestion (){
	if (numberRight+numberWrong >= gameLength) {
			gameOver ();
	} else {
		var questionNumber = Math.floor(Math.random()* library.length);
		currentQuestion= library[questionNumber];
		library.splice (questionNumber, 1);
		resetTimer();
		$("#result").empty().hide();
		$("#qText").html(currentQuestion.question);
		$("#choices").show().find(".answer").each(function(i){
				$(this).html(currentQuestion.answers[i]);
		});

	}
}

//make guess function

function makeGuess () {
	if ($(this).data("choice") == currentQuestion.correctAnswer){
			numberRight ++;
			showResult("Correct!", "correctResult");
		} else {
			numberWrong ++;
			showResult ("Wrong. The correct answer was " + currentQuestion.answers [currentQuestion.correctAnswer], "wrongResult");
		}

}


//showresults function
function showResult (msg, addThisClass) {
	resetTimer ();
	$("#result")
		.html(msg)
		.show()
		.removeClass()
		.addClass(addThisClass);
	setTimeout (newQuestion, answerLength * 1000);
	$("#score").html("correct:" + numberRight + "<br> incorrect:"+ numberWrong);
		
}

//show timer
function showTimer(){
	if (timeToGuess >= 0){
		$("#timer").html(timeToGuess + " seconds left");
		timeToGuess --;
	} else {
		timesUp();
	}
}
function timesUp(){
	numberWrong ++;
	resetTimer();
	showResult("Time's Up! The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer], "timesUp");
}
function resetTimer(){
	clearInterval(timer);
	timeToGuess = questionLength;
	$("#timer").empty();
}
function gameOver(){
	$("body").css("background-image", 'url("../assets/images/background.png")');
	var score = (numberRight/gameLength);
	var praise = "You Fail.";
	if (score > .9){
		praise = "Amazing! You achieved your 007 rank.";

	}
	$("#result").removeClass().html("<h1>Game Over</h1><div class='gameOverText'>You got " + numberRight + " questions right and " + numberWrong + " wrong. " + praise + "</div><button id='newGame'>Play Again</button>");
	$("#newGame").on("click", initGame);
}
$(document).ready(initGame);


//times up

// reset timer

//game over function