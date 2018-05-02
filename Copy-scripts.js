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

function clock() {

  leadingZero: function(time) {
    if (time <= 9) {
      time = "0" + time;
    }
    return time;
  } // END FUNCTION LEADING ZERO

  // Run a standard minute/second/hundredths timer:
  runTimer: function() {
    currentTime = clock.leadingZero(timer[0]) + ":" + clock.leadingZero(timer[1]) + ":" + clock.leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

    clock.currentTime = currentTime;
  } // END FUNCTION RUN TIMER

}
