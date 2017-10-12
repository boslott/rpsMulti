/*
    PageElements Object Constructor Function
    Rock, Paper, Scissors Multiplayer Project
    BootCamp at UNC Homework Assignment 7
    October 14, 2017
    Bo Slott
*/



function PageElements() {
  this.siteBody;
  this.activeWindow = document.getElementById("activeWindow");

  this.go = function() {
      this.renderSiteHeader();
      this.renderSiteBody();
      this.renderSiteFooter();
  };

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
    this.renderActiveWindow();
    this.renderMessageBoard();
  };

  // SiteBody Functions
    this.renderSiteBodyBG = function() {
      var newBody = document.createElement("div");
      newBody.className = "container site-body";
      newBody.id = "siteBody";

      document.body.appendChild(newBody);
      this.siteBody = document.getElementById("siteBody");
    };

    this.renderActiveWindow = function() {
      var newRow = document.createElement("section");
      newRow.className = "row active-window-row";

      var newActiveWindow = document.createElement("main");
      newActiveWindow.className = "col-xs-12 col-sm-10 col-sm-offset-1 active-window";
      newActiveWindow.id = "activeWindow";

      newRow.appendChild(newActiveWindow);

      this.siteBody.appendChild(newRow);
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
