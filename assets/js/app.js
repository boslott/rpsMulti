//
//    app.js for Rock, Paper, Scissors Multiplayer
//    BootCamp at UNC Homework Assignment 7
//    Oxtober 14, 2017
//    Bo Slott
//


//
//    The Page is created and activated
//
var gamePage = new GamePage();

gamePage.go();

//
//    Object Constructor Function
//    - Game Page
//
function GamePage() {

  this.go = function() {
    var pageElements = new PageElements();
    pageElements.renderSiteHeader();
    pageElements.renderSiteBody();
    pageElements.renderSiteFooter();

    var rpsMulti = new RPSMulti();
    rpsMulti.go();
  };

}


//
//    Object Constructor Function
//    - PageElements
//
function PageElements() {


  this.renderSiteHeader = function() {
    var newHeader = document.createElement("header");
    newHeader.className = "site-header";
    newHeader.id = "siteHeader";

    var newNav = document.createElement("nav");
    newNav.className = "site-nav";
    newNav.id = "siteNav";

    newHeader.appendChild(newNav);

    document.body.appendChild(newHeader);
  };

  this.renderSiteBody = function() {
    this.renderSiteBodyBG();
    this.renderGameBoard();
    this.renderMessageBoard();
  };

  // SiteBody Functions
    this.renderSiteBodyBG = function() {
      var newBody = document.createElement("div");
      newBody.className = "container site-body";
      newBody.id = "siteBody";
      newBody.textContent = "Hello There!"

      document.body.appendChild(newBody);
    };

    this.renderGameBoard = function() {

    };

    this.renderMessageBoard = function() {

    };

  this.renderSiteFooter = function() {
    var newFooter = document.createElement("footer");
    newFooter.className = "site-footer";
    newFooter.id = "siteFooter";

    var newCopy = document.createElement("small");
    newCopy.className = "copyright";
    newCopy.id = "copyRight";
    newCopy.innerHTML = "&copy; Copyright 2017 Bo Slott";

    newFooter.appendChild(newCopy);

    document.body.appendChild(newFooter);
  };

}


//
//    Object Constructor Function
//    - Rock, Paper, Scissors Multiplayer Game
//
function RPSMulti() {

  this.go = function() {

  };

  this.renderGameBoard = function() {

  };

  this.renderPlayerName = function() {

  };

  this.renderPlayAreas = function() {

  };

  this.renderMessageBoard = function() {

  };

}
