"use strict";
/*
Created 07/11/2024 By Roger Williams

view module handles visual changes such as:

- show intro
- show level

*/
import { aryRooms } from "./rooms.js";
import {
  audPlayAgain,
  audPlayMain,
  audPlayYouLose,
  audPlayYouWin,
  funcSleep,
} from "./model.js";
//import { audPlayMain } from "./controller.js";

//local
let intCurRoom = 1;

//document elements vars
const txtCommand = document.getElementById("txtCommand");
const lblCommand = document.getElementById("lblCommand");
const btnHelp = document.getElementById("btnHelp");
const btnStart = document.getElementById("btnStart");
const scrExit = document.getElementById("scr--exitScr");
const scrLose = document.getElementById("scr--loseScr");
const scrWin = document.getElementById("scr--winScr");
const scrGameRoom = document.getElementById("scr--gameRoom");
const scrIntro1 = document.getElementById("scr--introScr1");
const scrIntro2 = document.getElementById("scr--introScr2");
const scrPlayAgain = document.getElementById("scr--playAgainScr");

//functions
const funcStopAudio = () => {
  //stops all audio play
  try {
    audPlayMain.pause();
    audPlayAgain.pause();
    audPlayYouLose.pause();
    audPlayYouWin.pause();

    audPlayMain.currentTime = 0;
    audPlayAgain.currentTime = 0;
    audPlayYouLose.currentTime = 0;
    audPlayYouWin.currentTime = 0;
  } catch (ex) {
    console.log(ex.error);
  }
};

//exports
export let objCurRoom = new Object();

export const funcHideBeforePlay = () => {
  //prepare screen on first run
  //
  scrIntro1.style.display = "none";
  scrIntro2.style.display = "none";

  //hide text box and "label"
  lblCommand.style.display = "none";
  txtCommand.style.display = "none";

  //hide start button
  btnStart.hidden = true;

  //hide room
  scrGameRoom.hidden = true;
  //hide play again
  scrPlayAgain.hidden = true;
  //hide help button
  btnHelp.hidden = true;
};

export const funcShowForPlay = () => {
  //prepare screen on first run
  //hide intro screens
  scrIntro1.style.display = "none";
  scrIntro2.style.display = "none";

  //show text box and "label"
  lblCommand.style.display = "inline";
  txtCommand.style.display = "inline";
  txtCommand.focus();
  btnHelp.hidden = false;
};

export const funcShowRoom = () => {
  let strTemp = "";
  //get room text
  for (let intNum = 1; intNum != 21; intNum++) {
    strTemp = strTemp + objCurRoom[`line` + intNum] + `\n`;
  }
  //show room text
  scrGameRoom.innerText = strTemp;
  scrGameRoom.hidden = false;
  //clear text box
  txtCommand.value = "";
};

export const funcSetRoom = (intRoom) => {
  let intIndex = 0;

  intIndex = aryRooms.findIndex((objTemp) => {
    return objTemp.room === intRoom;
  });

  objCurRoom = Object.create(aryRooms[intIndex]);
  intCurRoom = intRoom;
  funcShowRoom();
};

export const funcShowplayAgain = () => {
  //stop all music
  funcStopAudio();
  //hide win/lose screens
  scrLose.hidden = true;
  scrWin.hidden = true;
  //show play again screen
  scrPlayAgain.hidden = false;
  //play background music asynchronously
  audPlayAgain.play().async;
  //show play again screwn
  //show text box and "label"
  lblCommand.style.display = "inline";
  txtCommand.style.display = "inline";
  txtCommand.focus();
  btnHelp.hidden = true;
};

export const funcShowIntro = () => {
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
  funcStopAudio();

  //hide everything
  funcHideBeforePlay();

  //flash first screen
  scrIntro1.style.display = "inline";

  const loopIntro = window.setInterval(() => {
    if (intScr === 1) scrIntro1.style.color = aryColours[intNum];
    if (intScr === 2) scrIntro2.style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    if (intNum2 === 20) {
      intScr = 2;
      scrIntro1.style.display = "none";
      scrIntro2.style.display = "inline";
    }

    if (intNum2 === 41) {
      clearInterval(loopIntro);
      btnStart.hidden = false;
    }

    intNum++;
    intNum2++;
  }, 800);
};

export const funcExitGame = () => {
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
  funcStopAudio();
  //hide everything
  funcHideBeforePlay();
  //hide help button
  btnHelp.hidden = true;
  //show exit screen
  scrExit.hidden = false;

  //flash colours
  let intNum = 0;
  let intNum2 = 0;

  const loopExit = window.setInterval(() => {
    scrExit.style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    if (intNum2 === 36) {
      clearInterval(loopExit);
      window.close();
    }

    intNum++;
    intNum2++;
  }, 800);
};

export const funcShowWin = () => {
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
  funcStopAudio();

  //play win tune
  audPlayYouWin.play().async;
  //hide everything
  funcHideBeforePlay();
  //hide help button
  btnHelp.hidden = true;
  //show exit screen
  scrWin.hidden = false;

  //flash colours
  let intNum = 0;
  let intNum2 = 0;

  const loopExit = window.setInterval(() => {
    scrWin.style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      if (intNum === aryColours.length) {
        intNum = 0;
        intNum = 0;
      }
    }

    if (intNum2 === 41) {
      if (intNum2 === 41) {
        clearInterval(loopExit);
        funcShowplayAgain();
      }
    }

    intNum++;
    intNum++;
    intNum2++;
    intNum2++;
  }, 800);
};

export const funcShowLose = () => {
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

  // //delay so player can see last room text
  //funcSleep(10000); // pause for 10 seconds
  //stop all music
  funcStopAudio();
  //hide room
  scrGameRoom.hidden = true;
  //show exit screen
  scrLose.hidden = false;
  //hide help button
  funcHideBeforePlay();
  //flash colours
  const loopExit = window.setInterval(() => {
    scrLose.style.color = aryColours[intNum];

    if (intNum === aryColours.length) {
      intNum = 0;
    }

    // if (intNum2 === 41) {
    //   clearInterval(loopExit);
    //   funcShowplayAgain();
    // }

    intNum++;
    intNum2++;
  }, 800);

  //play lose tune
  audPlayYouLose.play();
  audPlayYouLose.onended = () => {
    //when finished playing
    clearInterval(loopExit);
    funcShowplayAgain();
  };
};
//   //hide room
//   scrGameRoom.hidden = true;
//   //show exit screen
//   scrLose.hidden = false;
//   //flash colours
//   //hide help button
//   funcHideBeforePlay();

//   const loopExit = window.setInterval(() => {
//     scrLose.style.color = aryColours[intNum];

//     if (intNum === aryColours.length) {
//       intNum = 0;
//     }

//     if (intNum2 === 41) {
//       clearInterval(loopExit);
//       funcShowplayAgain();
//     }

//     intNum++;
//     intNum2++;
//   }, 800);
// };

//set objCurRoom
objCurRoom = Object.create(aryRooms[intCurRoom]);
