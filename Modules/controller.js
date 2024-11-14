"use strict";
//import "code-js";
//import "regenerator-runtime";

import { initTextBox, initStartButton } from "./model.js";
import { showIntro, showRoom, showLose } from "./view.js";

//exports
export const mainGame = function () {
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
