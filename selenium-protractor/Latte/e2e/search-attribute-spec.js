var leftPage = require('./pages/leftPage.js');
var topRightPage = require('./pages/topRightPage.js');
var commonPage = require('./pages/commonPage.js');
var bottomRightPage = require('./pages/bottomRightPage.js');

describe('Search Attributes >', function () {

    describe('Clear search and Form display >', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Search Attribute and verify Form and Search fields by clicking zoom in on child grid', function () {
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                firstRow.click();

                //Enter Value in Search Field
                topRightPage.SearchAttribute.sendKeys('Bravo');

                //Verify whether the form fields are cleared or not
                topRightPage.topRightFormFieldItemsCount.then(function (Items) {
                    expect(Items.length).toEqual(0);
                });

                bottomRightPage.RightSideChildTableEmployeePicutureZoomInIcon.click();

                //Verify Search Field Should be Cleared`or not
                topRightPage.SearchAttribute.getAttribute('value').then(function (DefaultAttributeValue) {
                    expect(DefaultAttributeValue).not.toEqual('Bravo');
                });

            });
        });

        it('Search Attribute and verify Form and Search fields by Selecting different Row', function () {
            //Enter Value in Search Field
            topRightPage.SearchAttribute.sendKeys('Bravo');

            //Verify whether the form fields are cleared or not
            topRightPage.topRightFormFieldItemsCount.then(function (Items) {
                expect(Items.length).toEqual(0);
            });

            //Click Last Record From the Table
            leftPage.topLeftTableRows.last().then(function (LastRow) {
                LastRow.click();
            });

            //Verify Search Field Should be Cleared``or not
            topRightPage.SearchAttribute.getAttribute('value').then(function (DefaultAttributeValue) {
                expect(DefaultAttributeValue).not.toEqual('Bravo');
            });

        });

        it('Search Attribute and verify Form and Search fields by Changing table', function () {
            //Enter Value in Search Field
            topRightPage.SearchAttribute.sendKeys('Bravo');

            //Verify whether the form fields are cleared or not
            topRightPage.topRightFormFieldItemsCount.then(function (Items) {
                expect(Items.length).toEqual(0);
            });

            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:PurchaseOrder');

            //Verify Customer Name
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                firstRow.click();

                //Verify Search Field Should be Cleared``or not
                topRightPage.SearchAttribute.getAttribute('value').then(function (DefaultAttributeValue) {
                    expect(DefaultAttributeValue).not.toEqual('Bravo');
                });
            });
        });
    });

    describe('Attributes to be displayed >', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });
        it('Customer Table:search attributes text field,search by column name', function () {
            //Select PurchaseOrder table
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
            //Click Last Record From the Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                firstRow.click();
                //Enter Value in Search Field and Verify Column "Name" field
                topRightPage.SearchAttribute.clear();
                topRightPage.SearchAttribute.sendKeys('Name');
                topRightPage.topRightFormName.getInnerHtml().then(function (AttributeName) {
                    expect(AttributeName).toContain('Name');
                });

                //Enter Value in Search Field and Verify Column "Balance" field
                topRightPage.SearchAttribute.clear();
                topRightPage.SearchAttribute.sendKeys('Balance');
                topRightPage.topRightFormName.getInnerHtml().then(function (AttributeName) {
                    expect(AttributeName).toContain('Balance');
                });

                //Enter Value in Search Field and Verify Column "Credit Limit" field
                topRightPage.SearchAttribute.clear();
                topRightPage.SearchAttribute.sendKeys('Credit Limit');
                topRightPage.topRightFormName.getInnerHtml().then(function (AttributeName) {
                    expect(AttributeName).toContain('Credit Limit');
                });

                //Enter Value in Search Field and Verify Main Grid Multiple Fields
                topRightPage.SearchAttribute.clear();
                topRightPage.SearchAttribute.sendKeys('a');
                topRightPage.topRightFormName.getInnerHtml().then(function (AttributeName) {
                    expect(AttributeName).toContain('Name');
                    expect(AttributeName).toContain('Balance');
                });

                //Enter Value in Search Field and Verify Child Grid Multiple Fields
                bottomRightPage.RightSideChildTableEmployeePicutureZoomInIcon.click();
                topRightPage.SearchAttribute.clear();
                topRightPage.SearchAttribute.sendKeys('a');
                topRightPage.topRightFormName.getInnerHtml().then(function (AttributeName) {
                    expect(AttributeName).toContain('Amount Total');
                    expect(AttributeName).toContain('Paid');
                    expect(AttributeName).toContain('Customer Name');
                    expect(AttributeName).toContain('Salesrep Id');
                });
            });
        });
    });
});
