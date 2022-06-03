var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


function nextSequence() {
    //randomly choosing a button
    //taking a random value from 0 - 3
    var randomNumber = Math.round(Math.random() * 3);

    //picking the corresponding color from buttonColors array
    var randomChosenColor = buttonColors[randomNumber];

    //sending random value to the game pattern array
    gamePattern.push(randomChosenColor);

    //change title
    level++;
    $("#level-title").text("Level " + level);

    //button animation
    animatePress(randomChosenColor);

    //audio play
    playSound(randomChosenColor);
}

$(".btn").on("click", function() {
    //grabbing id/color of pressed button
    var userChosenColor = $(this).attr("id");

    //sending pressed button's value to userClickedButton array
    userClickedPattern.push(userChosenColor);

    //button animation
    animatePress(userChosenColor);

    //audio play
    playSound(userChosenColor);

    //Checks the answer against the game pattern
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    //Checks the user pattern against the game pattern to discern if the player picked the correct button
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //Checks if the round is over by comparing the length of both the user pattern and game pattern if they are the same, the next round will begin
        if (userClickedPattern.length === gamePattern.length) {
            //Empties the user pattern
            userClickedPattern = [];
            //Begins the next round by calling nextSequence(), there is also a delay to make the transition to the next round smoother
            setTimeout(() => { nextSequence(); }, 1000);
        }
    } else {
        //Plays the animation and sound that shows the player that they've failed...
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over"); }, 200);
        
        //Resets the variables and arrays
        startOver()
    }
}

function playSound(colorValue) {
    //picking the value of pressed/randomly chosen button and playing the corresponding sound
    var audio = new Audio("sounds/" + colorValue + ".mp3");
    audio.play();
}

function animatePress(colorValue) {
    //picking the value of pressed/randomly chosen button and showing the animation at the corresponding place
    $("." + colorValue).addClass("pressed");
    setTimeout(() => { $("." + colorValue).removeClass("pressed"); }, 100);
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}

//start game
$(document).keydown(function() {
    if (started === false) {
        started = true;
        nextSequence();
    }
});
/*

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

*/