"use strict";
/*
Created 07/11/2024 By Roger Williams

Main module that orchestrates actions and is the main game loop

*/
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
