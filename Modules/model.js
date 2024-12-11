"use strict";
/*
Created 07/11/2024 By Roger Williams

model module handles:

- events
- data validation
- form actions
- other function that do not affect anything visually

*/
import { funcMainGame, funcStartGame } from "./controller.js";
import {
  funcExitGame,
  objCurRoom,
  funcSetRoom,
  funcShowRoom,
  funcShowForPlay,
  funcShowLose,
  funcShowWin,
} from "./view.js";
import { objState, funcHelp_List, funcParseText } from "./parser.js";

//local
const btnStart = document.getElementById("btnStart");
const btnHelp = document.getElementById("btnHelp");
const txtCommand = document.getElementById("txtCommand");
const scrPlayAgain = document.getElementById("scr--playAgainScr");

const funcHandlePlayAgain = (strYesNo) => {
  //used ONLY by play again routine
  if (strYesNo === "y") {
    funcStartGame();
  } else {
    //show exit screen
    funcExitGame();
  }
};

const funcStartButtonClick = () => {
  //start button click handler
  //hide button
  btnStart.hidden = true;
  //wait till intro over
  funcShowForPlay();
  //start main game loop
  funcMainGame();
};

const funcHelpButtonClick = () => {
  //start button click handler
  funcHelp_List();
};

//exports
export const audPlayAgain = new Audio(
  document.getElementById("sndPlayAgain").getAttribute("src")
);

export const audPlayYouLose = new Audio(
  document.getElementById("sndYouLose").getAttribute("src")
);

export const audPlayYouWin = new Audio(
  document.getElementById("sndYouWin").getAttribute("src")
);

export const audPlayMain = new Audio(
  document.getElementById("sndMain").getAttribute("src")
);

//rog's patented delay routine :)
export const funcSleep = (milliseconds) => {
  let curDate = new Date();
  //get current time
  let startTime = curDate.getTime();
  //set both times to match
  let curTime = startTime;

  while (curTime - startTime <= milliseconds) {
    curDate = new Date();
    curTime = curDate.getTime();
  }
};

export const funcInitMusic = () => {
  audPlayMain.onended = () => {
    //set to start of file
    this.currentTime = 0;
    //play again!
    this.play().async;
  }; //,
  // false //set default of ended event to false
  //  }
  // )
  //play background music asynchronously
  audPlayMain.play().async;
};

export const funcInitTextBox = () => {
  //below used for save/load
  let objTemp;
  let strTemp = "";
  let intNum = 0;

  //configure command textbox and label
  //create event handler for text input
  txtCommand.addEventListener("keydown", (key) => {
    if (key.key === `Enter`) {
      //process command
      switch (txtCommand.value.toLowerCase()) {
        case "resume":
          objState.blnIsOk = true;
          funcShowRoom();
          break;
        case "load":
          strTemp = window.localStorage.getItem("RogTextAdventureRoom");

          if (strTemp.length !== 0) {
            objState.blnIsOk = true;
            objState.strSavedLoaded = "loaded";
            //convert string to object
            objTemp = JSON.parse(strTemp);
            //populate objCurRoom with it
            objCurRoom.room = objTemp.room;
            objCurRoom.east = objTemp.east;
            objCurRoom.west = objTemp.west;
            objCurRoom.north = objTemp.north;
            objCurRoom.south = objTemp.south;

            for (let intNum = 1; intNum != 21; intNum++) {
              objCurRoom[`line` + intNum] = objTemp[`line` + intNum];
            }

            //show loaded message
            alert("Game Loaded!");
            //goto loaded room
            funcSetRoom(objCurRoom.room);
            break;
          }
        case "save":
          //convert objCurRoom to JSON string
          strTemp = JSON.stringify(objCurRoom);
          window.localStorage.setItem("RogTextAdventureRoom", strTemp);
          objState.blnIsOk = true;
          objState.strSavedLoaded = "saved";
          //show loaded message
          alert("Game Saved!");
          //reset command text
          break;
        case "y":
          //if play again screen shown
          if (scrPlayAgain.hidden === false) {
            //process request
            funcHandlePlayAgain(txtCommand.value.toLowerCase());
            break;
          }
        case "n":
          //if play again screen shown
          if (scrPlayAgain.hidden === false) {
            //process request
            funcHandlePlayAgain(txtCommand.value.toLowerCase());
            break;
          }

        default:
          funcParseText(txtCommand.value.toLowerCase());
      }

      //check state
      if (objState.blnIsOk) {
        //check for exit
        if (objState.strExit.length != 0) {
          funcExitGame();
          return;
        }

        if (objState.strSavedLoaded.length === 0) {
          if (objState.strDirection.length != 0) {
            //check valid direction
            switch (objState.strDirection) {
              case "north":
                if (objCurRoom.north != 0) funcSetRoom(objCurRoom.north);
                break;
              case "south":
                if (objCurRoom.south != 0) funcSetRoom(objCurRoom.south);
                break;
              case "east":
                if (objCurRoom.east != 0) funcSetRoom(objCurRoom.east);
                break;
              case "west":
                if (objCurRoom.west != 0) funcSetRoom(objCurRoom.west);
                break;
            }
          } else {
            //if not exiting show error as this test version
            //only support movement directions!""
            if (
              objState.strExit.length === 0 &&
              objState.strHelp.length === 0
            ) {
              alert(`Unrecognised Command!`);
            }
            // //check for end of game
            // if (objCurRoom.win === true) {
            //   objCurRoom.win = false; //reset to avoid loop!
            //   funcShowWin();
            //   return;
            // }
            //   if (objCurRoom.lose === true) {
            //     objCurRoom.lose = false; //reset to avoid loop!
            //     //   //delay so player can see last room text
            //     funcSleep(10000); // pause for 10 seconds
            //     funcShowLose();
            //     return;
            //   }
            // } else {
          }
        }
      }
    }
  });

  //test for end of game
  txtCommand.addEventListener("input", () => {
    if (objCurRoom.lose === true) {
      objCurRoom.lose = false; //reset to avoid loop!
      //   //delay so player can see last room text
      funcSleep(10000); // pause for 10 seconds
      funcShowLose();
      return;
    }
    if (objCurRoom.win === true) {
      objCurRoom.win = false; //reset to avoid loop!
      funcSleep(10000); // pause for 10 seconds
      funcShowWin();
      return;
    }
  });
};

export const funcInitStartButton = () => {
  //creates click handler
  btnStart.addEventListener("click", funcStartButtonClick);
};

export const funcInitHelpButton = () => {
  //creates click handler
  btnHelp.addEventListener("click", funcHelpButtonClick);
};
//get background music object src
// const audPlay = new Audio(
//   document.getElementById("sndBackground").getAttribute("src")
//  );

//add event so background music loops
//  audPlay.addEventListener(
//   "ended",
//   () => {
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
