/**
 * Created by Karuna on 15-08-2014.
 */

var menuPage = require('./pages/menuPage.js');
var us = require('underscore');
var loginPage = require('./pages/loginPage.js');
var leftPage = require('./pages/leftPage.js');
var topRightPage = require('./pages/topRightPage.js');
var bottomRightPage = require('./pages/bottomRightPage.js');
var commonPage = require('./pages/commonPage.js');
var path = require('path');

describe('Menu >', function () {
    var handlePromise;

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('Go to customer table', function(){
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
    });

    describe('Help >', function () {
        var appWindow = browser.getWindowHandle();
        var openHelpWindow = function (linkName) {
            menuPage.getMenuItemElm(linkName).click().then(function () {
                handlePromise = browser.getAllWindowHandles();
                var handles = handlePromise.then(function (handles) {
                    var popUpHandle = handles[1];
                    var handle = browser.switchTo().window(popUpHandle);
                    handle = browser.getWindowHandle();
                    expect(handle).toEqual(popUpHandle);
                    browser.switchTo().window(appWindow);
                });
            });
        };

        it('should open Doc Center in a new window / tab', function () {
            menuPage.helpButton.click();
            openHelpWindow('Doc Center');
        });
        it('should open Reference in a new window / tab', function () {
            menuPage.helpButton.click();
            openHelpWindow('Reference');
        });
        it('should open Tutorial in a new window / tab', function () {
            menuPage.helpButton.click();
            openHelpWindow('Tutorial');
        });
        it('should open Support in a new window / tab', function () {
            menuPage.helpButton.click();
            openHelpWindow('Support');
        });
        it('should show intro in the current page', function () {
            menuPage.helpButton.click();
            menuPage.getMenuItemElm('Show intro').click();
            if (loginPage.popupWindow.isPresent()) {
                loginPage.popupSkipButton.click();

                // Make sure the pop up window is not present
                expect(loginPage.popupWindow.isPresent()).toBe(false);
            }
        });

        it('should show about page with version, build and relevant information', function () {
            menuPage.helpButton.click();
            menuPage.getMenuItemElm('About').click();
            expect(menuPage.modalDialog.isDisplayed()).toBe(true);
            var aboutContent = menuPage.aboutDialogContent.getText();
            expect(aboutContent).toContain('Version:');
            expect(aboutContent).toContain('Build:');
            expect(aboutContent).toContain('Credits');
            expect(aboutContent).toContain('Thanks');

            // close the about screen by passing esc key
            browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        });
    });

    describe('Menu Window Deselection and Selection', function () {

        it('Menu Window Deselection', function () {

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //UnSelect 'MainGrid' Option
            menuPage.MenuWindowMainGrid.click();

            //Verify Whether the Main Grid is hidden or NOT
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    expect(topRightPage.topRightName.getAttribute('value')).not.toEqual(cols[1].getText());
                });
            });

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //UnSelect 'Form' Option
            menuPage.MenuWindowForm.click();

            //Verify Whether the Form is hidden or NOT
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    expect(cols[1].getText()).not.toEqual(topRightPage.topRightName.getAttribute('value'));
                });
            });

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //UnSelect 'Child Grid' Option
            menuPage.MenuWindowChildGrid.click();

            //Verify Whether the Child Grid is hidden or NOT
            bottomRightPage.ChildTable.map(function (RightTableitem) {
                return RightTableitem.getText();
            }).then(function (labels) {
                return labels.filter(function (label) {
                    expect(label).not.toContain('Order Number');
                });
            });

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //UnSelect 'REST Log' Option
            menuPage.MenuWindowRESTLog.click();

            var RESTLogPageTitle = menuPage.MenuWindowRESTLogTitle.getText();
            expect(RESTLogPageTitle).toEqual('Most recent requests');

            //Click Save Button
            menuPage.MenuWindowSaveButton.click();
        });

        it('Menu Window Selection', function () {

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //Select MainGrid Option
            menuPage.MenuWindowMainGrid.click();

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //Select 'Form' Option
            menuPage.MenuWindowForm.click();

            //Click Main Window Menu Icon
            menuPage.MenuWindowButton.click();

            //Select 'Child Grid' Option
            menuPage.MenuWindowChildGrid.click();

            //=============================================================================================================
            //Verify Whether the 'Main Grid' is hidden or NOT
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    expect(topRightPage.topRightName.getAttribute('value')).toEqual(cols[1].getText());
                });
            });

            //Verify Whether the 'Form' is hidden or NOT
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    expect(cols[1].getText()).toEqual(topRightPage.topRightName.getAttribute('value'));
                });
            });

            //Verify Whether the 'Child Grid' is hidden or NOT
            bottomRightPage.ChildTable.map(function (RightTableitem) {
                return RightTableitem.getText();
            }).then(function (labels) {
                return labels.filter(function (label) {
                    expect(label).toContain('Order Number');
                });
            });

            //Click 'Save' Button
            menuPage.MenuWindowSaveButton.click();
        });
    });

    describe('Menu Share > ', function () {

        it('Menu Share', function () {
            //Click Tools Menu
            menuPage.toolsMenu.click();
            //Click Share link
            menuPage.ToolsWindowShare.click();
            browser.sleep(SleepTime);

            //Get URL from ShareContentWindow
            var content = menuPage.ToolsWindowShareContent.getText().then(function (text) {
                //Click Close Button in Share Window
                menuPage.ToolsWindowShareCloseButton.click();
                //paste link on the browser address
                menuPage.openNewWindow(text);
                browser.sleep(SleepTime);
                //Verify Whether the same screen should be displayed
                leftPage.topLeftTableRows.first().then(function (firstRow) {
                    leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                        expect(topRightPage.topRightName.getAttribute('value')).toEqual(cols[1].getText());
                    });
                });
                //Closing Newly opened browser and Activating old browser
                browser.getAllWindowHandles().then(function (handles) {
                    oldWindowHandle = handles[1];
                    newWindowHandle = handles[0];
                    browser.switchTo().window(oldWindowHandle).then(function () {
                        browser.driver.close().then(function () {
                            browser.switchTo().window(newWindowHandle);
                        })
                    })
                })
            });
        });
    });

    describe('Stylesheet upload >', function () {
        it('should Toggle to author mode and click on Menu -App settings', function () {
            menuPage.toggleAuthor();

            // Click on app settings
            menuPage.toolsMenu.click();
            menuPage.appSettingsElm.click();

            // download sample skin
            menuPage.skinsTab.click();
            menuPage.downloadSkinLink.click();
            menuPage.createNewSkinButton.click();
            menuPage.editLastSkin();

            var fileToUpload = 'files/espresso.css';
            var absolutePath = path.resolve(__dirname, fileToUpload);
            menuPage.chooseFileButton.sendKeys(absolutePath);
            menuPage.saveSkinButton.click();

            // Delete the newly created skin
            browser.sleep(SleepTime);
            menuPage.deleteLastSkin();
            commonPage.acceptAlert();
        });
    });
});