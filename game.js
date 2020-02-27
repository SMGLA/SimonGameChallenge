var buttonColours = ["red", "blue", "green", "yellow"]; // Index: red-0, blue-1, green-2, yellow-3
var gamePattern = []; // Storing generated sequence
var userClickedPattern = []; // Storing clicked sequence by the user
var started = false; // Checking if it's the first round of the game
var level = 0; // The game starts from level 0 and increases until it ends

$(document).keypress(function() {
  if (!started) {  // If "not (!)" started - If the var "started" is NOT "false"
  $("#level-title").text("Level " + level); // Shows the level
  nextSequence(); // Call nextSequence
  started = true; // Change var "started" to "true"
}
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
    if (userClickedPattern.length === gamePattern.length) { // If the answer is correct, call nextSequence
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else { // If the answer is wrong
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
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

function playSound(name) { // Playing sound corresponding to each button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() { // Resets the game
  level = 0;
  gamePattern = [];
  started = false;
}
