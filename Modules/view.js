"use strict";
import { objState } from "./parser.js";
/*
Created 07/11/2024 By Roger Williams

view module handles visual changes such as:

- show intro
- show level

*/
import { aryRooms } from "./rooms.js";
import { audPlayMain } from "./controller.js";

//local
let intCurRoom = 1;
//sound
const audPlayAgain = new Audio(
  document.getElementById("sndPlayAgain").getAttribute("src")
);

const audPlayYouLose = new Audio(
  document.getElementById("sndYouLose").getAttribute("src")
);

const audPlayYouWin = new Audio(
  document.getElementById("sndYouWin").getAttribute("src")
);

const stopAudio = function () {
  //stops all audio play
  audPlayAgain.pause();
  //reset to start
  audPlayAgain.currentTime = 0;
  audPlayMain.pause();
  audPlayMain.currentTime = 0;
  audPlayYouLose.pause();
  audPlayYouLose.currentTime = 0;
  audPlayYouWin.pause();
  audPlayYouWin.currentTime = 0;
};

//rog's patented delay routine :)
const sleep = function (milliseconds) {
  let curDate = new Date();
  //get current time
  let startTime = curDate.getTime();
  //set both times to match
  let curTime = startTime;

  while (curTime - startTime <= milliseconds) {
    curDate = new Date();
    curTime = curDate.getTime();
    //   console.log(startTime + ` : ` + curTime);
  }
};

//exports
export let objCurRoom = aryRooms[intCurRoom];

export const hideBeforePlay = function () {
  //prepare screen on first run
  //
  document.getElementById("introScr1").style.display = "none";
  document.getElementById("introScr2").style.display = "none";

  //hide text box and "label"
  document.getElementById("lblCommand").style.display = "none";
  document.getElementById("txtCommand").style.display = "none";

  //hide start button
  document.getElementById("btnStart").hidden = true;

  //hide room
  document.getElementById("gameRoom").hidden = true;
  //hide play again
  document.getElementById("playAgainScr").hidden = true;
};

export const showForPlay = function () {
  //prepare screen on first run
  //hide intro screens
  document.getElementById("introScr1").style.display = "none";
  document.getElementById("introScr2").style.display = "none";

  //show text box and "label"
  document.getElementById("lblCommand").style.display = "inline";
  document.getElementById("txtCommand").style.display = "inline";
  document.getElementById("txtCommand").focus();
};

export const showStartButton = function () {
  //show start button
  document.getElementById("btnStart").hidden = false;
};

export const showRoom = function () {
  //  const objCurRoom = aryRooms[intCurRoom];
  let strTemp = "";
  //get room text
  for (let intNum = 1; intNum != 21; intNum++) {
    strTemp = strTemp + objCurRoom[`line` + intNum] + `\n`;
  }
  //show room text
  document.getElementById("gameRoom").innerText = strTemp;
  document.getElementById("gameRoom").hidden = false;
  //clear text box
  document.getElementById("txtCommand").value = "";
};

export const setRoom = function (intRoom) {
  let intIndex = 0;

  switch (objState.strDirection) {
    case "south": {
      intIndex = aryRooms.findIndex((objTemp) => {
        return objTemp.room === intRoom;
      });
      objCurRoom = aryRooms[intIndex];
      break;
    }
    case "north": {
      intIndex = aryRooms.findIndex((objTemp) => {
        return objTemp.room === intRoom;
      });
      objCurRoom = aryRooms[intIndex];
      break;
    }
    case "east": {
      intIndex = aryRooms.findIndex((objTemp) => {
        return objTemp.room === intRoom;
      });
      objCurRoom = aryRooms[intIndex];
      break;
    }
    case "west": {
      intIndex = aryRooms.findIndex((objTemp) => {
        return objTemp.room === intRoom;
      });
      objCurRoom = aryRooms[intIndex];
      break;
    }

    //  objCurRoom = aryRooms[intRoom];
  }
  intCurRoom = intRoom;
  showRoom();
};

