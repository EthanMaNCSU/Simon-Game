var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(level>0){
      userClickedPattern.push(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).keydown(function() {
  if (level == 0) {
    nextSequence();
  }
});

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var chosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(chosenColor);
  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  } else if (currentLevel == gamePattern.length - 1) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // $("#"+currentColour).addClass("pressed");
  // setTimeout(function(){
  //   $("#"+currentColour).removeClass("pressed");
  // }, 100);
  $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
