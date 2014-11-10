var us = require('underscore');

var commonPage = require('./pages/commonPage.js');
var menuPage=require('./pages/menuPage.js');


describe('Select Sample Project and Open Live Browser >', function()
{

    beforeEach(function() {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('Toggle to author mode >', function () {
        // There is a weird issue here. When I run the below statement in Mac it did not work
        // and hung there for a long time
        //browser.switchTo().frame(element(by.id('liveBrowserIframe')));
        // changing the frame(0) worked fine in Mac.
        browser.switchTo().frame(0);

        commonPage.waitUntilDisplayed(menuPage.toolsMenu).then(function () {
            menuPage.toolsMenu.click();
        });
        commonPage.waitUntilDisplayed(menuPage.toggleAuthorElm).then(function () {
            menuPage.toggleAuthorElm.click();
            browser.sleep(SleepTime);
        });
    });

    it('click the "Base Salary" gear icon Row and specify the settings >', function () {
            commonPage.selectDropDownByText(commonPage.tableSelector, 'sample:employees');
            //Uncheck Name Column to appear "Base Salary" Column in Left TableHeader
            commonPage.waitUntilDisplayed(commonPage.leftTableHeaderBookIcon).then(function(){
                commonPage.leftTableHeaderBookIcon.click();
            });
            commonPage.leftTableHeaderBookIconNameOption.click();
            commonPage.closeButtonInaddGroupWindow.click();
            browser.sleep(SleepTime);
            //Click  Base Salary gear icon and enter values
            commonPage.waitUntilDisplayed(commonPage.leftTableHeaderBaseSalarygearIcon).then(function(){
                commonPage.leftTableHeaderBaseSalarygearIcon.click();
            });

            //browser.sleep(5000);
            commonPage.waitUntilDisplayed(commonPage.baseSalaryPlusIcon).then(function(){
                commonPage.baseSalaryPlusIcon.click();
            });
            commonPage.baseSalaryEvaluation.clear();
            commonPage.baseSalaryEvaluation.sendKeys('row.employee_type == "exempt"');
            commonPage.baseSalaryCSSSelector.clear();
            commonPage.baseSalaryCSSSelector.sendKeys('.column-container');
            commonPage.baseSalaryTrueStyle.clear();
            commonPage.baseSalaryTrueStyle.sendKeys('display: block;');
            commonPage.baseSalaryFalseStyle.clear();
            commonPage.baseSalaryFalseStyle.sendKeys('display: none;');
            commonPage.waitUntilDisplayed(commonPage.gearSave).then(function(){
            commonPage.gearSave.click();
            });
            //Check Name Column to appear in Left Table Header
            commonPage.waitUntilDisplayed(commonPage.leftTableHeaderBookIcon).then(function(){
                commonPage.leftTableHeaderBookIcon.click();
            });
            commonPage.leftTableHeaderBookIconNameOption.click();
            commonPage.closeButtonInaddGroupWindow.click();

    });

    it('insert Row and verify Base Salary Field >', function () {

        commonPage.waitUntilDisplayed(commonPage.leftTableInsertButton).then(function(){
            commonPage.leftTableInsertButton.click();
        });
        browser.sleep(SleepTime);
        commonPage.employeeTypeID.clear();
        commonPage.employeeTypeID.sendKeys('exempt');
        expect(commonPage.rightFormBaseSalaryInput.isDisplayed()).toBeTruthy();
        commonPage.employeeTypeID.clear();
        commonPage.employeeTypeID.sendKeys('SalesRep');
        expect(commonPage.rightFormBaseSalaryInput.isDisplayed()).toBeUndefined();
    });
});