export const showplayAgain = function () {
  //stop all music
  stopAudio();
  //hide win/lose screens
  document.getElementById("loseScr").hidden = true;
  document.getElementById("winScr").hidden = true;
  //show play again screen
  document.getElementById("playAgainScr").hidden = false;
  //play background music asynchronously
  audPlayAgain.play().async;
  //show play again screwn
  document.getElementById("txtCommand").hidden = false;
  document.getElementById("txtCommand").focus();
};

export const showIntro = function () {
  //used to flash colours of intro text

  const aryColours = [
    "darkblue",
    "green",
    "yellow",
    "red",
    "black",
    "purple",
    "white",
  ];

  let intNum = 0;
  let intNum2 = 0;
  let intScr = 1;
  //stop all music
  stopAudio();

  //hide everything
  hideBeforePlay();
  //get first screen element
  const elintroScr1 = document.getElementById("introScr1");
  //get second screen element
  const elintroScr2 = document.getElementById("introScr2");

  //flash first screen
  elintroScr1.style.display = "inline";

  const loopIntro = window.setInterval(() => {
    if (intScr === 1) elintroScr1.style.color = aryColours[intNum];
    if (intScr === 2) elintroScr2.style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    if (intNum2 === 20) {
      intScr = 2;
      elintroScr1.style.display = "none";
      elintroScr2.style.display = "inline";
    }

    if (intNum2 === 41) {
      clearInterval(loopIntro);
      showStartButton();
    }

    intNum++;
    intNum2++;
  }, 800);
};

export const exitGame = function () {
  //used to flash colours of intro text

  const aryColours = [
    "darkblue",
    "green",
    "yellow",
    "red",
    "black",
    "purple",
    "pink",
    "brown",
    "white",
  ];

  //user exits game

  //stop all sound
  stopAudio();

  //hide everything
  hideBeforePlay();
  //show exit screen
  document.getElementById("exitScr").hidden = false;
  //flash colours

  let intNum = 0;
  let intNum2 = 0;

  const loopExit = window.setInterval(() => {
    document.getElementById("exitScr").style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    if (intNum2 === 36) {
      clearInterval(loopExit);
    }

    intNum++;
    intNum2++;
  }, 800);
};

export const showWin = function () {
  //used to flash colours of intro text

  const aryColours = [
    "darkblue",
    "green",
    "yellow",
    "red",
    "purple",
    "pink",
    "white",
  ];

  //user wins game

  //stop all music
  stopAudio();

  //play win tune
  audPlayYouWin.play().async;
  //hide everything
  hideBeforePlay();
  //show exit screen
  document.getElementById("winScr").hidden = false;
  //flash colours

  let intNum = 0;
  let intNum2 = 0;

  const loopExit = window.setInterval(() => {
    document.getElementById("winScr").style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      if (intNum === aryColours.length) {
        intNum = 0;
        intNum = 0;
      }
    }

    if (intNum2 === 41) {
      if (intNum2 === 41) {
        clearInterval(loopExit);
        showplayAgain();
      }
    }

    intNum++;
    intNum++;
    intNum2++;
    intNum2++;
  }, 800);
};

export const showLose = function () {
  //used to flash colours of intro text

  const aryColours = [
    "darkblue",
    "yellow",
    "black",
    "purple",
    "darkgreen",
    "brown",
    "white",
  ];

  //user loses game
  let intNum = 0;
  let intNum2 = 0;

  //delay so player can see last room text
  sleep(10000); // pause for 10 seconds
  //stop all music
  stopAudio();
  //play lose tune
  audPlayYouLose.play().async;
  //hide room
  document.getElementById("gameRoom").hidden = true;
  //show exit screen
  document.getElementById("loseScr").hidden = false;
  //flash colours

  const loopExit = window.setInterval(() => {
    document.getElementById("loseScr").style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    if (intNum2 === 41) {
      clearInterval(loopExit);
      showplayAgain();
    }

    intNum++;
    intNum2++;
  }, 800);
};
