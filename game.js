var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
  if (!started) {
  nextSequence();
  $("h1").text("Level " + level);
  started = true;
  }
})

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}
function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function(){
          nextSequence();
        }, 1000);

      }
    }
    else {
      console.log("failure");
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
  }
