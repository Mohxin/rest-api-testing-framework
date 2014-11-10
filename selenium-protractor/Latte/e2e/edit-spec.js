/**
 * This page tests edit feature
 */
var util = require('util');
var us = require('underscore');

var HomePage = require('./pages/homePage.js');
var EditPage = require('./pages/editPage.js');

describe('Edit >', function () {

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('should make the pages editable', function () {
        EditPage.tools.click();
        EditPage.readOnlyButton.click();
        HomePage.selectDefaultCustomer(us);
        HomePage.getPurchaseDetailsOfDefaultCustomer();
    });

    it('should select the LineItem tab', function () {
        HomePage.rightTableLineItemTab().click();
    });

    it('should be able to edit notes and mark paid and save', function () {

        // Tick the order payment only if it is unpaid
        var isPaid = EditPage.topRightPaid.getAttribute('checked');
        EditPage.notes.sendKeys(' - test');

        isPaid.then(function (paid) {

            if (paid == null) {
                EditPage.topRightPaid.click();
            }

            // wait for the previous save to complete
            browser.sleep(SleepTime);
            EditPage.saveButton.click();
        });
    });

    it('should verify that the Bravo Hardware row in the left grid now has a Balance of $0.00', function () {
        var leftTableRows = HomePage.getLeftTableRowArray();
        var balance;

        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});

            // hold the balance and credit limit to verify later
            balance = bravoCustomer.balance;

            expect(balance).toEqual('$0.00');
        })
    })
});