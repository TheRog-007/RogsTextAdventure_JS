"use strict";
/*
  Created 11/11/2024 By Roger Williams

  Literally a translation of the C# parser class!



*/
/*
 ported from the Visual basic version!

 original comments from the Visual Basic version included 
 disabled code has been removed

*/

/* 
        'Created 23/07/2024 By Roger Williams
        '
        'What It Does
        '------------
        '
        'checks passed text to try and determine if statement valid
        '
        '- passes through all the lists
        '- checks for duplicates
        '- checka valid querry
        '- 
        '
        'e.g.:
        '
        'open door with the key
        '
        'run away
        '
        'would produce response:
        ' which direction?
        '
        'run away north
        '
        'would produce response:
        '  you ran north
        '
        'NOTE: this phase one version is only passed direction commands, BUT the infrastructure is all in place for 
               future expansion to phase two
        '
        */

//exports - vars
//holds the results of the parser
export let objState = {
  blnIsOk: false,
  strNoun: "",
  strVerb: "",
  strAdjective: "",
  strPreposition: "",
  strDirection: "",
  strExit: "",
  strSavedLoaded: "",
  strHelp: "",
};

//local vars
//'internal lists
const aryVerbs = [
  "be",
  "have",
  "do",
  "go",
  "get",
  "make",
  "know",
  "take",
  "see",
  "look",
  "give",
  "need",
  "put",
  "get",
  "let",
  "begin",
  "create",
  "start",
  "run",
  "move",
  "creep",
  "hold",
  "use",
  "include",
  "set",
  "stop",
  "allow",
  "appear",
  "destroy",
  "kill",
  "disable",
  "enable",
  "open",
  "close",
  "run",
  "talk",
  "listen",
  "walk",
  "exit", //added 13/11/2024 to handle exit as a command
  "save", //added 10/12/2024 to handle save command
  "save", //added 10/12/2024 to handle load command
];
const aryNouns = [
  "my",
  "you",
  "them",
  "they",
  "him",
  "she",
  "me",
  "their",
  "knife",
  "apple",
  "bread",
  "sword",
  "dragon",
  "knight",
  "key",
  "plate",
  "candle",
  "matches",
  "door",
];
const aryAdjectives = [
  "new",
  "old",
  "box",
  "first",
  "last",
  "current",
  "low",
  "high",
  "partial",
  "full",
  "common",
  "late",
  "early",
  "on",
  "used",
  "alert",
  "away",
  "forward",
  "backward",
  "left",
  "right",
];
const aryPrepositions = [
  "in",
  "of",
  "with",
  "to",
  "behind",
  "when",
  "why",
  "while",
  "kind",
  "by",
  "under",
  "before",
  "up",
  "down",
  "between",
];
const aryDirections = ["north", "south", "east", "west"];
//'used when users types HELP LIST <verbs><nouns><adjectives><Prepositions><directions>
const aryHelpWords = [
  "Verbs",
  "Nouns",
  "Adjectives",
  "Prepositions",
  "Directions",
];
//'NOTE: the enumeration value is in the SAME order as the lists as created
const enumWordTypes = {
  Verbs: 0,
  Nouns: 1,
  Adjectives: 2,
  Prepositions: 3,
  Directions: 4,
};

//element vars
const txtCommand = document.getElementById("txtCommand");
const scrGameRoom = document.getElementById("scr--gameRoom");

/******************************custom c# only function******************************
         Created 25/07/2024 By Roger Williams 
          
         C# does not have a inStrRev function so created it!

*/
/*    
  SUPERCEEDED BY javaScript SPLIT facility
  only exists as C# does not support VB's instrrev function

private void inStrRev (string strWhere, string strWhat) {

  Created 25/07/2024 By Roger Williams 
          
                What It Does
                ============

                looks through a string from the RIGHT and finds the first instance of the string to look for
                and returns that position in the string

                VARS
                ----
                strWhere     : string to search
                strWhat      : string to look for

                RETURNS - location in string
            */
