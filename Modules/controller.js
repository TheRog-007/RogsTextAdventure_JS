"use strict";
//import "code-js";
//import "regenerator-runtime";

import {
  funcInitTextBox,
  funcInitHelpButton,
  funcInitMusic,
  funcInitStartButton,
} from "./model.js";
import { funcShowIntro, funcShowRoom } from "./view.js";

export const audPlayMain = new Audio(
  document.getElementById("sndMain").getAttribute("src")
);

export const funcMainGame = () => {
  //add event so background music loops
  funcInitMusic();

  // audPlayMain.addEventListener(
  //   "ended",
  //   () => {
  //     //set to start of file
  //     this.currentTime = 0;
  //     //play again!
  //     this.play().async;
  //   },
  //   false //set default of ended event to false
  // );

  // //play background music asynchronously
  // audPlayMain.play().async;
  funcShowRoom();

  //main game loop
  //create textbox keypress handler
  funcInitTextBox();
};

export const funcStartGame = () => {
  //set events
  funcInitStartButton();
  funcInitHelpButton();
  //show intro and start game
  funcShowIntro();
};

//start
funcStartGame();
