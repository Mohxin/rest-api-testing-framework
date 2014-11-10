/**
 * This page tests sort feature
 */
var us = require('underscore');
var leftPage = require('./pages/leftPage.js');
var commonPage = require('./pages/commonPage.js');

describe('Sorting >', function () {

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    describe('Sort feature', function () {

        // Helper function to find a column is sorted or not
        function isSorted(columnName, dataType, direction) {
            var sorted = leftPage.getLeftTableRowArray().then(function (arr) {
                var len = arr.length - 1;
                var valueOne;
                var valueTwo;

                for (var i = 0; i < len; ++i) {
                    switch (dataType) {
                        case 'string':
                            valueOne = arr[i][columnName].toLowerCase();
                            valueTwo = arr[i + 1][columnName].toLowerCase();
                            break;
                        case 'int':
                            valueOne = parseFloat(arr[i][columnName].replace(/[^0-9-.]/g, ''));
                            valueTwo = parseFloat(arr[i + 1][columnName].replace(/[^0-9-.]/g, ''));
                            break;
                    }

                    if (direction == 'asc' ? valueOne > valueTwo : valueOne < valueTwo) {
                        return false;
                    }
                }
                return true;
            });
            expect(sorted).toBeTruthy();
        }

        // This also takes care of multiple sorts
        it('should sort customer table columns and verify', function () {
            leftPage.leftTableSortColumns.each(function (headerColumn) {
                headerColumn.getText().then(function (columnTitle) {
                    switch (columnTitle) {
                        case 'Name':
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('name', 'string', 'asc');
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('name', 'string', 'desc');
                            break;
                        case 'Balance':
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('balance', 'int', 'asc');
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('balance', 'int', 'desc');
                            break;
                        case 'Credit Limit':
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('creditLimit', 'int', 'asc');
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            browser.sleep(SleepTime);
                            isSorted('creditLimit', 'int', 'desc');
                            break;
                    }
                });
            });
            browser.sleep(SleepTime);
        });

        it('should sort customer table columns and verify', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:LineItem');
            // Fetch more
            leftPage.fetchMoreButton().click();

            leftPage.leftTableSortColumns.each(function (headerColumn) {
                headerColumn.getText().then(function (columnTitle) {
                    switch (columnTitle) {
                        case 'Customer Name':
                            leftPage.getLeftTableHeaderButton(headerColumn).click();
                            expect(leftPage.parentColumnSortTipElm.isDisplayed()).toBe(true);
                            break;
                    }
                });
            });
        });


        it('Go to customer table', function(){
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
        });
    });
});