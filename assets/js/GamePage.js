/*
    GamePage Object Constructor Function
    Rock, Paper, Scissors Multiplayer Project
    BootCamp at UNC Homework Assignment 7
    October 14, 2017
    Bo Slott
*/


function GamePage() {

  this.go = function() {
    var pageElements = new PageElements();
    pageElements.go();

    var rpsMulti = new RPSMulti();
    rpsMulti.go();
  };

}

// Pass a single parameter of the div in the body
