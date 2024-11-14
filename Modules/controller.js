"use strict";
//import "code-js";
//import "regenerator-runtime";

import { initTextBox, initStartButton } from "./model.js";
import { showIntro, showRoom, showLose } from "./view.js";

export const audPlayMain = new Audio(
  document.getElementById("sndMain").getAttribute("src")
);

export const mainGame = function () {
  //add event so background music loops
  audPlayMain.addEventListener(
    "ended",
    function () {
      //set to start of file
      this.currentTime = 0;
      //play again!
      this.play().async;
    },
    false //set default of ended event to false
  );

  //play background music asynchronously
  audPlayMain.play().async;
  //main game loop
  showRoom();
  //create textbox keypress handler
  initTextBox();
};

export const startGame = function () {
  //set events
  initStartButton();

  //show intro and start game
  showIntro();
  //showLose();
};

//start
startGame();
