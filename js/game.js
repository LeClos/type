window.addEventListener('load', init);

// levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

// level change
var currentLevel = levels.easy;

// global variables
let time = currentLevel;
let score = 0;
var highScore = 0;
let isPlaying;

// dom elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const HighDisplay = document.querySelector('#high-score')
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const easyButton = document.querySelector('#ebutton');
const mediumButton = document.querySelector('#mbutton');
const hardButton = document.querySelector('#hbutton');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// initializing game
function init() {
  showWord(words);

  seconds.innerHTML = 5;
  wordInput.addEventListener('input', startMatch);
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
    wordInput.value = '';
    score++;
    if (highScore < score) {
      highScore = score;
      HighDisplay.innerHTML = highScore;
    }
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// matching words functio
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
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
  timeDisplay.innerHTML = time;
}

// changing difficulty
easyButton.addEventListener('click', function (event) {
  currentLevel = levels.easy;
  score = -1;
  message.innerHTML = "difficulty changed to easy";
  seconds.innerHTML = levels.easy;

});
mediumButton.addEventListener('click', function (event) {
  currentLevel = levels.medium;
  score = -1;
  message.innerHTML = "difficulty changed to medium";
  seconds.innerHTML = levels.medium;

});
hardButton.addEventListener('click', function (event) {
  currentLevel = levels.hard;
  score = -1;
  message.innerHTML = "difficulty changed to hard";
  seconds.innerHTML = levels.hard;

});

function checkStatus() {
  if (!isPlaying && time === 0 && message.innerHTML != "difficulty changed to easy" && message.innerHTML != "difficulty changed to medium" && message.innerHTML != "difficulty changed to hard" && score != 0) {
    message.innerHTML = 'Game over, you lose!';
    score = -1;
    if (wordInput.value != '') {
      message.innerHTML = '';
    }
  } else if (!isPlaying && time === 0) {
    score = -1;
  }
  if (wordInput.value != '') {
    message.innerHTML = '';
  }
}