/*
    RPSMulti Object Constructor Function
    Rock, Paper, Scissors Multiplayer Project
    BootCamp at UNC Homework Assignment 7
    October 14, 2017
    Bo Slott
*/


function RPSMulti() {

  this.activeWindow = document.getElementById("activeWindow");
  this.topLevel;
  this.enterNameTop;
  this.player1 = {};
  this.player2 = {};
  this.dataRef = {};
  this.gameStatusRef = {};
  this.playerListRef = {};

  this.go = function() {
    this.renderGameTopLevel();
    this.renderEnterName();

  };

  //
  //    RPS Game Board Rendering Functions
  //

    this.renderGameTopLevel = function() {
      var newArticle = document.createElement("article");
      newArticle.className = "row game-top-level";
      newArticle.id = "gameTopLevel";

      this.activeWindow.appendChild(newArticle);
      this.topLevel = document.getElementById("gameTopLevel");

      var newRow = document.createElement("div");
      newRow.className = "enter-name-top";
      newRow.id = "enterNameTop";
      this.topLevel.appendChild(newRow);
      this.enterNameTop = document.getElementById("enterNameTop");
    };

    this.renderEnterName = function() {
      var appObj = this;
      this.renderEnterNameHeader();
      this.renderEnterNameInput();
      this.activateEnterName();
    };

    this.renderEnterNameHeader = function() {
      var newRow = document.createElement("div");
      newRow.className = "row enter-name-header-row";
      newRow.id = "enterNameHeaderRow";

      var newH2 = document.createElement("h2");
      newH2.className = "enter-name-header";
      newH2.textContent = "Enter Your Name";

      newRow.appendChild(newH2);

      this.enterNameTop.appendChild(newRow);
    };

    this.renderEnterNameInput = function() {
      var newRow = document.createElement("div");
      newRow.className = "row enter-name-input-row";
      newRow.id = "enterNameInputRow";

      var newInput = document.createElement("input");
      newInput.className = "enter-name-input";
      newInput.type = "text";
      newInput.name = "enter-name-input";
      newInput.id = "enterNameInput";

      newRow.appendChild(newInput);

      var newBR = document.createElement("br");
      newRow.appendChild(newBR);

      var newBtn = document.createElement("button");
      newBtn.className = "enter-name-btn btn btn-default";
      newBtn.id = ("enterNameBtn");
      newBtn.type = "button";
      newBtn.textContent = "Submit";

      newRow.appendChild(newBtn);

      this.enterNameTop.appendChild(newRow);
    };

    this.activateEnterName = function() {
      var appObj = this;
      var button = document.getElementById("enterNameBtn");
      var input = document.getElementById("enterNameInput");
      button.addEventListener("click", function() {
        var newName = input.value;
        // appObj.topLevel.textContent = "";
        appObj.renderGameBoards();
        appObj.beginGamePlay(newName, appObj);
      });
    };

    this.renderGameBoards = function() {
      this.renderGameViews();
      this.renderGameViewsHeaders();
      this.renderGameDataRow();
    };

    this.renderGameViews = function() {
      var newRow = document.createElement("div");
      newRow.className = "row game-views-row";
      newRow.id = "gameViewsRow";

      var i=0;
      var roundIds = ["youView", "gameView", "opponentView"];

      for(i=0; i<3; i++) {
        var newCol = document.createElement("div");
        newCol.className = "col-xs-4 game-views";
        newCol.id = roundIds[i];

        newRow.appendChild(newCol);
      }

      this.topLevel.appendChild(newRow);
    };

    this.renderGameViewsHeaders = function() {
      var newRow = document.createElement("div");
      newRow.className = "row game-views-headers-row";
      newRow.id = "gameViewsHeadersRow";

      var headers = ["Player-1", "", "Player-2",];
      var i=0;
      var j=0;
      for(i=0; i<3; i++) {
        var newCol = document.createElement("div");
        newCol.className = "col-xs-4 game-views-headers-col";

        var newH2 = document.createElement("h2");
        newH2.className = "game-views-headers";
        newH2.id = "header" + headers[i];
        newH2.textContent = headers[i];

        newCol.appendChild(newH2);
        newRow.appendChild(newCol);
      }

      this.topLevel.appendChild(newRow);
    };

    this.renderGameDataRow = function() {
      var newRow = document.createElement("div");
      newRow.className = "row game-data-row";
      newRow.id = "gameDataRow";

      var playerIds = ["playerWins", "playerLosses", "playerTies"];
      var oppIds = ["opponentWins", "opponentLosses", "opponentTies"];

      var colA = this.renderScoreboard("playerScoreboard", playerIds);
      var colB = this.renderMessageBoard("messageBoard");
      var colC = this.renderScoreboard("opponentScoreboard", oppIds);

      newRow.appendChild(colA);
      newRow.appendChild(colB);
      newRow.appendChild(colC);

      this.topLevel.appendChild(newRow);
    };

    this.renderScoreboard = function(passedId, idArray) {
      var passedId = passedId;
      var idArray = idArray;
      var str = ["WINS", "LOSSES", "TIES"];
      var i=0;

      var newCol = document.createElement("div");
      newCol.className = "col-xs-3 scoreboard";
      newCol.id = passedId;

      for(i; i<3; i++) {
        var newContentDisp = this.renderScoreboardContentDisplayRow(idArray[i], str[i]);
        newCol.appendChild(newContentDisp);
      }

      return newCol;
    };

    this.renderScoreboardContentDisplayRow = function(newSpanId, h3text) {
      var newSpanId = newSpanId
      var h3text = h3text;
      var i=0;

      var newRow = document.createElement("div");
      newRow.className = "row scoreboard-data-row";

      var newH3 = document.createElement("h3");
      newH3.className = "scoreboard-data-property-header";
      newH3.textContent = h3text;
      newRow.appendChild(newH3);

      var newSpan = document.createElement("span");
      newSpan.id = newSpanId;

      var newP = document.createElement("p");
      newP.className = "scoreboard-data-box";
      newRow.appendChild(newP).appendChild(newSpan);

      return newRow;
    };

    this.renderMessageBoard = function(passedId) {
      var newCol = document.createElement("div");
      newCol.className = "col-xs-6 message-board";
      newCol.id = passedId;

      var newH3 = document.createElement("h3");
      newH3.className = "message-board-header";
      newH3.textContent = "Message Board";
      newCol.appendChild(newH3);

      var newDispWin = document.createElement("div");
      newDispWin.className = "row message-display-window";
      newDispWin.id = "messageDisplayWindow";

      newCol.appendChild(newDispWin);

      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "message-board-input";
      newInput.name = "message-board-input";
      newInput.id = "message-input-text";

      newCol.appendChild(newInput);

      var newBtn = document.createElement("button");
      newBtn.className = "message-board-submit-button btn btn-default";
      newBtn.id = "messageBoardSubBtn";
      newBtn.textContent = "SUBMIT MESSAGE"
      newBtn.type = "button";

      newCol.appendChild(newBtn);

      return newCol;
    };

  //
  //    RPS Game Play Functions
  //

  this.beginGamePlay = function(newName, appObj) {
    var newName = newName;
    var appObj = appObj;
    this.initFirebase();

    this.assignPlayers(newName, appObj);


    //
    // var playersListRef = this.dataRef.ref("players");
    // var playerOneRef = playersListRef.child("one");
    // playerOneRef.set(this.player1);
    //
    //
    // this.dataRef.ref("players").on("child_added", function(snap) {
    //   console.log(snap.val().name);
    //   console.log("wins = " + snap.val().wins);
    // });



    };

  this.initFirebase = function() {
    var config = {
      apiKey: "AIzaSyCSIulMUERulPYfQK6GzYrpNBJBo4Pg0Tk",
      authDomain: "rpsmulti-74556.firebaseapp.com",
      databaseURL: "https://rpsmulti-74556.firebaseio.com",
      projectId: "rpsmulti-74556",
      storageBucket: "rpsmulti-74556.appspot.com",
      messagingSenderId: "416047394221"
    };
    firebase.initializeApp(config);

    this.dataRef = firebase.database();
    this.gameStatusRef = this.dataRef.ref("gameStatus");
    this.playersListRef = this.dataRef.ref("players");
  };

  this.assignPlayers = function(newName, appObj) {
    var appObj = appObj;
    var newName = newName;

    this.gameStatusRef.once("value").then(function(snapshot) {
      var status = snapshot.val();

      switch (status) {
        case 0:
          appObj.player1 = new RPSPlayer(newName);
          console.log(appObj.player1);
          appObj.playersListRef.child("one").set(appObj.player1);
          appObj.gameStatusRef.set(1);
          appObj.displayPlayer(appObj, 1);
          break;
        case 1:
          appObj.player2 = new RPSPlayer(newName);
          console.log(appObj.player2);
          appObj.playersListRef.child("two").set(appObj.player2);
          appObj.gameStatusRef.set(2);
          appObj.displayPlayer(appObj, 2)
          break;
        case 2:
          // Change player status to "spectator"
          console.log("Must Be 3");
          break;
        default:
          console.log("default activated");
          break;
      };
    });


  };

  this.displayPlayer = function(appObj, player) {
    var appObj = appObj;
    var player = player;

    if (player === 1) {
      document.getElementById("headerPlayer-1").textContent = appObj.player1.name;
    } else {
      document.getElementById("headerPlayer-2").textContent = appObj.player2.name;
    }
  };


}
