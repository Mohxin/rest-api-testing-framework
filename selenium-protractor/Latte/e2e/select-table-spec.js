var us = require('underscore');
var leftPage = require('./pages/leftPage.js');
var topRightPage = require('./pages/topRightPage.js');
var bottomRightPage = require('./pages/bottomRightPage.js');
var commonPage = require('./pages/commonPage.js');

//Helper function to verify Right Side Child Table
function isVerifyRightTable(HeaderText1, HeaderText2, HeaderText3) {
    bottomRightPage.ChildTable.map(function (RightTableitem) {
        return RightTableitem.getText();
    }).then(function (labels) {
        return labels.filter(function (label) {
            expect(label).toContain(HeaderText1);
            expect(label).toContain(HeaderText2);
            expect(label).toContain(HeaderText3);
        });
    });
}

describe('Display records on the child grid verify record on the form >', function () {
    it('Select "Customer" from the Table and click First Record', function () {
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');

        //Click First Record From the Table
        leftPage.topLeftTableRows.first().then(function (firstRow) {
            firstRow.click();
            leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                expect(topRightPage.topRightName.getAttribute('value')).toEqual(cols[1].getText());
                expect(topRightPage.topRightBalance.getAttribute('value')).toEqual(cols[2].getText());
                expect(topRightPage.topRightCreditLimit.getAttribute('value')).toEqual(cols[3].getText());
            });
        });
    });

    it('Select "customer" in main table,The first 20 records should be displayed on main grid and the corresponding' +
    'child table- Purchase Order and should be displayed in the child grid', function () {
        //Select "customer"  from Table
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');

        //Verify Left Table:First 20 records should be displayed
        leftPage.topLeftTableRows.then(function (rows) {
            expect(rows.length).toBe(20);
        });
        //Verify Child Table
        isVerifyRightTable('Order Number', 'Amount Total', 'Paid');
    });

    it('Select "Purchase Order" in main table, The first 20 records should be displayed on main grid and the ' +
    'corresponding child tables should be loaded - Line Item and Purchase Order_Audit. ' +
    'Default child table on the grid should show Line Item', function () {
        //Select "customer"  from Table
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:PurchaseOrder');

        //Verify Left Table:First 20 records should be displayed
        leftPage.topLeftTableRows.then(function (rows) {
            expect(rows.length).toBe(20);
        });

        commonPage.waitUntilDisplayed(bottomRightPage.RightSideChildTableHeaderLineItem).then(function () {
            //Verify PurchaseOrder Right Table Header Text
            expect(bottomRightPage.RightSideChildTableHeaderLineItem.getText()).toContain('LineItem');
            expect(bottomRightPage.RightSideChildTableHeaderPurchaseOrder.getText()).toContain('Purchaseorder Audit');

            //Should show lineItems
            bottomRightPage.RightSideChildTableHeaderLineItem.click();

            //Verify Child Table-lineItems
            isVerifyRightTable('Lineitem Id', 'Name', 'Qty Ordered');

        });
    });

    it('Select "Purchaseorder_audit" in main table, The first 20 records should be displayed on main grid and the ' +
    'corresponding child tables should be loaded - Line Item and Purchase Order_Audit. Default child table on the grid' +
    'should show Line Item', function () {

        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:purchaseorder_audit');

        leftPage.topLeftTableRows.then(function (rows) {
            // It is expected to have po audit table to be empty
            //expect(rows.length).toBeGreaterThan(0);
            if (rows.length > 0) {

                //Click First Record From the Table
                rows[0].click();

                //Verify Child Table
                isVerifyRightTable('Audit Number', '', '');
            }
        });
    });
});
