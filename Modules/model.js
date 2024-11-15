"use strict";
/*
Created 07/11/2024 By Roger Williams

model module handles:

- events
- data validation
- form actions
- other function that do not affect anything visually

*/
import { mainGame, startGame } from "./controller.js";
import {
  exitGame,
  objCurRoom,
  setRoom,
  showForPlay,
  showLose,
  showWin,
} from "./view.js";
import { objState, parseText } from "./parser.js";

//local
const handlePlayAgain = function (strYesNo) {
  //used ONLY by play again routine
  if (strYesNo === "y") {
    startGame();
  } else {
    //show exit screen
    exitGame();
  }
};

//exports
export const initTextBox = function () {
  //configure command textbox and label
  const txtCmd = document.getElementById("txtCommand");
  //create event handler for text input
  txtCmd.addEventListener("keydown", function (key) {
    //get current room object

    if (key.key === `Enter`) {
      //process command
      switch (txtCmd.value.toLowerCase()) {
        case "resume":
          showRoom();
          break;
        case "y":
          //if play again screen shown
          if (document.getElementById("playAgainScr").hidden === false) {
            //process request
            handlePlayAgain(txtCmd.value.toLowerCase());
            break;
          }
        case "n":
          //if play again screen shown
          if (document.getElementById("playAgainScr").hidden === false) {
            //process request
            handlePlayAgain(txtCmd.value.toLowerCase());
            break;
          }

        default: {
          parseText(txtCmd.value.toLowerCase());
        }
      }

      //check state
      if (objState.blnIsOk) {
        //check for exit
        if (objState.strExit.length != 0) {
          exitGame();
        }

        if (objState.strDirection.length != 0) {
          //check valid direction
          switch (objState.strDirection) {
            case "north":
              if (objCurRoom.north != 0) {
                setRoom(objCurRoom.north);
                break;
              }
            case "south":
              if (objCurRoom.south != 0) {
                setRoom(objCurRoom.south);
                break;
              }
            case "east":
              if (objCurRoom.east != 0) {
                setRoom(objCurRoom.east);
                break;
              }
            case "west":
              if (objCurRoom.west != 0) {
                setRoom(objCurRoom.west);
                break;
              }
          }
        }
      } else {
        alert(`Unrecognised Command!`);
      }
    }
    //check for end of game
    if (objCurRoom.win === true) {
      objCurRoom.win = false; //reset to avoid loop!
      showWin();
    }
    if (objCurRoom.lose === true) {
      objCurRoom.lose = false; //reset to avoid loop!
      showLose();
    }
  });
};

export const initStartButton = function () {
  //creates click handler
  const btnStart = document.getElementById("btnStart");

  btnStart.addEventListener("click", function () {
    //hide button
    btnStart.hidden = true;
    //wait till intro over
    showForPlay();
    //start main game loop
    mainGame();
  });
};

//get background music object src
// const audPlay = new Audio(
//   document.getElementById("sndBackground").getAttribute("src")
//  );

//add event so background music loops
//  audPlay.addEventListener(
//   "ended",
//   function () {
//    //set to start of file
//     this.currentTime = 0;
//      //play again!
//      this.play().async;
//    },
//    false //set default of ended event to false
//  );

//play background music asynchronously
//  audPlay.play().async;
//hide start button
//  document.getElementById("btnStart").style.display = "none";
