/**
 * This contains specs to test the search feature.
 */

var util = require('util');
var us = require('underscore');

var HomePage = require('./pages/homePage.js');
var InsertPage = require('./pages/insertPage.js');
var EditPage = require('./pages/editPage.js');

describe('Insert >', function () {

    var bravoCustomerBalance;

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('should get Bravo customers current balance for verification', function () {
        var leftTableRows = HomePage.getLeftTableRowArray();

        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});

            // hold the balance to verify later
            bravoCustomerBalance = bravoCustomer.balance;
        });
    });

    it('should select the LineItem tab', function () {
//        HomePage.selectDefaultCustomer(us);
//        HomePage.getPurchaseDetailsOfDefaultCustomer();
        HomePage.rightTableLineItemTab().click();
    });

    it('should add a row to line item', function () {
        // At the bottom of the bottom-right grid, click Insert
        var insertButton = InsertPage.insertButton();
        insertButton.getText().then(function (txt) {
            expect(txt).toEqual('Insert');
        });
        insertButton.click();
        browser.sleep(SleepTime);
    });

    it('should display select line item modal dialog', function () {
        // In the new row that just appeared, click the up-arrow icon in the Name column
        InsertPage.getInsertRowSelectItemIcon().then(function (addArrow) {
            addArrow.click();
            expect(InsertPage.LineItemModalDialog.isDisplayed());
        });
    });

    it('should click the "Select" link for the "Bench grinder" row ' +
        ', enter 2 in the Qty Ordered column and save new line item', function () {

        var rows = InsertPage.getMappedLineItem();
        rows.then(function (elms) {
            var lineItem = us.findWhere(elms, {name: browser.params.lineItem});
            var selectLink = lineItem.rowElm.element(by.linkText('Select'));
            selectLink.click();

            // enter 2 in the Qty Ordered column
            InsertPage.getInsertRowSelectItemQty().then(function (cols) {

                // do double click to make the cell editable
                browser.actions().doubleClick(cols[3]).perform();

                // Enter 2 as order quantity.
                cols[3].element(by.model('row.entity.qty_ordered')).sendKeys('2');

                browser.sleep(SleepTime);

                // save new line item
                EditPage.saveButton.click();
            })
        });
    });

    it('should verify that the left grid bravo customer Balance has not changed', function () {
        var leftTableRows = HomePage.getLeftTableRowArray();

        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});

            // verify balance
            expect(bravoCustomer.balance).toEqual(bravoCustomerBalance);
        });
    });

    it('should uncheck the Paid checkbox, save and verify that the left grid rows Balance has changed', function () {
        // The previous save click pops up a confirmation alert message that makes the topRightButton click invalid
        // To avoid that make the system wait for few seconds.
        browser.sleep(SleepTime);
        EditPage.topRightPaid.click();
        EditPage.saveButton.click();

        var leftTableRows = HomePage.getLeftTableRowArray();

        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});

            // verify balance
            expect(bravoCustomer.balance).not.toEqual(bravoCustomerBalance);
        });
    });

});
