/**
 * This page tests edit feature
 */
var us = require('underscore');

var HomePage = require('./pages/homePage.js');
var EditPage = require('./pages/editPage.js');
var InsertPage = require('./pages/insertPage.js');
var testCollab = require('../TestCollab/testCollab.js');

describe('Edit more >', function () {

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    function verifyReadOnlyMessage() {
        expect(EditPage.readOnlyNotifier.isDisplayed()).toBeTruthy();
        EditPage.closeNotification.click();
    }

    describe('Update in readonly mode >', function () {

        it('should Try Update in readonly mode', function () {

            // Need to give a little delay to get the page fully loaded
            browser.sleep(SleepTime);
            EditPage.tools.click();
            EditPage.readOnlyButton.click();
            EditPage.customerName.click();
            verifyReadOnlyMessage();

            EditPage.customerBalance.click();
            verifyReadOnlyMessage();

            EditPage.customerCreditLimit.click();
            verifyReadOnlyMessage();

            // Get the child grid and its form
            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            HomePage.rightTableLineItemTab().click();

            HomePage.topRightOrderNum.click();
            verifyReadOnlyMessage();

            // This is failing now
//        HomePage.topRightPaid.click();
//        verifyReadOnlyMessage();

            EditPage.notes.click();
            verifyReadOnlyMessage();

            EditPage.childFormCustomerName.click();
            verifyReadOnlyMessage();

            EditPage.childFormSalesRep.click();
            verifyReadOnlyMessage();

            InsertPage.getLineItemGridFirstRowColumns().then(function (cols) {
                // do double click to try to edit
                browser.actions().doubleClick(cols[2]).perform();
                verifyReadOnlyMessage();
            });

        });

        afterEach(function () {

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[0];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        })

    });

    describe('Update credit_limit >', function () {

        it('should click on "Read Only" on the menu bar and Update "credit_limit" for any customer', function () {

            // Need to give a little delay to get the page fully loaded
            browser.sleep(SleepTime);

            EditPage.tools.click();
            EditPage.readOnlyButton.click();

            HomePage.selectDefaultCustomer(us);

            EditPage.customerCreditLimit.clear();
            EditPage.customerCreditLimit.sendKeys('10000');
            EditPage.saveButton.click();

            // Need this delay to get the page refreshed before reading the items
            browser.sleep(SleepTime);
            var leftTableRows = HomePage.getLeftTableRowArray();
            var creditLimit;
            leftTableRows.then(function (rows) {
                // pick the bravo hardware customer
                var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});

                // hold the balance and credit limit to verify later
                creditLimit = bravoCustomer.creditLimit;

                expect(creditLimit).toEqual('$10,000.00');
            });
        });

        afterEach(function () {

            // the status update needs to be called in afterEach block
            // only then the tests are executed first and results are updated next
            var execCase = ExecutionData.ExecutionCase[1];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        })

    });

    describe('Undo feature (icon on grid) >', function () {
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        it('should update any record on the main grid or child grid ' +
            'and revert it using undo icon on the gid and undo button in the menu', function () {
            // Need to give a little delay to get the page fully loaded
            browser.sleep(SleepTime);

//            EditPage.readOnlyButton.click();

            HomePage.getLeftTableRowArray().then(function (customers) {
                var bravoCustomer = us.findWhere(customers, {name: browser.params.customer.selected.name});

                // double click to edit credit limit
                var creditLimit = HomePage.leftTableCreditLimit(bravoCustomer.rowElm);
                var clBeforeUpdate;
                creditLimit.getText().then(function (cl) {
                    clBeforeUpdate = cl;
                });
                browser.actions().doubleClick(creditLimit).perform();

                creditLimit.clear();
                // Input some random number between 1000 and 10000
                creditLimit.sendKeys(HomePage.getRandomNumber());

                // Click on some where on the grid to get the grid updated with new value
                bravoCustomer.rowElm.click();
                browser.sleep(SleepTime);
                // Go again to the bravoCustomer to undo
                HomePage.getUndoIconOnLeftTable(bravoCustomer.rowElm).click();
                creditLimit.getText().then(function (cl) {
                    expect(cl).toEqual(clBeforeUpdate);
                });
            });
        });
        it('should check the child grid undo feature', function () {
            HomePage.rightTableRows().then(function (orders) {
                orders[0].then(function (order) {
                    order.click();

                    var paidCheckBox = HomePage.rightTableRowPaid(order);
                    var initialPaidValue = paidCheckBox.getText()
                        .then(function (paid) {
                            return paid;
                        });

                    // come out of the text box
                    HomePage.rightTableRowOrderNum(order).click();

                    paidCheckBox.click();
                    browser.sleep(1000)

                    HomePage.getUndoIconOnRightTable(order).click();

                    HomePage.rightTableRowPaid(order).getText()
                        .then(function (paid) {
                            expect(initialPaidValue).toEqual(paid);
                        });
                });
            });
        });

        it('should repeat the same and test Undo button', function () {

            HomePage.getLeftTableRowArray().then(function (customers) {
                var bravoCustomer = us.findWhere(customers, {name: browser.params.customer.selected.name});

                // double click to edit credit limit
                var creditLimit = HomePage.leftTableCreditLimit(bravoCustomer.rowElm);
                var clBeforeUpdate;
                creditLimit.getText().then(function (cl) {
                    clBeforeUpdate = cl;
                });
                browser.actions().doubleClick(creditLimit).perform();

                creditLimit.clear();
                creditLimit.sendKeys(HomePage.getRandomNumber());

                // Click on some where on the grid to get the grid updated with new value
                bravoCustomer.rowElm.click();

                // Click on the top nav Undo button
                EditPage.UndoButton.click();
                creditLimit.getText().then(function (cl) {
                    expect(cl).toEqual(clBeforeUpdate);
                });
            });

        });

        it('should repeat check the child grid undo feature with Undo button on top nav', function () {

            // check the child grid undo feature
            HomePage.rightTableRows().then(function (orders) {
                orders[0].then(function (order) {
                    order.click();

                    // Amount was not editable at some time
                    /*var amount = HomePage.rightTableRowAmount(order);
                     var initialAmount = amount.getText().then(function (orderAmount) {
                     return orderAmount;
                     });*/
                    var paidCheckBox = HomePage.rightTableRowPaid(order);
                    var initialPaidValue = paidCheckBox.getText()
                        .then(function (paid) {
                            return paid;
                        });

                    // come out of the text box
                    HomePage.rightTableRowOrderNum(order).click();

                    paidCheckBox.click();

                    /*browser.actions().doubleClick(amount).perform();
                     amount.clear();
                     amount.sendKeys(HomePage.getRandomNumber());*/
                    //order.click();

                    EditPage.UndoButton.click();

                    /*amount.getText().then(function (orderAmount) {
                     expect(initialAmount).toEqual(orderAmount);
                     });*/
                    HomePage.rightTableRowPaid(order).getText()
                        .then(function (paid) {
                            expect(initialPaidValue).toEqual(paid);
                        });
                });
            });
        });

        it('should undo in left grid and in right grid then click on Undo button at top nav and verify', function () {
            var clBeforeUpdate;
            var initialPaidValue;
            HomePage.getLeftTableRowArray().then(function (customers) {

                var bravoCustomer = us.findWhere(customers, {name: browser.params.customer.selected.name});
                // double click to edit credit limit
                var creditLimit = HomePage.leftTableCreditLimit(bravoCustomer.rowElm);
                creditLimit.getText().then(function (cl) {
                    clBeforeUpdate = cl;
                });
                browser.actions().doubleClick(creditLimit).perform();

                creditLimit.clear();
                creditLimit.sendKeys(HomePage.getRandomNumber());

                // Click on some where on the grid to get the grid updated with new value
                bravoCustomer.rowElm.click();
                browser.sleep(SleepTime);

                // check the child grid undo feature
                HomePage.rightTableRows().then(function (orders) {
                    orders[0].then(function (order) {
                        order.click();

                        // Amount was not editable at some time
                        var paidCheckBox = HomePage.rightTableRowPaid(order);
                        initialPaidValue = paidCheckBox.getText()
                            .then(function (paid) {
                                return paid;
                            });

                        // come out of the text box
                        HomePage.rightTableRowOrderNum(order).click();
                        paidCheckBox.click();
                    });
                });
            });
            // Click on the top nav Undo button
            EditPage.UndoButton.click();

            // Need to go to the grid elements again to verify the undone
            HomePage.getLeftTableRowArray().then(function (customers) {
                var bravoCustomer = us.findWhere(customers, {name: browser.params.customer.selected.name});

                // double click to edit credit limit
                var creditLimit = HomePage.leftTableCreditLimit(bravoCustomer.rowElm);

                creditLimit.getText().then(function (cl) {
                    expect(cl).toEqual(clBeforeUpdate);
                });

                // check the child grid undo feature
                HomePage.rightTableRows().then(function (orders) {
                    orders[0].then(function (order) {
                        order.click();
                        var paidCheckBox = HomePage.rightTableRowPaid(order);
                        HomePage.rightTableRowPaid(order).getText()
                            .then(function (paid) {
                                expect(initialPaidValue).toEqual(paid);
                            });
                    });
                });
            });
        });

        it('should update the test case status in testcollab.com', function () {
            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[2];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        });
    });

    xdescribe('Delete record >', function () {

        it('should select any row on the grids and click on Delete option', function () {

            //EditPage.readOnlyButton.click();

            var deletingCustomer;

            // Get the child grid and its form
            HomePage.getLeftTableRowArray().then(function (customers) {
                deletingCustomer = customers[customers.length - 1];
                deletingCustomer.rowElm.click();
                HomePage.getDeleteIconOnLeftTable(deletingCustomer.rowElm).click();
            });

            EditPage.saveButton.click();
            // Need this delay to get the page refreshed before reading the items
            browser.sleep(SleepTime);

            // Get the child grid and its form
            HomePage.getLeftTableRowArray().then(function (customers) {
                var deletedCustomer = us.findWhere(customers, {name: deletingCustomer.name});
                expect(deletedCustomer).toBeUndefined();
            });
        });

        afterEach(function () {

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[3];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        })

    });

    describe('Update Purchase Order table', function () {

        it('should update the values of Purchase Order on the form', function () {

            var noteToUpdate = 'Automated Test - Updates';
            var paidValueBefore;
            // get the selected customer
//            EditPage.tools.click();
//            EditPage.readOnlyButton.click();

            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();

            EditPage.topRightPaid.getAttribute('checked').then(function (val) {
                paidValueBefore = val;
                console.log(paidValueBefore)
            });
            EditPage.notes.clear();

            EditPage.notes.sendKeys(noteToUpdate);

            EditPage.topRightPaid.click();

            EditPage.saveButton.click();
            //EditPage.readOnlyButton.click();

            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();

            EditPage.notes.getAttribute('value').then(function (note) {
                expect(note).toEqual(noteToUpdate);
            });
            EditPage.topRightPaid.getAttribute('checked').then(function (paidValueAfter) {
                expect(paidValueAfter).toNotEqual(paidValueBefore);
            });
        });

        afterEach(function () {

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[5];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        })

    });

    describe('Update LineItem', function () {

        var amountTotalBefore;
        it('should update the line item by selecting another product', function () {
            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            HomePage.rightTableLineItemTab().click();

            amountTotalBefore = HomePage.topRightAmount.getAttribute('value');

            InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                updateArrow.click();
                expect(InsertPage.LineItemModalDialog.isDisplayed());
                InsertPage.selectParentTableColumns.then(function (cols) {
                    cols[0].getText().then(function (txt) {
                        expect(txt).toEqual('product_number');
                    });
                    cols[1].getText().then(function (txt) {
                        expect(txt).toEqual('name');
                    });
                    cols[2].getText().then(function (txt) {
                        expect(txt).toEqual('price');
                    });
                });
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
                    var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                    qtyElm.clear();
                    qtyElm.sendKeys('2');
                    browser.sleep(SleepTime);

                    // save new line item
                    EditPage.saveButton.click();

                    expect(HomePage.topRightAmount.getAttribute('value') >= amountTotalBefore).toBeTruthy();
                })
            });
        });

        it('should update test collab', function () {
            // TC : 111 Update LineItem

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[6];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        });
    });

    describe('Insert records', function () {

        var amountTotalBefore;
        it('should update the line item by selecting another product', function () {
            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            HomePage.rightTableLineItemTab().click();

            amountTotalBefore = HomePage.topRightAmount.getAttribute('value');

            // should add a row to line item
            // At the bottom of the bottom-right grid, click Insert
            var insertButton = InsertPage.insertButton();
            insertButton.getText().then(function (txt) {
                expect(txt).toEqual('Insert');
            });
            insertButton.click();
            browser.sleep(SleepTime);

            InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                updateArrow.click();
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
                    var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                    //qtyElm.clear();
                    qtyElm.sendKeys('2');
                    browser.sleep(SleepTime);

                    // save new line item
                    EditPage.saveButton.click();

                    expect(HomePage.topRightAmount.getAttribute('value')).toBeGreaterThan(amountTotalBefore);
                })
            });
        });

        it('should update test collab', function () {
            // TC : 115 Insert LineItem

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[7];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        });
    });

    describe('Update Product', function () {
        var tableDropDown = HomePage.tableSelctor;

        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });
        it('should Update Product Name "Hammer" to new product "wrench" in Product table', function () {

            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'product');

            // Select the product Hammer
            HomePage.getLeftProductTableRows().then(function (rows) {
                var productToEdit = us.findWhere(rows, {name: 'Hammer'});

                productToEdit.rowElm.click();
                HomePage.getColumnsOfRow(productToEdit.rowElm).then(function (cols) {
                    browser.actions().doubleClick(cols[2]).perform();
                    var productNameElm = HomePage.getInputElement(cols[2]);
                    productNameElm.clear();
                    productNameElm.sendKeys('wrench');

                    EditPage.saveButton.click();
                });
            });
        });

        it('should check the updated product name "wrench"', function () {
            // go to customers table
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'customer');
            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            HomePage.rightTableLineItemTab().click();

            InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                updateArrow.click();
                expect(InsertPage.LineItemModalDialog.isDisplayed());
                var rows = InsertPage.getMappedLineItem();
                rows.then(function (elms) {
                    var lineItem = us.findWhere(elms, {name: 'wrench'});
                    expect(lineItem).toBeDefined();
                    InsertPage.exitModal.click();
                });
            });
        });

        it('should Update Product Name "wrench" back to new product "Hammer" in Product table for next time', function () {

            var tableDropDown = HomePage.tableSelctor;
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'product');

            // Select the product Hammer
            HomePage.getLeftProductTableRows().then(function (rows) {
                var productToEdit = us.findWhere(rows, {name: 'wrench'});

                productToEdit.rowElm.click();
                HomePage.getColumnsOfRow(productToEdit.rowElm).then(function (cols) {
                    browser.actions().doubleClick(cols[2]).perform();
                    var productNameElm = HomePage.getInputElement(cols[2]);
                    productNameElm.clear();
                    productNameElm.sendKeys('Hammer');

                    EditPage.saveButton.click();
                    browser.sleep(3000)
                });
            });
        });

        it('should update a product to a line item', function () {
            // get customer name and note down the balance
            var customerName, customersOrignalBalance;

            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'LineItem');
            // search and find Shovel
            HomePage.getLeftLineItemTableRows().then(function (lineItems) {
                var lineItem10 = us.findWhere(lineItems, {LineitemId: "10"});
                lineItem10.rowElm.click();

                HomePage.getColumnsOfRow(lineItem10.rowElm).then(function (cols) {
                    cols[3].getText().then(function (custName) {
                        customerName = custName;
                        tableDropDown.click();
                        HomePage.selectDropDownByText(tableDropDown, 'customer');
                        // search and find Shovel
                        HomePage.getLeftTableRowArray().then(function (customers) {
                            var lineItem10Customer = us.findWhere(customers, {name: customerName});
                            lineItem10Customer.rowElm.click();

                            HomePage.getColumnsOfRow(lineItem10.rowElm).then(function (cols) {
                                cols[2].getText().then(function (bal) {
                                    customersOrignalBalance = bal;
                                });
                            });
                        });
                    });
                });
            });

            // go to line item table again to update
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'LineItem');

            var orderNumber, priceAfter, amountAfter;

            // search and find Shovel
            HomePage.getLeftLineItemTableRows().then(function (lineItems) {
                var lineItem10 = us.findWhere(lineItems, {LineitemId: "10"});
                lineItem10.rowElm.click();
                var priceBefore = EditPage.productPrice.getAttribute('value').then(function (val) {
                    return val;
                });
                var amountBefore = EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                    return val;
                });
                HomePage.getColumnsOfRow(lineItem10.rowElm).then(function (cols) {
                    cols[3].getText().then(function (custName) {
                        customerName = custName;
                    });
                    var changeProductLink = EditPage.getPopupArrow(cols[2]);
                    changeProductLink.click();

                    InsertPage.selectLineItemTableRows.then(function (rows) {
                        var selectElm = EditPage.selectLineItemLink(rows[0]);
                        selectElm.click();
                    });

                    // save new line item
                    EditPage.saveButton.click();
                    lineItem10.rowElm.click();
                    EditPage.productPrice.getAttribute('value').then(function (val) {
                        priceAfter = val;
                    });
                    EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                        amountAfter = val;
                    });

                    HomePage.topRightOrderNum.getAttribute('value').then(function (val) {
                        orderNumber = val;
                    });
                    expect(priceAfter).toNotEqual(priceBefore);
                    expect(amountAfter).toNotEqual(amountBefore);

                });
            });
            // Check the amount and line item total in purchase order table
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'PurchaseOrder');

            HomePage.topLeftTableRows.each(function (row) {
                var lineItemTen = EditPage.getOrderNumber(row);
                lineItemTen.getText().then(function (txt) {
                    if (txt == orderNumber) {
                        lineItemTen.click();

                        var items = HomePage.rightTableRows().filter(function (row) {
                            return row.getText().then(function (txt) {
                                return txt.split('\n')[0] === '10';
                            });
                        });

                        items.then(function (row) {
                            HomePage.zoomRightTableItem(row[0]);

                            EditPage.productPrice.getAttribute('value').then(function (val) {
                                expect(val).toEqual(priceAfter);
                            });
                            EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                                expect(val).toEqual(amountAfter);
                            });
                        });
                    }
                });
            });

            // Check customer table
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'customer');

            // search and find Shovel
            HomePage.getLeftTableRowArray().then(function (customers) {
                var lineItem10Customer = us.findWhere(customers, {name: customerName});
                lineItem10Customer.rowElm.click();

                HomePage.getColumnsOfRow(lineItem10Customer.rowElm).then(function (cols) {
                    cols[2].getText().then(function (bal) {
                        expect(customersOrignalBalance).toNotEqual(bal);
                    });
                });
            });

            // Reset after test
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'LineItem');

            // search and find Shovel
            HomePage.getLeftLineItemTableRows().then(function (lineItems) {
                var lineItem10 = us.findWhere(lineItems, {LineitemId: "10"});
                lineItem10.rowElm.click();
                HomePage.getColumnsOfRow(lineItem10.rowElm).then(function (cols) {
                    var changeProductLink = EditPage.getPopupArrow(cols[2]);
                    changeProductLink.click();

                    InsertPage.selectLineItemTableRows.then(function (rows) {
                        var selectElm = EditPage.selectLineItemLink(rows[1]);
                        selectElm.click();
                    });

                    // save new line item
                    EditPage.saveButton.click();
                });
            });
        });

        it('should update test collab', function () {
            // TC : 258 Update Product

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[8];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        });
    });

    // Foreign Key Updates/Deletes
    describe('Foreign Key Updates/Deletes', function () {
        var tableDropDown = HomePage.tableSelctor;

        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        var customerName = 'Kilo Combustibles';
        var updatedCustomerName = 'Kilo Combustibles Green';
        var customerToUpdate, customerToDelete;
        var updatedCustomerOrders = [];
        var deletedCustomerOrders = [];
        it('should update customer name', function () {
            HomePage.getLeftTableRowArray().then(function (customers) {
                customerToUpdate = us.findWhere(customers, {name: customerName});
                customerToDelete = customers[customers.length - 1];

                // get order numbers from right table
                customerToDelete.rowElm.click();
                HomePage.rightTableRows().then(function (rows) {
                    rows.forEach(function (row) {
                        HomePage.rightTableRowOrderNum(row).getText().then(function (orderNumber) {
                            deletedCustomerOrders.push(orderNumber);
                        });
                    });
                });

                customerToUpdate.rowElm.click();

                HomePage.topRightName.clear();
                HomePage.topRightName.sendKeys(updatedCustomerName);

                // get order numbers from right table
                HomePage.rightTableRows().then(function (rows) {
                    rows.forEach(function (row) {
                        HomePage.rightTableRowOrderNum(row).getText().then(function (orderNumber) {
                            updatedCustomerOrders.push(orderNumber);
                        });
                    });
                });
                EditPage.saveButton.click();
            });

        });

        it('should check the updated customer name in Purchase Order table', function () {
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'PurchaseOrder');

            var searchInput = HomePage.leftTableSearchInput;
            searchInput.clear();
            searchInput.sendKeys(customerToDelete.name);

            HomePage.leftTableSearchIcon.click();
            HomePage.topLeftTableRows.then(function (rows) {
                expect(rows.length).toBe(1);
            });

            searchInput.clear();
            searchInput.sendKeys(updatedCustomerName);
            HomePage.leftTableSearchIcon.click();

            HomePage.topLeftTableRows.then(function (orders) {
                orders.forEach(function (order) {
                    order.click();
                    EditPage.childFormCustomerName.getAttribute('value').then(function (name) {
                        expect(name).toEqual(updatedCustomerName);
                    });
                });
            });
        });

        it('should update customer name back for next time test', function () {
            tableDropDown.click();
            HomePage.selectDropDownByText(tableDropDown, 'customer');
            customerToUpdate.rowElm.click();
            HomePage.topRightName.clear();
            HomePage.topRightName.sendKeys(customerName);
            EditPage.saveButton.click();
        });

        xit('should update test collab', function () {
            // TC : 258 Update Product

            // the status update needs to be called in afterEach block
            // to get it executed after completing the test
            var execCase = ExecutionData.ExecutionCase[8];
            testCollab.markPassFailStatus(execCase.id, 30, execCase.test_case_id);
        });
    });

    describe('Balance Validations', function () {
        var tableDropDown = HomePage.tableSelctor;

        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        var balanceAfterLineItem, newOrderNumRow, otherCustomerPriorBalance;
        var otherCustomerName = 'Black Sheep Industries';

        it('should create an order', function () {

            HomePage.selectDefaultCustomer(us);

            var insertButton = InsertPage.insertButton();
            insertButton.getText().then(function (txt) {
                expect(txt).toEqual('Insert');
            });
            insertButton.click().then(function () {
                EditPage.saveButton.click();
            });
        });

        it('should add a line item', function () {
            var previousBalance;
            HomePage.selectDefaultCustomer(us);
            EditPage.customerBalance.getAttribute('value').then(function (val) {
                previousBalance = val;
            });

            HomePage.rightTableRows().map(function (row, index) {
                return{
                    index: index,
                    rowElm: row,
                    orderNumber: row.getText().then(function (txt) {
                        return txt.split('\n')[0];
                    })
                }
            }).then(function (orders) {
                newOrderNumRow = us.max(orders, function (order) {
                    return parseInt(order.orderNumber);
                });
                newOrderNumRow.rowElm.click();

                HomePage.zoomRightTableItem(newOrderNumRow.rowElm);
                browser.sleep(SleepTime);

                // should add a row to line item
                // At the bottom of the bottom-right grid, click Insert
                var insertButton = InsertPage.insertButton();
                insertButton.getText().then(function (txt) {
                    expect(txt).toEqual('Insert');
                });
                insertButton.click();
                browser.sleep(SleepTime);
                InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                    updateArrow.click();
                    expect(InsertPage.LineItemModalDialog.isDisplayed());
                });

                InsertPage.selectLineItemTableRows.then(function (rows) {
                    var selectElm = EditPage.selectLineItemLink(rows[0]);
                    selectElm.click();

                    //enter 1 in the Qty Ordered column
                    InsertPage.getInsertRowSelectItemQty().then(function (cols) {

                        // do double click to make the cell editable
                        browser.actions().doubleClick(cols[3]).perform();

                        // Enter 1 as order quantity.
                        var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                        qtyElm.sendKeys('1');
                        browser.sleep(SleepTime);

                        // save new line item
                        EditPage.saveButton.click();
                    })
                });
                HomePage.selectDefaultCustomer(us);
                EditPage.customerBalance.getAttribute('value').then(function (val) {
                    balanceAfterLineItem = val;
                    expect(val).toBeGreaterThan(previousBalance);
                })
            });
        });

        it('should pay an order and check balance is less than before payment', function () {
            newOrderNumRow.rowElm.click();
            var paidCheckBox = HomePage.rightTableRowPaid(newOrderNumRow.rowElm);
            paidCheckBox.click();

            EditPage.saveButton.click();

            EditPage.customerBalance.getAttribute('value').then(function (val) {
                //balanceAfterLineItem = val;
                expect(val).toBeLessThan(balanceAfterLineItem);
            });

            // Unpay and check the balance
            paidCheckBox.click();
            EditPage.saveButton.click();
            EditPage.customerBalance.getAttribute('value').then(function (val) {
                //balanceAfterLineItem = val;
                expect(val).toEqual(balanceAfterLineItem);
            });
        });

        it('should change amount_total by changing line item properties', function () {
            // Increase qty and check balance
            newOrderNumRow.rowElm.click();
            HomePage.zoomRightTableItem(newOrderNumRow.rowElm);
            browser.sleep(SleepTime);

            // get amount total before change
            var previousAmountTotal;
            HomePage.topRightAmount.getAttribute('value').then(function (val) {
                previousAmountTotal = val;
            });

            InsertPage.getInsertRowSelectItemQty().then(function (cols) {

                // do double click to make the cell editable
                browser.actions().doubleClick(cols[3]).perform();

                // Enter 2 as order quantity.
                var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                qtyElm.clear();
                qtyElm.sendKeys('2');
                browser.sleep(SleepTime);

                // save new line item
                EditPage.saveButton.click();
            });
            //HomePage.selectDefaultCustomer(us);

            // check amount total after increasing the qty
            HomePage.topRightAmount.getAttribute('value').then(function (val) {
                expect(val).toBeGreaterThan(previousAmountTotal);
            });

            /*
             * Increase the product price and check line item total
             */
            InsertPage.getLineItemGridFirstRow().then(function (firsRow) {
                firsRow.click();
                HomePage.zoomRightTableItem(firsRow);

                var lineItemTotalBeforeIncrease;
                EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                    lineItemTotalBeforeIncrease = val;
                });

                EditPage.productPrice.clear();
                EditPage.productPrice.sendKeys('20');

                EditPage.saveButton.click();

                EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                    expect(lineItemTotalBeforeIncrease).toBeLessThan(val);
                });
            });
        });

        it('should change customer to Black Sheep Industries of the order and check the balance', function () {

            HomePage.selectCustomerRow(us, otherCustomerName);

            // Get other customer balance for validation
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                otherCustomerPriorBalance = val;
            });

            // goto the new line item
            HomePage.selectDefaultCustomer(us);
            //HomePage.getPurchaseDetailsOfDefaultCustomer();
            newOrderNumRow.rowElm.click();
            HomePage.zoomRightTableItem(newOrderNumRow.rowElm);
            browser.sleep(SleepTime);

            // Change customer
            var customerChangeicon = HomePage.getDetailsCustomerChangeIcon();
            customerChangeicon.then(function (elm) {
                browser.sleep(SleepTime);
                elm[0].click();
                var rows = InsertPage.getMappedLineItem(0);
                rows.then(function (elms) {
                    var lineItem = us.findWhere(elms, {name: otherCustomerName});
                    var selectLink = lineItem.rowElm.element(by.linkText('Select'));
                    selectLink.click();

                    browser.sleep(SleepTime);

                    EditPage.saveButton.click();
                });

            });
            // Get other customer balance for validation
            HomePage.selectCustomerRow(us, otherCustomerName);
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                expect(val).toBeGreaterThan(otherCustomerPriorBalance);
            });
        });

        it('should change product of the line item and check the balance of the customer', function () {
            HomePage.selectCustomerRow(us, otherCustomerName);
            // Get other customer balance for validation
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                otherCustomerPriorBalance = val;
            });

            HomePage.rightTableRows().map(function (row, index) {
                return{
                    index: index,
                    rowElm: row,
                    orderNumber: row.getText().then(function (txt) {
                        return txt.split('\n')[0];
                    })
                }
            }).then(function (orders) {
                newOrderNumRow = us.max(orders, function (order) {
                    return parseInt(order.orderNumber);
                });

                newOrderNumRow.rowElm.click();
                HomePage.zoomRightTableItem(newOrderNumRow.rowElm);
                browser.sleep(SleepTime);

                InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                    updateArrow.click();
                    expect(InsertPage.LineItemModalDialog.isDisplayed());
                });

                InsertPage.selectLineItemTableRows.then(function (rows) {
                    var selectElm = EditPage.selectLineItemLink(rows[1]);
                    selectElm.click();

                    browser.sleep(SleepTime);
                    EditPage.saveButton.click();

                    HomePage.selectCustomerRow(us, otherCustomerName);
                    HomePage.topRightBalance.getAttribute('value').then(function (val) {
                        expect(val).toBeGreaterThan(otherCustomerPriorBalance);
                    });
                });
            });
        });

        it('should delete the order and check the balance of the customer', function () {
            HomePage.selectCustomerRow(us, otherCustomerName);
            // Get other customer balance for validation
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                otherCustomerPriorBalance = val;
            });

            newOrderNumRow.rowElm.click();
            EditPage.getDeleteIconOnRightTable(newOrderNumRow.rowElm).click();
            EditPage.saveButton.click();

            HomePage.selectCustomerRow(us, otherCustomerName);
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                expect(val).toBeLessThan(otherCustomerPriorBalance);
            });
        });

        it('should check error message when balance is more than credit limit and save', function () {
            var customerPriorBalance;
            HomePage.selectDefaultCustomer(us);
            // Get customer balance for validation
            HomePage.topRightBalance.getAttribute('value').then(function (val) {
                customerPriorBalance = val;
            });

            HomePage.getPurchaseDetailsOfDefaultCustomer();

            InsertPage.getInsertRowSelectItemQty().then(function (cols) {

                // do double click to make the cell editable
                browser.actions().doubleClick(cols[3]).perform();

                // Enter 1000 as order quantity to exceed the credit limit
                var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                qtyElm.clear();
                qtyElm.sendKeys('1000');

                EditPage.saveButton.click();
                browser.sleep(SleepTime);

                browser.switchTo().alert().then(
                    function (alert) {
                        alert.accept();
                    },
                    function (error) {
                        console.log(error);
                    }
                );

                HomePage.selectDefaultCustomer(us);
                HomePage.topRightBalance.getAttribute('value').then(function (val) {
                    expect(val).toEqual(customerPriorBalance);
                });
            });
        });
    });
    
    describe('Line item update and part price changes', function(){
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        var previousBalance;
        var loop = true;

        var insertLineItem = function(item, qty){
            // At the bottom of the bottom-right grid, click Insert
            var insertButton = InsertPage.insertButton();
            insertButton.getText().then(function (txt) {
                expect(txt).toEqual('Insert');
            });
            insertButton.click();
            browser.sleep(SleepTime);
            InsertPage.getInsertRowSelectItemIcon().then(function (updateArrow) {
                updateArrow.click();
                expect(InsertPage.LineItemModalDialog.isDisplayed());
            });

            InsertPage.selectLineItemTableRows.then(function (rows) {
                var selectElm = EditPage.selectLineItemLink(rows[item]);
                selectElm.click();

                //enter 1 in the Qty Ordered column
                InsertPage.getInsertRowSelectItemQty().then(function (cols) {

                    // do double click to make the cell editable
                    browser.actions().doubleClick(cols[3]).perform();

                    // Enter 1 as order quantity.
                    var qtyElm = cols[3].element(by.model('row.entity.qty_ordered'));
                    qtyElm.sendKeys(qty);
                    browser.sleep(SleepTime);

                    // save new line item
                    EditPage.saveButton.click();
                })
            });

        };

        it('should Change the quantity ordered for a line item or change the part price of the product', function(){

            var otherOrderPreviousProductPrice;
            HomePage.selectCustomerRow(us, 'Argonauts');
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            var items = HomePage.rightTableRows().filter(function (row) {
                return row.getText().then(function (txt) {
                    return txt.split('\n')[1] === 'Hammer';
                });
            });

            items.then(function (row) {
                HomePage.zoomRightTableItem(row[0]);
                EditPage.productPrice.getAttribute('value').then(function(val){
                    otherOrderPreviousProductPrice = val;
                });
            });

            HomePage.selectDefaultCustomer(us);
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            items = HomePage.rightTableRows().filter(function (row) {
                return row.getText().then(function (txt) {
                    return txt.split('\n')[1] === 'Hammer';
                });
            });

            items.then(function (row) {
                HomePage.zoomRightTableItem(row[0]);

                EditPage.productPrice.clear();
                EditPage.productPrice.sendKeys('20');
                EditPage.lineItemQtyOrdered.clear();
                EditPage.lineItemQtyOrdered.sendKeys('3');

                EditPage.saveButton.click();

                EditPage.lineItemTotal.getAttribute('value').then(function (val) {
                    expect(val).toEqual('$60.00');
                });

                //Change part price of the product, it should not impact part price of the previously placed orders
                HomePage.selectCustomerRow(us, 'Argonauts');
                HomePage.getPurchaseDetailsOfDefaultCustomer();
                var items = HomePage.rightTableRows().filter(function (row) {
                    return row.getText().then(function (txt) {
                        return txt.split('\n')[1] === 'Hammer';
                    });
                });

                items.then(function (row) {
                    HomePage.zoomRightTableItem(row[0]);
                    expect(EditPage.productPrice.getAttribute('value')).toEqual(otherOrderPreviousProductPrice);
                });

                HomePage.selectDefaultCustomer(us);
                HomePage.getPurchaseDetailsOfDefaultCustomer();
                items = HomePage.rightTableRows().filter(function (row) {
                    return row.getText().then(function (txt) {
                        return txt.split('\n')[1] === 'Hammer';
                    });
                });

                items.then(function (row) {
                    HomePage.zoomRightTableItem(row[0]);

                    // Rollback the change for next time test
                    EditPage.productPrice.clear();
                    EditPage.productPrice.sendKeys('10');
                    EditPage.lineItemQtyOrdered.clear();
                    EditPage.lineItemQtyOrdered.sendKeys('1');
                    EditPage.saveButton.click();
                });
            });
        });

        it('should insert more line items and check the balance including cutt off credit limit', function(){
            // Get the current balance for validation
            HomePage.selectDefaultCustomer(us);
            EditPage.customerBalance.getAttribute('value').then(function (val) {
                previousBalance = val;
            });
            HomePage.getPurchaseDetailsOfDefaultCustomer();
            insertLineItem(3, 2);
            HomePage.selectDefaultCustomer(us);
            EditPage.customerBalance.getAttribute('value').then(function (val) {
                expect(val).toBeGreaterThan(previousBalance);
            });

            HomePage.getPurchaseDetailsOfDefaultCustomer();
            insertLineItem(4, 2);
            HomePage.selectDefaultCustomer(us);
            EditPage.customerBalance.getAttribute('value').then(function (val) {
                expect(val).toBeGreaterThan(previousBalance);
            });

            HomePage.getPurchaseDetailsOfDefaultCustomer();
            insertLineItem(4, 1000);
            browser.switchTo().alert().then(
                function (alert) {
                    alert.accept();
                },
                function (error) {
                    console.log(error);
                }
            );
        });

        it('should clean up the line items for next time text', function(){
            HomePage.selectDefaultCustomer(us);

            HomePage.getPurchaseDetailsOfDefaultCustomer();
            InsertPage.getLineItemGridRows().map(function (row, index) {
                return{
                    index: index,
                    rowElm: row,
                    orderNumber: row.getText().then(function (txt) {
                        return txt.split('\n')[0];
                    })
                }
            }).then(function (orders) {
                var lastLineItemRow = us.max(orders, function (order) {
                    return parseInt(order.orderNumber);
                });

                // The most recently added line item needs to be deleted.
                lastLineItemRow.rowElm.click();
                EditPage.getDeleteIconOnRightTable(lastLineItemRow.rowElm).click();

                // find the initially added line item and delete it
                lastToLastLineItemRow = orders[lastLineItemRow.index -1];
                lastToLastLineItemRow.rowElm.click();
                EditPage.getDeleteIconOnRightTable(lastToLastLineItemRow.rowElm).click();

                EditPage.saveButton.click();
                HomePage.selectDefaultCustomer(us);

                EditPage.customerBalance.getAttribute('value').then(function (val) {
                    expect(val).toEqual(previousBalance);
                });
            });
        });

    });
});