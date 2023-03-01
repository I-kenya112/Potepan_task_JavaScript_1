$(document).ready(function() {

  let currentTime = 0;
  let elapsedTime = 0;
  let clickStart = 0;
  let timeOut = undefined;

  function runningTimer() {
    currentTime = Date.now();
    showTimer();
    timeOut = setTimeout(() => {
      runningTimer();
    },10)
  }

  function showTimer() {
    let nowTimer = new Date(currentTime - clickStart + elapsedTime);
    const getHour = String(nowTimer.getHours()-9).padStart(2,'0');
    const getMin = String(nowTimer.getMinutes()).padStart(2,'0');
    const getSec = String(nowTimer.getSeconds()).padStart(2,'0');
    const getMilSec = Math.floor(nowTimer.getMilliseconds() / 10);
    $("#timer").text(`${getHour}:${getMin}:${getSec}:${String(getMilSec).padStart(2,'0')}`);
  }

  function classClickStart() {
    $("#start").addClass("btn-disabled");
    $("#stop").removeClass("btn-disabled");
    $("#reset").addClass("btn-disabled");
  }

  function classClickStop() {
    $("#start").removeClass("btn-disabled");
    $("#stop").addClass("btn-disabled");
    $("#reset").removeClass("btn-disabled");
  }

  function classClickReset() {
    $("#start").removeClass("btn-disabled");
    $("#stop").addClass("btn-disabled");
    $("#reset").addClass("btn-disabled");
  }

  $("#start").click(function() {
    if($(this).hasClass("btn-disabled")){
      return;
    }
    classClickStart();
    clickStart = Date.now();
    runningTimer();
  });

  $("#stop").click(function() {
    if($(this).hasClass("btn-disabled")){
      return;
    }
    classClickStop();
    elapsedTime += currentTime - clickStart;
    clearTimeout(timeOut);
  });

  $("#reset").click(function() {
    if($(this).hasClass("btn-disabled")){
      return;
    }
    classClickReset();
    clearTimeout(timeOut);
    elapsedTime = 0;
    $("#timer").text("00:00:00:00");
  });


});