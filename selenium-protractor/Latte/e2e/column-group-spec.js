var us = require('underscore');
var commonPage = require('./pages/commonPage.js');
var menuPage = require('./pages/menuPage.js');

describe('Column grouping>', function () {

    //Store the current window handle for retuning
    var winHandleBefore = browser.getWindowHandle();

    it('Toggle to author mode >', function () {
        browser.switchTo().frame(0);
        menuPage.toolsMenu.click();
        menuPage.toggleAuthorElm.click();
    });

    it('Select orders Table and Click Book Icon >', function () {
        commonPage.bookIcon.click();
    });

    it('AddGroup >', function () {
        commonPage.columnOrder.click();
        commonPage.bookWindowAddNewGroupButton.click();
        commonPage.bookWindowAddNewGroupButton.click();

        //Enter Group Name
        commonPage.bookWindow.then(function (AddGroupWindow) {
            commonPage.bookWindowAddNewGroupTitle(AddGroupWindow).then(function (GetGroupNameInputCount) {
                commonPage.bookWindow.then(function (GetGroupNameInput) {
                    commonPage.bookWindowAddNewGroupTitle(GetGroupNameInput).get(1).clear();
                    commonPage.bookWindowAddNewGroupTitle(GetGroupNameInput).get(1).sendKeys('Order');
                    commonPage.bookWindowAddNewGroupTitle(GetGroupNameInput).last().clear();
                    commonPage.bookWindowAddNewGroupTitle(GetGroupNameInput).last().sendKeys('Financial');
                });
            });
        });
    });

    /**
     *  This method moves attribute between groups
     */
    function moveAttributes(sourceGroupRowNumber, attributeRowNumber, targetGroupRowNumber) {
        var source = commonPage.bookWindowAttributesRow(sourceGroupRowNumber, attributeRowNumber);
        var target = commonPage.bookWindowGroupRow(targetGroupRowNumber);
        browser.actions().dragAndDrop(source, target).perform();
        browser.sleep(1000);
    }

    it('Move Attributes from Default Group to new groups', function () {
        //Default Group Contains 6 attributes
        commonPage.columnOrder.click();

        //Move attributes 'Ident', 'IsReady', 'SalesRepName' to "Orders" Group
        moveAttributes(0, 5, 1);
        moveAttributes(0, 5, 1);
        moveAttributes(0, 5, 1);

        //Clicking Default Check Icon To appear last group
        element(by.model('showColumnDetails')).click();
        element(by.model('showColumnDetails')).click();

        //Move attributes 'Amount Unpaid', 'Amount Paid', 'Amount Total', 'Amount Discounted'.  to "Financial" Group
        moveAttributes(0,1,2);
        moveAttributes(0,1,2);
        moveAttributes(0,1,2);
        moveAttributes(0,1,2);

        //Verify whether the groups have been added or not
        commonPage.bookWindow.then(function (AddGroupWindow) {
            commonPage.bookWindowAddNewGroupTitle(AddGroupWindow).then(function (GroupIconCount) {
                expect(GroupIconCount.length).toEqual(3);
            });
        });
        //Close Wiindow
        commonPage.closeButtonInaddGroupWindow.click();

    });

    it('UnSelect Attribute to Default Group >', function () {
        commonPage.bookIcon.click();

        commonPage.columnOrder.click();

        //Move attributes 'Ident', 'IsReady', 'SalesRepName' to "Default" Group
        moveAttributes(1,1,0);
        moveAttributes(1,1,0);
        moveAttributes(1,1,0);

        //Clicking Default Check Icon To appear last group
        element(by.model('showColumnDetails')).click();
        element(by.model('showColumnDetails')).click();

        //Move attributes 'Amount Unpaid', 'Amount Paid', 'Amount Total', 'Amount Discounted'.  to "Default" Group
        moveAttributes(2,1,0);
        moveAttributes(2,1,0);
        moveAttributes(2,1,0);
        moveAttributes(2,1,0);
    });

    it('Delete Group >', function () {
        //Delete Group
        commonPage.bookWindow.then(function (AddGroupWindow) {
            commonPage.bookWindowAddNewGroupTitle(AddGroupWindow).then(function (GetDeleteIconCount) {
                for (var i = 0; i < GetDeleteIconCount.length - 1; i++) {
                    commonPage.bookWindow.then(function (DeleteIcon) {
                        commonPage.bookWindowDeleteGroupIcon(DeleteIcon).get(2).click();
                    });
                }
            });
        });
        //Verify whether the groups have been deleted or not
        commonPage.bookWindow.then(function (AddGroupWindow) {
            commonPage.bookWindowAddNewGroupTitle(AddGroupWindow).then(function (GroupIconCount) {
                console.log(GroupIconCount.length);
                expect(GroupIconCount.length).toEqual(1);
            });
        });
        commonPage.closeButtonInaddGroupWindow.click();

        //commonPage.toolsMenu.click();

        //Click toolsWindowLogOut link
        //commonPage.toolsWindowLogOut.click();
    });

    it('Toggle to author mode and go back to Logic Designer', function () {
        menuPage.toolsMenu.click();
        menuPage.toggleAuthorElm.click();
        browser.switchTo().window(winHandleBefore);
    });

});