/*
                let intNum = strWhere.Length - 1; //set to size of search string take 1 from it string length starts at zero (?)
  strCompare = "";
  blnFound = false;
  //loop through the string
  while (!blnFound || intNum > 0) {
    //append characters to compare string one at a time from the RIGHT of strWhere
    strCompare = strWhere.substring(intNum, 1) + strCompare;
    //is it found?'
    if (strCompare.indexOf(strWhat) != -1) {
      blnFound = true;
      break;
    }

    intNum -= 1;
  }

  return intNum;
};
 */

const funcContainsValidWords = (strWhat, bytWhat) => {
  /*     
                    'Created 23/07/2024 By Roger Williams
                    '
                    'checks if strPhrase contains verb,noun,adjective,preposition,direction
                    '
                    'VARS
                    '
                    'strWhat    : what to search
                    'bytWhat    : what to check for (enum) verb,noun etc
                    '
                    'returns true if finds valid word
                    ' 
                    'also populates public class vars:
                    '
                    'noun
                    'verb
                    'adjective
                    'preposition
                    'direction
                    '
              */
  objState.blnIsOk = false;
  //what to check
  switch (bytWhat) {
    case 0: {
      // 'verbs
      //'iterate through the list looking for the required value
      aryVerbs.forEach((strTemp, intIndex, aryTemp) => {
        //'does any part of the passed string exist in the list?
        if (strWhat.indexOf(strTemp) != -1) {
          //'set public variable
          objState.strVerb = strTemp;
          //check if user typed: exit
          if (strTemp === "exit") {
            objState.strExit = strTemp;
          }
          //'say ok then exit loop - saving processor cycles!
          objState.blnIsOk = true;
        }
      });
      break;
    }
    //'NOTE: above process copied for rest of the options
    case 1: {
      // 'nouns
      aryNouns.forEach((strTemp, intIndex, aryTemp) => {
        if (strWhat.indexOf(strTemp) != -1) {
          objState.strNoun = strTemp;
          objState.blnIsOk = true;
        }
      });
      break;
    }
    case 2: {
      //'adjectives
      aryAdjectives.forEach((strTemp, intIndex, aryTemp) => {
        if (strWhat.indexOf(strTemp) != -1) {
          objState.strAdjective = strTemp;
          objState.blnIsOk = true;
        }
      });
      break;
    }
    case 3: {
      //'prepositions
      aryPrepositions.forEach((strTemp, intIndex, aryTemp) => {
        if (strWhat.indexOf(strTemp) != -1) {
          objState.strPreposition = strTemp;
          objState.blnIsOk = true;
        }
      });
      break;
    }
    case 4: {
      // 'directions
      aryDirections.forEach((strTemp, intIndex, aryTemp) => {
        if (strWhat.indexOf(strTemp) != -1) {
          objState.strDirection = strTemp;
          objState.blnIsOk = true;
        }
      });
      break;
    }
    //'no need for a case..else as fixed values are sent
  }

  return objState.blnIsOk;
};

