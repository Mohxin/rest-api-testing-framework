var util = require('util');
var LoginPage = require('./pages/loginPage.js');
describe('LiveBrowser >', function() {

    beforeEach(function() {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('should connect to Live Browser', function(){
        LoginPage.open();
        browser.getCurrentUrl().then(function(url) {
            expect(url.indexOf('LiveBrowser') > -1).toBe(true);
        });

        expect(LoginPage.serverName.isPresent()).toBe(true);
        expect(LoginPage.userName.isPresent()).toBe(true);
        expect(LoginPage.password.isPresent()).toBe(true);
    });

    it('should login to the system', function(){

        // Clean pre-existing data
        LoginPage.serverName.clear();
        LoginPage.userName.clear();
        LoginPage.password.clear();

        // Send login details to the form controls
        LoginPage.serverName.sendKeys(browser.params.server);
        LoginPage.userName.sendKeys(browser.params.login.userName);
        LoginPage.password.sendKeys(browser.params.login.password);

        // Login to the system
        LoginPage.loginButton.click();

        // wait for the system to login
        browser.sleep(SleepTime);

        expect(LoginPage.logo.isDisplayed()).toBe(true);
    });

    it('should skip popup', function(){

        if(LoginPage.popupWindow.isPresent()){
            LoginPage.popupSkipButton.click();

            // Make sure the pop up window is not present
            expect(LoginPage.popupWindow.isPresent()).toBe(false);
        }
    });

});