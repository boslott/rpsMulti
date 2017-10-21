/*
    RPSMulti Object Constructor Function
    Rock, Paper, Scissors Multiplayer Project
    BootCamp at UNC Homework Assignment 7
    October 21, 2017
    Bo Slott

    Issues:

    - Need to add a removeEventListener to the window so the enter key does not render additional game boards

    - Not sure why, but the winner name dislay is quirky. On one player's screen one name will appear as the winner and on the other player's screen another will appear. Or, the same name will appear, or one will say "tie" and one will say a winner, or the player that choices first will show the "default" as winning

    - The message board needs more work. Need to pull in the messages from FireBase to display the history

    - The thisPlayer.name needs adjustment so the onunload function will be able to remove the player's data upon leaving.


*/


function RPSMulti() {

  this.activeWindow = document.getElementById("activeWindow");
  this.nameDisplay1 = document.getElementById("headerPlayer-1");
  this.nameDisplay2 = document.getElementById("headerPlayer-2");
  this.topLevel;
  this.enterNameTop;
  this.player1 = new RPSPlayer("Player-1");
  this.player2 = new RPSPlayer("Player-2");
  this.thisPlayer = "";
  this.winner = "default";
  this.dataRef = {};
  this.gameStatusRef = {};
  this.playerListRef = {};
  this.messagesListRef = {};
  this.player1CurrentChoice = "";
  this.player2CurrentChoice = "";

  Object.defineProperties(this, {
    playerInfo1: {
        get: function() {
            delete this.playerInfo1;
            return this.playerInfo1 = this.player1CurrentChoice;
        }
        ,configurable:  true
    }
  });

  Object.defineProperties(this, {
    playerInfo2: {
        get: function() {
            delete this.playerInfo2;
            return this.playerInfo2 = this.player2CurrentChoice;
        }
        ,configurable:  true
    }
  });

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
      this.activateEnterName(appObj);
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
      newInput.autofocus = "on";

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

    this.activateEnterName = function(appObj) {
      var appObj = appObj;
      var button = document.getElementById("enterNameBtn");
      var input = document.getElementById("enterNameInput");
      button.addEventListener("click", function() {
        var newName = input.value;
        appObj.renderGameBoards();
        appObj.beginGamePlay(newName, appObj);
      });
      window.addEventListener("keyup", function(event) {
        if(event.key === "Enter" && input.value !== "") {
          var newName = input.value;
          appObj.thisPlayer = newName;
          appObj.renderGameBoards();
          appObj.beginGamePlay(newName, appObj);
        }
      });
    };

    this.renderGameBoards = function() {
      this.renderGameViews();
      this.renderBattleRows();
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

      this.renderBattleRows = function() {
          var br = document.getElementById("gameView");
          var newRow = document.createElement("div");
          newRow.className = "battle-rows";
          newRow.id = "battleRow1";
          br.appendChild(newRow);

          var newRow2 = document.createElement("div");
          newRow2.className = "battle-rows";
          newRow2.id = "battleRow2";
          br.appendChild(newRow2);
      };

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
      newInput.id = "messageInputText";

      newCol.appendChild(newInput);

      var newBtn = document.createElement("button");
      newBtn.className = "message-board-submit-button btn btn-default";
      newBtn.id = "messageBoardSubBtn";
      newBtn.textContent = "SUBMIT MESSAGE"
      newBtn.type = "button";

      newCol.appendChild(newBtn);

      return newCol;
    };

    this.renderPlayerChoices = function(destination) {
      var destination = destination;
      var newRow = document.createElement("div");
      newRow.className = "row player-choices-row";
      newRow.id = "playerChoicesRow";

      var header = document.createElement("h2");
      header.className = "player-choice-header";
      header.id = "playerChoiceHeader";
      header.textContent = "Choose Your Play:";
      newRow.appendChild(header);

      newWrap = document.createElement("div");
      newWrap.className = "player-choices";

      var choices = ["rock", "paper", "scissors"];
      var i=0;
      if (destination === "youView") {
        for (i; i<3; i++) {
          var newImg = document.createElement("img");
          newImg.src = "assets/images/" + choices[i] + ".png";
          newImg.className = "player1-choice-img disable-p2 spectator";
          newImg.id = choices[i] + "1Choice";
          newImg.val = choices[i] + "1";
          newWrap.appendChild(newImg);
        }
      } else {
        for (i; i<3; i++) {
          var newImg = document.createElement("img");
          newImg.src = "assets/images/" + choices[i] + ".png";
          newImg.className = "player2-choice-img disable-p1 spectator";
          newImg.id = choices[i] + "2Choice";
          newImg.val = choices[i] + "2";
          newWrap.appendChild(newImg);
        }
      }

      newRow.appendChild(newWrap);

      document.getElementById(destination).appendChild(newRow);
    };

  //
  //    RPS Game Play Functions
  //

  this.beginGamePlay = function(newName, appObj) {
    var newName = newName;
    var appObj = appObj;
    this.initFirebase();
    this.assignPlayers(newName, appObj);
    this.renderPlayerChoices("youView");
    this.renderPlayerChoices("opponentView");
    this.choosePlay();
    this.playerLeaves(appObj);
    this.sendMessage(appObj);

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
    this.messagesListRef = this.dataRef.ref("messages");
  };

  this.assignPlayers = function(newName, appObj) {
    var appObj = appObj;
    var newName = newName;

    this.gameStatusRef.once("value").then(function(snapshot) {
      var status = snapshot.val();

      switch (status) {
        case 0:
          document.querySelector("body").className = "enact1";
          appObj.thisPlayer = newName;
          appObj.player1.name = newName;
          appObj.playersListRef.child("one").set(appObj.player1);
          appObj.setOnePlayerScene(appObj);
          break;
        case 1:
          document.querySelector("body").className = "enact2";
          appObj.thisPlayer = newName;
          appObj.player2.name = newName;
          appObj.playersListRef.child("two").set(appObj.player2);
          appObj.setTwoPlayerScene(appObj);
          break;
        case 2:
          document.querySelector("body").className = "enact3";
          appObj.setSpectatorScene(appObj);
          break;
        default:
          break;
      };
    });
  };

  this.setOnePlayerScene = function(appObj) {
    var appObj = appObj;
    appObj.gameStatusRef.set(1);
    appObj.updatePlayers(appObj);
    this.enterNameTop.textContent = "";
  };

  this.displayPlayers = function(appObj) {
    var appObj = appObj;
    appObj.displayPlayer1(appObj);
    appObj.displayPlayer2(appObj);
  };

  this.displayPlayer1 = function(appObj) {
    var disp1 = document.getElementById("headerPlayer-1");
    var wins1 = document.getElementById("playerWins");
    var losses1 = document.getElementById("playerLosses");
    var ties1 = document.getElementById("playerTies");

    disp1.textContent = appObj.player1.name;
    wins1.textContent = appObj.player1.wins;
    losses1.textContent = appObj.player1.losses;
    ties1.textContent = appObj.player1.ties;
  };

  this.displayPlayer2 = function(appObj) {
    var disp2 = document.getElementById("headerPlayer-2");
    var wins2 = document.getElementById("opponentWins");
    var losses2 = document.getElementById("opponentLosses");
    var ties2 = document.getElementById("opponentTies");
    disp2.textContent = appObj.player2.name;
    wins2.textContent = appObj.player2.wins;
    losses2.textContent = appObj.player2.losses;
    ties2.textContent = appObj.player2.ties;
  };

  this.setTwoPlayerScene = function(appObj) {
    var appObj = appObj;
    appObj.gameStatusRef.set(2);
    appObj.updatePlayers(appObj);
    this.enterNameTop.textContent = "";
  };

  this.setSpectatorScene = function(appObj) {
    var appObj = appObj;
    appObj.updatePlayers(appObj);
    this.enterNameTop.textContent = "";
  };

  this.updatePlayers = function(appObj) {
    var appObj = appObj;

    appObj.playersListRef.on("value", function(snapshot) {
      appObj.player1 = snapshot.val().one;
      appObj.player2 = snapshot.val().two;
      appObj.displayPlayers(appObj);
    });
  };

  this.choosePlay = function() {
    var appObj = this;
    var rock1 = document.getElementById("rock1Choice");
    var paper1 = document.getElementById("paper1Choice");
    var scissors1 = document.getElementById("scissors1Choice");
    var rock2 = document.getElementById("rock2Choice");
    var paper2 = document.getElementById("paper2Choice");
    var scissors2 = document.getElementById("scissors2Choice");
    var player1Class = document.getElementsByClassName("player1-choice-img");
    var player2Class = document.getElementsByClassName("player2-choice-img");


    rock1.addEventListener("click", function() {
      appObj.player1.choice = "rock";
      appObj.playersListRef.child("one").update({"choice":appObj.player1.choice});
      appObj.displayChoice("rock", appObj, 1);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });

    paper1.addEventListener("click", function() {
      appObj.player1.choice = "paper";
      appObj.playersListRef.child("one").update({"choice":appObj.player1.choice});
      appObj.displayChoice("paper", appObj, 1);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });

    scissors1.addEventListener("click", function() {
      appObj.player1.choice = "scissors";
      appObj.playersListRef.child("one").update({"choice":appObj.player1.choice});
      appObj.displayChoice("scissors", appObj, 1);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });

    rock2.addEventListener("click", function() {
      appObj.player2.choice = "rock";
      appObj.playersListRef.child("two").update({"choice":appObj.player2.choice});
      appObj.displayChoice("rock", appObj, 2);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });

    paper2.addEventListener("click", function() {
      appObj.player2.choice = "paper";
      appObj.playersListRef.child("two").update({"choice":appObj.player2.choice});
      appObj.displayChoice("paper", appObj, 2);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });

    scissors2.addEventListener("click", function() {
      appObj.player2.choice = "scissors";
      appObj.playersListRef.child("two").update({"choice":appObj.player2.choice});
      appObj.displayChoice("scissors", appObj, 2);
      var outcome = appObj.comparePlays(appObj);
      appObj.updateScores(outcome, appObj);
      appObj.renderBattleView(appObj);
    });
  };

  this.displayChoice = function(imageName, appObj, player) {
    var imageName = imageName;
    var appObj = appObj;
    var player = player;
    var youViewBox = document.getElementById("youView");
    var opponentViewBox = document.getElementById("opponentView");

    if(player === 1) {
      youViewBox.textContent = "";
      var newRow = document.createElement("div");
      newRow.className = "display-choice";
      newRow.id = "displayChoice";

      var newImg = document.createElement("img");
      newImg.src = "assets/images/" + imageName + ".png";
      newImg.className = "player-choice-img";
      newRow.appendChild(newImg);

      var newHead = document.createElement("h2");
      newHead.className = "you-choose";
      newHead.textContent = "You Chose";
      newRow.appendChild(newHead);

      youViewBox.appendChild(newRow);
    } else {
      opponentViewBox.textContent = "";
      var newRow = document.createElement("div");
      newRow.className = "display-choice";
      newRow.id = "displayChoice";

      var newImg = document.createElement("img");
      newImg.src = "assets/images/" + imageName + ".png";
      newImg.className = "player-choice-img";
      newRow.appendChild(newImg);

      var newHead = document.createElement("h2");
      newHead.className = "you-choose";
      newHead.textContent = "You Chose";
      newRow.appendChild(newHead);

      opponentViewBox.appendChild(newRow);
    }
  };

  this.comparePlays = function(appObj) {
    var appObj = appObj;
    var p1 = "";
    var p2 = "";

    appObj.playersListRef.once("value", function(snapshot) {
      p1 = snapshot.val().one.choice;
      p2 = snapshot.val().two.choice;
    });

    if(p1 === "" || p2 === "") {
      return "n";
    }

    if (p1 === p2) {
      return "t";
    }
    if (p1 === "rock") {
      if (p2 === "scissors") {
        return "p1";
      }
      else {
        return "p2";
      }
    }
    if (p1 === "paper") {
      if (p2 === "rock") {
        return "p1";
      }
      else {
        return "p2";
      }
    }
    if (p1 === "scissors") {
      if (p2 === "paper") {
        return "p1";
      }
      else {
          return "p2";
      }
    }

  };

  this.updateScores = function(outcome, appObj) {
    var appObj = appObj;
    var outcome = outcome;

    appObj.playersListRef.once("value", function(snapshot) {
      var p1 = snapshot.val().one;
      var p2 = snapshot.val().two;

      if(outcome === "n") {
        return;
      } else if(outcome === "p1") {
        p1.wins++;
        p2.losses++;
        appObj.winner = p1.name;
        appObj.playersListRef.child("one").set(p1);
        appObj.playersListRef.child("two").set(p2);
      } else if(outcome === "p2") {
        p2.wins++;
        p1.losses++;
        appObj.winner = p2.name;
        appObj.playersListRef.child("two").set(p2);
        appObj.playersListRef.child("one").set(p1);
      } else {
        p1.ties++;
        p2.ties++;
        appObj.winner = "t";
        appObj.playersListRef.child("two").set(p2);
        appObj.playersListRef.child("one").set(p1);
      }
    });
  };

  this.renderBattleView = function(appObj) {
    var appObj = appObj;
    var br = document.getElementById("battleRow1");
    var br2 = document.getElementById("battleRow2");
    var p1 = {};
    var p2 = {};



    appObj.playersListRef.once("value", function(snapshot) {
      p1 = snapshot.val().one;
      p2 = snapshot.val().two;
    });

    if (p1.choice !== "" && p2.choice !== "") {

      var newImg = document.createElement("img");
      newImg.className = "battle-view-images";
      newImg.id = "player1Choice";
      newImg.src = "assets/images/" + appObj.player1.choice + ".png";

      var space = document.createElement("span");
      space.id = "space";
      space.textContent = " vs ";

      var newImg2 = document.createElement("img");
      newImg2.className = "battle-view-images";
      newImg2.id = "player2Choice";
      newImg2.src = "assets/images/" + appObj.player2.choice + ".png";

      br.appendChild(newImg);
      br.appendChild(space);
      br.appendChild(newImg2);



      var winnerDisp = document.createElement("span");
      winnerDisp.id = "winnerDisp";
      if (appObj.winner !== "t") {
        winnerDisp.textContent = appObj.winner + " wins!";
      } else {
        winnerDisp.textContent = "It's A Tie!";
      }
      br2.appendChild(winnerDisp);

      setTimeout(appObj.newRound, 2000, appObj);
    }  else {
      setTimeout(function() {
        appObj.renderBattleView(appObj);
      }, 100);
    }
  };

  this.newRound = function(appObj) {
    var appObj = appObj;
    document.getElementById("youView").textContent = "";
    document.getElementById("gameView").textContent = "";
    document.getElementById("opponentView").textContent = "";
    appObj.playersListRef.child("one").update({"choice":""});
    appObj.playersListRef.child("two").update({"choice":""});

    appObj.renderPlayerChoices("youView");
    appObj.renderPlayerChoices("opponentView");
    appObj.renderBattleRows();
    appObj.choosePlay();
  };

  this.playerLeaves = function(appObj) {
    var appObj = appObj;
    console.log("this.player = " + appObj.thisPlayer);
    console.log("p1.name = " + appObj.player1.name);
    console.log("p2.name = " + appObj.player2.name);
    var body = document.querySelector("body");
    body.addEventListener("unload", function() {
      if (appObj.thisPlayer === appObj.player1.name) {
        appObj.playersListRef.child("one").remove();
      } else {
        appObj.playerListRef.child("two").remove();
      }
    });
  };

  this.sendMessage = function(appObj) {
    var appObj = appObj;
    var messageBtn = document.getElementById("messageBoardSubBtn");
    var mes = document.getElementById("messageInputText");
    var mesWin = document.getElementById("messageDisplayWindow");
    var mesObj = {
      "name": "",
      "message": ""
    };
    var newBr = document.createElement("br");
    messageBtn.addEventListener("click", function() {
      mesObj.name = appObj.thisPlayer;
      mesObj.message = mes.value;
      appObj.messagesListRef.push(mesObj);
      mes.textContent = "";
      mesWin.textContent+=(mesObj.name + ": " + mesObj.message);
      mewWin.textContent+= newBr;
    });
  };




}