const funcHelp_ListValidWords = (intWhat) => {
  /*
                        'Created 23/07/2024 By Roger Williams
                        '
                        'when user types: HELP LIST VERBS
                        '
                        'runs this which shows them on the console
                        '
                        'VARS
                        '
                        'bytWhat    : what to show (uses enum) 0=verb 1=noun
                        '
                        '
                        '
                  */
  let strOutput = "";
  let intNum = 1;

  //'make sure help is only text on screen
  //'
  // 'NOTE: for later phases how about a SECOND console with the help soley on it?
  // '      tis the age of 20 inch monitors after all..
  scrGameRoom.innerText = "";

  switch (intWhat) {
    case 0: {
      //'verbs
      strOutput = "Valid Verbs\n";
      strOutput = strOutput + "===========\n\n";

      //'print list contents to console
      aryVerbs.forEach((strTemp) => {
        //'puposely append to string
        strOutput = strOutput + strTemp + " ";
        intNum += 1;

        //'print string when 10 commands in it to stop unwanted word wrap
        if (intNum == 10) {
          strOutput = strOutput + "\n";
          //'reset var
          intNum = 1;
        }
      });

      //  document.getElementById("gameRoom").innerText = strOutput;
      break;
    }
    //'NOTE: above procews is repeated for each of the list types
    case 1: {
      //'nouns
      strOutput = "Valid Nouns\n";
      strOutput = strOutput + "===========\n\n";

      //'print list contents to console
      aryNouns.forEach((strTemp) => {
        //'puposely append to string
        strOutput = strOutput + strTemp + " ";
        intNum += 1;

        //'print string when 10 commands in it to stop unwanted word wrap
        if (intNum === 10) {
          strOutput = strOutput + "\n";
          //'reset var
          intNum = 1;
        }
      });

      //  document.getElementById("gameRoom").innerText = strOutput;
      break;
    }
    case 2: {
      //'adjectives
      strOutput = "Valid Adjectivess\n";
      strOutput = strOutput + "=================\n\n";

      //'print list contents to console
      aryAdjectives.forEach((strTemp) => {
        //'puposely append to string
        strOutput = strOutput + strTemp + " ";
        intNum += 1;

        //'print string when 10 commands in it to stop unwanted word wrap
        if (intNum == 10) {
          strOutput = strOutput + "\n";
          //'reset var
          intNum = 1;
        }
      });

      break;
    }
    case 3: {
      //'prepositions
      strOutput = "Valid Prepositionss\n";
      strOutput = strOutput + "===================\n\n";

      //'print list contents to console
      aryPrepositions.forEach((strTemp) => {
        //'puposely append to string
        strOutput = strOutput + strTemp + " ";
        intNum += 1;

        //'print string when 10 commands in it to stop unwanted word wrap
        if (intNum == 10) {
          strOutput = strOutput + "\n";
          //'reset var
          intNum = 1;
        }
      });

      //    document.getElementById("gameRoom").innerText = strOutput;
      break;
    }
    case 4: {
      //'directions
      strOutput = "Valid Directions\n";
      strOutput = strOutput + "================\n\n";

      //'print list contents to console
      aryDirections.forEach((strTemp) => {
        //'puposely append to string
        strOutput = strOutput + strTemp + " ";
        intNum += 1;

        //'print string when 10 commands in it to stop unwanted word wrap
        if (intNum == 10) {
          strOutput = strOutput + "\n";
          //'reset var
          intNum = 1;
        }
      });
      //      document.getElementById("gameRoom").innerText = strOutput;
      break;
    }
  }

  //'check if string not null if so write to console
  //'NOTE: is there a better way to do this?
  if (strOutput.Length != 0) {
    strOutput = strOutput + "\n\nEnter: resume - to continue game";
    //show help text
    scrGameRoom.innerText = strOutput;
    //reset textbox
    txtCommand.value = "";
  }
};

export const funcHelp_List = () => {
  /*
                        'Created 24/07/2024 By Roger Williams
                        '
                        'Lists the available help options when user just types: HELP
                        '
                        '
                        '
                        'NOTE: for later phases could all these options be shown in SECOND console?
                        '
                        modified 11/12/2024 added export for new help button
                */
  let strOutput = "";

  scrGameRoom.innerText = "";
  strOutput = strOutput + "Help Options\n";
  strOutput = strOutput + "============\n";
  strOutput = strOutput + "\n";
  strOutput =
    strOutput +
    "List available adjectives             - help list adjectives\n";
  strOutput =
    strOutput + "List available verbs                  - help list verbs\n";
  strOutput =
    strOutput + "List available nouns                  - help list nouns\n";
  strOutput =
    strOutput +
    "List available prepositions           - help list prepositions\n";
  strOutput =
    strOutput +
    "List available directions of movement - help list directions\n\n";
  strOutput = strOutput + "Enter: resume - to continue game\n\n";
  strOutput = strOutput + "Other Commands:\n";
  strOutput = strOutput + "Enter: exit - at any time to end game\n";
  strOutput = strOutput + "Enter: load - at any time to load saved game\n";
  strOutput = strOutput + "Enter: save - at any time to save game\n\n";
  //show help on page
  scrGameRoom.innerText = strOutput;
  //reset textbox
  txtCommand.value = "";
};

