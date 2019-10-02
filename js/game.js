window.addEventListener("load", init);

// levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// level change
var currentLevel = levels.easy;

// global variables
let time = currentLevel;
let score = 0;
var highScore = 0;
let isPlaying;

// dom elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const HighDisplay = document.querySelector("#high-score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const easyButton = document.querySelector("#ebutton");
const mediumButton = document.querySelector("#mbutton");
const hardButton = document.querySelector("#hbutton");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

// initializing game
function init() {
  showWord(words);

  seconds.innerHTML = 5;
  wordInput.addEventListener("input", startMatch);
  // calling countdown each second
  setInterval(countdown, 1000);
  // status of game
  setInterval(checkStatus, 50);
}

// choosing random word
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
    if (highScore < score) {
      highScore = score;
      $(HighDisplay).html(highScore);
    }
  }
  if (score === -1) {
    $(scoreDisplay).html(0);
  } else {
    $(scoreDisplay).html(score);
  }
}

// matching words functio
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    $(message).html('<span style="color: green;">Correct!!!</span>');
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// countdown
function countdown() {
  // making sure time does not run out
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  // displaying time
  $(timeDisplay).html(time);
}

// changing difficulty
$(easyButton).click(function() {
  currentLevel = levels.easy;
  score = -1;
  $(message)
    .html('difficulty changed to <span style="color: green;">easy</span>')
    .css("display", "none")
    .fadeIn(250);
  $(seconds).html(levels.easy);
  $(seconds).css("color", "green");
  $(timeDisplay).html(levels.easy);
  time = levels.easy;
});

$(mediumButton).click(function() {
  currentLevel = levels.medium;
  score = -1;
  $(message)
    .html('difficulty changed to <span style="color: orange;">medium</span>')
    .css("display", "none")
    .fadeIn(250);
  $(seconds).html(levels.medium);
  $(seconds).css("color", "orange");
  $(timeDisplay).html(levels.medium);
  time = levels.medium;
});

$(hardButton).click(function() {
  currentLevel = levels.hard;
  score = -1;
  $(message)
    .html('difficulty changed to <span style="color: red;">hard</span>')
    .css("display", "none")
    .fadeIn(250);
  $(seconds).html(levels.hard);
  $(seconds).css("color", "red");
  $(timeDisplay).html(levels.hard);
  time = levels.hard;
});

function checkStatus() {
  if (
    !isPlaying &&
    time === 0 &&
    message.innerHTML != "difficulty changed to easy" &&
    message.innerHTML != "difficulty changed to medium" &&
    message.innerHTML != "difficulty changed to hard" &&
    score != 0
  ) {
    $(message).html("Game over, <b>you lose!</b>");
    score = -1;
    if (wordInput.value != "") {
      message.innerHTML = "";
    }
  } else if (!isPlaying && time === 0) {
    score = -1;
  }
  if (wordInput.value != "") {
    message.innerHTML = "";
  }
}

// some jquery effects
$(document).ready(function() {
  $("#panel").click(function() {
    $("#instructions").slideToggle("slow");
  });

  $(".btn").fadeIn(1000);
  $("#current-word").fadeIn(1000);
});
