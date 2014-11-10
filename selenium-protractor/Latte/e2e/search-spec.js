/**
 * This contains specs to test the search feature.
 */

var util = require('util');
var us = require('underscore');

var leftPage = require('./pages/leftPage.js');

describe('Search >', function() {

    beforeEach(function() {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    it('should open search options pop up', function(){
        // click on the caret (small triangle) in the Search box
        leftPage.searchOptionsButton.click();
        expect(leftPage.filterFlyOut.isDisplayed()).toBeTruthy();

        // give some time to load the popup
        browser.sleep(SleepTime);

        // Select name from the select
        leftPage.filterTypeSelectName.click();

        // Enter Jill in the search text
        leftPage.filterValue.sendKeys('Jill');

        // Click on search icon
        leftPage.searchIcon.click();
        browser.sleep(SleepTime);
    });


    it('should verify that the left grid now contains only one row: "Jill Exports Ltd."', function(){
        var leftTableRows = leftPage.getLeftTableRowArray();
        var customerName;

        leftTableRows.then(function(rows){

            // pick the bravo hardware customer
            var jillCustomer = us.findWhere(rows, {name: browser.params.customer.search.name});
            customerName = jillCustomer.name;

            expect(customerName).toEqual('Jill Exports Ltd.');
        })
    });
});