//exports - funcs
export const funcParseText = (strWhat) => {
  /*
          'Created 23/07/2024 By Roger Williams
          '
          'checks if text contains valid words e.g. nouns sets IsOk accordingly
          '
          'Rules (phase one)
          '-----
          '
          '- every phase should contain a verb
          '- every verb should either have an adjective e.g. open door
          'or
          'a preposition e.g. while
          'or
          'a noun e.g. key
          '
          'also handles user help requests, valid request string are:
          '
          'HELP
          'HELP LIST 
          ''         VERBS
          '          NOUNS
          '          ADJECTIVES
          '          PREPOSITIONS
          '          DIRECTIONS
          '
          '
  */
  let bytValid = 0;
  let strTemp = "";
  let objLastWord; //used to get last word of command
  //'set check variables to false
  let blnAdjective = false;
  let blnDirection = false;
  let blnNoun = false;
  let blnPreposition = false;
  let blnVerb = false;
  //'if passed string has no value leave and set error to true
  if (strWhat.Length == 0) {
    objState.blnIsOk = false;
  } else {
    //'clear public vars
    objState.strNoun = "";
    objState.strAdjective = "";
    objState.strVerb = "";
    objState.strPreposition = "";
    objState.strDirection = "";
    objState.strSavedLoaded = "";
    objState.strHelp = "";

    //'convert to lowercase
    strWhat = strWhat.toLowerCase();
    //'check if help request
    if (strWhat.indexOf("help") != -1) {
      //set as ok and as help
      objState.blnIsOk = true;
      objState.strHelp = "help";

      //'check if help request
      if (strWhat == "help") {
        funcHelp_List();
      }
      //'check if user asking for a list
      if (strWhat.indexOf("help list ") != -1) {
        //extract last word
        objLastWord = strWhat.split(` `);
        strTemp = objLastWord[objLastWord.length - 1];

        switch (strTemp) {
          case "verbs": {
            funcHelp_ListValidWords(enumWordTypes.Verbs);
            break;
          }
          case "adjectives": {
            funcHelp_ListValidWords(enumWordTypes.Adjectives);
            break;
          }
          case "nouns": {
            funcHelp_ListValidWords(enumWordTypes.Nouns);
            break;
          }
          case "prepositions": {
            funcHelp_ListValidWords(enumWordTypes.Prepositions);
            break;
          }
          case "directions": {
            funcHelp_ListValidWords(enumWordTypes.Directions);
            break;
          }
        }
      }
    } else {
      /*
                                  'every phrase should contain a verb
                                  'every verb should either have an
                                  '
                                  'adjective e.g. open door
                                  'or
                                  'a preposition e.g. while
                                  'or
                                  'a noun e.g. key
                                  '
                   */
      if (funcContainsValidWords(strWhat, enumWordTypes.Adjectives)) {
        blnAdjective = true;
      }
      if (funcContainsValidWords(strWhat, enumWordTypes.Directions)) {
        blnDirection = true;
      }
      if (funcContainsValidWords(strWhat, enumWordTypes.Nouns)) {
        blnNoun = true;
      }
      if (funcContainsValidWords(strWhat, enumWordTypes.Prepositions)) {
        blnPreposition = true;
      }
      if (funcContainsValidWords(strWhat, enumWordTypes.Verbs)) {
        blnVerb = true;
      }

      //'mow look at the rules
      // 'NOTE: these are primitive grammar rules and need to be expanded and developed
      if (blnVerb) {
        bytValid = 1;
      }
      if (blnAdjective && blnVerb) {
        bytValid += 1;
      }
      if (blnPreposition && blnVerb) {
        bytValid += 1;
      }
      if (blnNoun && blnVerb) {
        bytValid += 1;
      }

      //'if valid phrase or user typed "exit"
      if (bytValid > 0 || objState.strNoun === "exit") {
        objState.blnIsOk = true;
      } else {
        //'if not containing any valid words set to incorrect phrase
        //        strOutput = strOutput + strWhat + " - Not Recognised Phrase";
        objState.blnIsOk = false;
      }
    }
  }
};
