const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const theCount = document.querySelector(".wpm");
const OrigIncorrectWords = document.querySelector(".incorrectWords");

var timerRunning = false;
var timer = [0, 0, 0, 0];
var interval;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
} // END FUNCTION LEADING ZERO


// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
  return timer[1];
} // END FUNCTION RUN TIMER

//Count the number of words
function wordCount() {
  var numWords = 0; //If made a global variable it alters the count -- Do not move scope
  let wordsPerMinute;
  let textEntered = testArea.value;
  textEntered = textEntered.replace(/\s/g, "_"); //Replaces Spaces with underscores

  for (var i = 0; i <= originText.length; i++) {
    if (textEntered[i] === "_") {
      // console.log(textEntered[i]);
      numWords++;
    }
    if (textEntered[i] === "_" && textEntered[i - 1] === "_") {
      // console.log("repeat");
      numWords--;
    }
    if (textEntered.length <= 0) {
      reset();
    }
    //when WPM is over restrict more content
    if (textEntered.length == originText.length) {
      testArea.setAttribute("maxlength", originText.length);
    }
  }
  //Filters NaN + Infinity from being displayed onto the screen.
  wordsPerMinute = Math.round((numWords / Math.round(runTimer())) * 60);
  if (!isFinite(wordsPerMinute)) {
    theCount.innerHTML = "WPM: 0";
  } else {
    theCount.innerHTML = "WPM: " + wordsPerMinute;
  }
  console.log(wordsPerMinute);
} // END FUNCTION WORDCOUNT


// Match the text entered with the provided text on the page:
function spellCheck() {
  let incorrectWords = 0;
  let textEntered = testArea.value;
  let originalMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) // If correct.
  {
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  } else { // Live color changign while typing
    for (let i = 0; i < textEntered.length; i++) {
      if (textEntered[i] == originalMatch[i]) {
        testWrapper.style.borderColor = "blue";
      } else {
        incorrectWords++;
        testWrapper.style.borderColor = "red";
      }
      if (textEntered.length <= 0) {
        reset();
      }
    }
  }
} // END FUNCTION SPELLCHECK


// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;

  if (textEnteredLength === 0 && !timerRunning) {
    timeRunning = true;
    interval = setInterval(runTimer, 10);
  }
} //END FUNCTION START


// Reset everything:
function reset() {
  timeRunning = false;
  clearInterval(interval); //Resets Interval
  interval = null; //Makes sure interval = 0 when start
  timer = [0, 0, 0, 0]; //Reset clock

  //The following resets visual aspect of test.
  testWrapper.style.borderColor = "#3DC7BE";
  theTimer.innerHTML = "00:00:00";
  testArea.value = "";
} //END FUNCTION RESET


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keyup", wordCount, false);
resetButton.addEventListener("click", reset, false);
