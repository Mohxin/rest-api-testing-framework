/*
* This page holds properties and functions for login screen
* */

var LoginPage = function() {

    // Open LiveBrowser Page
    this.open = function() {
        browser.get('/LiveBrowser');
    };

    // get validation objects
    this.serverName = element(by.id('serverName'));
    this.userName = element(by.id('userName'));
    this.password = element(by.id('password'));
    this.loginButton = element(by.id('loginButton'));

    this.popupWindow = element(by.css('.introjs-helperLayer'));
    this.popupSkipButton = element(by.css('.introjs-skipbutton'));

    this.logo = element(by.id('eslo-logo'));

};

// Export the script as module
module.exports = new LoginPage();
