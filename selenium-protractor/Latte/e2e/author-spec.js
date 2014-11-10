var us = require('underscore');
var menuPage = require('./pages/menuPage.js');
var commonPage = require('./pages/commonPage.js');
var leftPage = require('./pages/leftPage.js');
var topRightPage = require('./pages/topRightPage.js');
var bottomRightPage = require('./pages/bottomRightPage.js');
describe('Author mode changes >', function () {

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });

    //Click Save button in Left Table Grid Gear window
    function saveChanges() {
        commonPage.waitUntilDisplayed(commonPage.saveButton).then(function () {
            commonPage.saveButton.click();
        });
    }

    describe('TC:7-Login to author mode >', function () {
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        it('should login to author mode with invalid credentials', function () {
            menuPage.toggleAuthor('NotAnAdmin', 'TryingToBreakYou');

            commonPage.waitUntilDisplayed(menuPage.modalError).then(function (isDisplayed) {
                expect(isDisplayed).toBeTruthy();
                expect(menuPage.modalDialog.isPresent()).toBeTruthy();
            });
        });

        it('should switch to author mode with valid admin credentials', function () {
            // Login with default admin credentials
            menuPage.authorLogin('admin', 'pass');
            expect(menuPage.modalDialog.isPresent()).toBeFalsy();
        });
    });

    describe('TC:1-Update column names >', function () {
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        xit('Access to Author mode>', function () {
            menuPage.toggleAuthor('admin', 'pass');
        });

        it('Update column name in Left Table >', function () {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeadergearIcon).then(function () {
                leftPage.leftTableHeadergearIcon.click();
            });

            //Update Column Name and Verify
            leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (OriginalValue) {
                leftPage.leftTableHeadergearndowNameField.clear();
                leftPage.leftTableHeadergearndowNameField.sendKeys('New' + OriginalValue);
                commonPage.saveButton.click();

                //Open gear window and verify whether the column name has been changes or not
                commonPage.waitUntilDisplayed(leftPage.leftTableHeadergearIcon).then(function () {
                    leftPage.leftTableHeadergearIcon.click();
                    leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (NewValue) {
                        expect(NewValue).toBe('New' + OriginalValue);
                    });

                    //Change the Column Name back to Original Name
                    leftPage.leftTableHeadergearndowNameField.clear();
                    leftPage.leftTableHeadergearndowNameField.sendKeys(OriginalValue);
                    commonPage.saveButton.click();

                    //Verify whether the new
                    commonPage.waitUntilDisplayed(leftPage.leftTableHeadergearIcon).then(function () {
                        leftPage.leftTableHeadergearIcon.click();
                    });
                    leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (OriginalValueAfterChange) {
                        expect(OriginalValueAfterChange).toBe(OriginalValue);
                    });
                    commonPage.saveButton.click();
                });

            });
        });

        it('Update column name in Child Grid Table >', function () {

            commonPage.waitUntilDisplayed(bottomRightPage.RigthchildGridgearIcon).then(function () {
                bottomRightPage.RigthchildGridgearIcon.click();
            });

            //Update Column Name and Verify
            leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (OriginalValue) {
                leftPage.leftTableHeadergearndowNameField.clear();
                leftPage.leftTableHeadergearndowNameField.sendKeys('New' + OriginalValue);
                commonPage.saveButton.click();

                //Open gear window and verify whether the column name has been changes or not
                commonPage.waitUntilDisplayed(bottomRightPage.RigthchildGridgearIcon).then(function () {
                    bottomRightPage.RigthchildGridgearIcon.click();
                    leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (NewValue) {
                        expect(NewValue).toBe('New' + OriginalValue);
                    });

                    //Change the Column Name back to Original Name
                    leftPage.leftTableHeadergearndowNameField.clear();
                    leftPage.leftTableHeadergearndowNameField.sendKeys(OriginalValue);
                    commonPage.saveButton.click();

                    //Verify whether the new
                    commonPage.waitUntilDisplayed(bottomRightPage.RigthchildGridgearIcon).then(function () {
                        bottomRightPage.RigthchildGridgearIcon.click();
                    });
                    leftPage.leftTableHeadergearndowNameField.getAttribute('value').then(function (OriginalValueAfterChange) {
                        expect(OriginalValueAfterChange).toBe(OriginalValue);
                    });
                    commonPage.saveButton.click();
                });

            });
        });
    });

    describe('TC:3-Author mode changes >', function () {
        function ClickleftTableHeaderBookIcon() {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeaderBookIcon).then(function () {
                leftPage.leftTableHeaderBookIcon.click();
            });
        }

        function ClickBookCloseButton() {
            commonPage.waitUntilDisplayed(leftPage.BookCloseButton).then(function () {
                leftPage.BookCloseButton.click();
            });
        }

        function ClickRightFormBookIcon() {
            commonPage.waitUntilDisplayed(leftPage.bookIcon).then(function () {
                leftPage.bookIcon.click();
            });
        }

        function ClickRightChildTableBookIcon() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightChildTableBookIcon).then(function () {
                bottomRightPage.rightChildTableBookIcon.click();
            });
        }

        function SelectAmountTotalOption() {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeaderBookIconAmountTotalOption).then(function () {
                leftPage.leftTableHeaderBookIconAmountTotalOption.click();
            });
        }

        function SelectLineItemOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightChildTableBookIconLineItemOption).then(function () {
                bottomRightPage.rightChildTableBookIconLineItemOption.click();
            });
        }

        xit('should switch to author mode with valid admin credentials >', function () {
            // Login with default admin credentials
            menuPage.toggleAuthor('admin', 'pass');
        });

        it('Select Purchase Order Table >', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:PurchaseOrder');
        });

        it('Purchase Order:Select or Unselect Column in Left Grid Book and Verify Column is displayed/Hidden >', function () {
            ClickleftTableHeaderBookIcon();

            //Verify Column Count in"Purchase Order" Book window
            leftPage.leftTableHeaderBookIconColumnCount.then(function (ColumnCount) {
                expect(ColumnCount.length).toBe(6);
            });

            //Verify Column Displayed/Hidden
            leftPage.leftTableHeaderBookIconAmountTotalOption.getAttribute('checked').then(function (status) {
                var ColumnName = 'Amount Total';
                if (status == 'true') {
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    leftPage.leftTableHeaderRow.getInnerHtml().then(function (HeaderColumnName) {
                        expect(HeaderColumnName).not.toContain(ColumnName);
                    });
                    ClickleftTableHeaderBookIcon();
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    leftPage.leftTableHeaderRow.getInnerHtml().then(function (HeaderColumnName) {
                        expect(HeaderColumnName).toContain(ColumnName);
                    });
                }
                else {
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    leftPage.leftTableHeaderRow.getInnerHtml().then(function (HeaderColumnName) {
                        expect(HeaderColumnName).toContain(ColumnName);
                    });
                    ClickleftTableHeaderBookIcon();
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    leftPage.leftTableHeaderRow.getInnerHtml().then(function (HeaderColumnName) {
                        expect(HeaderColumnName).not.toContain(ColumnName);
                    });
                }
            });
        });

        it('Purchase Order: Select or Unselect Columns in Right Form Book and Verify Column is displayed/Hidden >', function () {
            ClickRightFormBookIcon();

            //Verify Column Count in"Purchase Order" Book window
            leftPage.leftTableHeaderBookIconColumnCount.then(function (ColumnCount) {
                expect(ColumnCount.length).toBe(6);
            });

            //Verify Column Displayed/Hidden
            leftPage.leftTableHeaderBookIconAmountTotalOption.getAttribute('checked').then(function (status) {
                var ColumnName = 'Amount Total';
                if (status == 'true') {
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    topRightPage.rightTableForm.getInnerHtml().then(function (FormColumnName) {
                        expect(FormColumnName).not.toContain(ColumnName);
                    });
                    ClickRightFormBookIcon();
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    topRightPage.rightTableForm.getInnerHtml().then(function (FormColumnName) {
                        expect(FormColumnName).toContain(ColumnName);
                    });
                }
                else {
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    topRightPage.rightTableForm.getInnerHtml().then(function (FormColumnName) {
                        expect(FormColumnName).toContain(ColumnName);
                    });
                    ClickRightFormBookIcon();
                    SelectAmountTotalOption();
                    ClickBookCloseButton();
                    topRightPage.rightTableForm.getInnerHtml().then(function (FormColumnName) {
                        expect(FormColumnName).not.toContain(ColumnName);
                    });
                }
            });
        });

        it('Purchase Order: Select or Unselect Columns in Right Child Table Book and Verify Column is displayed/Hidden >', function () {
            bottomRightPage.purchaseOrderChildTableLineItemTab.click();
            ClickRightChildTableBookIcon();

            //Verify Column Count in"LineItem" Child Book window
            leftPage.leftTableHeaderBookIconColumnCount.then(function (ColumnCount) {
                expect(ColumnCount.length).toBe(6);
            });

            //Verify Column Displayed/Hidden
            bottomRightPage.rightChildTableBookIconLineItemOption.getAttribute('checked').then(function (status) {
                var ColumnName = 'Lineitem Id';
                if (status == 'true') {
                    SelectLineItemOption();
                    ClickBookCloseButton();
                    bottomRightPage.rightChildTable.getInnerHtml().then(function (ChildTableColumnName) {
                        expect(ChildTableColumnName).not.toContain(ColumnName);
                    });
                    browser.sleep(SleepTime);
                    ClickRightChildTableBookIcon();
                    SelectLineItemOption();
                    ClickBookCloseButton();
                    bottomRightPage.rightChildTable.getInnerHtml().then(function (ChildTableColumnName) {
                        expect(ChildTableColumnName).toContain(ColumnName);
                    });
                }
                else {
                    SelectLineItemOption();
                    ClickBookCloseButton();
                    bottomRightPage.rightChildTable.getInnerHtml().then(function (ChildTableColumnName) {
                        expect(ChildTableColumnName).toContain(ColumnName);
                    });
                    ClickRightChildTableBookIcon();
                    SelectLineItemOption();
                    ClickBookCloseButton();
                    bottomRightPage.rightChildTable.getInnerHtml().then(function (ChildTableColumnName) {
                        expect(ChildTableColumnName).not.toContain(ColumnName);
                    });
                }
            });
        });

    });

    describe('TC:4-Verify Currency format for Balance in Customer Table >', function () {
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });
        //Click Balance gear Icon in Left Grid Header
        function leftTableHeaderBalancegearIcon() {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeaderBalancegearIcon).then(function () {
                leftPage.leftTableHeaderBalancegearIcon.click();
            });
        }

        //Select "Currency" in Display Cell Format
        function selectCurrency() {
            leftTableHeaderBalancegearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Currency');
            browser.sleep(SleepTime);
        }

        xit('Access to Author mode>', function () {
            menuPage.toggleAuthor('admin', 'pass');
        });

        it('Select Customer Table >', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
        });

        it('Select Currency as a Default Option>', function () {
            selectCurrency();
            saveChanges();
        });

        it('Verify "Integer" Currency Type>', function () {
            leftTableHeaderBalancegearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Integer');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightBalance.getAttribute('value').then(function (IntegerRightFormBalance) {
                if(IntegerRightFormBalance == 0)
                {
                }else{
                    expect(IntegerRightFormBalance).not.toContain('$');
                    expect(IntegerRightFormBalance).not.toContain(',');
                    expect(IntegerRightFormBalance).not.toContain('.00');
                }

            });
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[2].getText().then(function (IntegerLeftTableBalance) {
                        if(IntegerLeftTableBalance == 0)
                        {
                        }else {
                            expect(IntegerLeftTableBalance).not.toContain('$');
                            expect(IntegerLeftTableBalance).not.toContain(',');
                            expect(IntegerLeftTableBalance).not.toContain('.00');
                        }
                    });
                });
            });
        });

        it('Verify "Integer with commas" Currency format>', function () {
            leftTableHeaderBalancegearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Integer with commas');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightBalance.getAttribute('value').then(function (IntegerWithCommasRightFormBalance) {
                if(IntegerWithCommasRightFormBalance == 0)
                {
                }else {
                    expect(IntegerWithCommasRightFormBalance).not.toContain('$');
                    expect(IntegerWithCommasRightFormBalance).toContain(',');
                    expect(IntegerWithCommasRightFormBalance).not.toContain('.00');
                }
            });
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[2].getText().then(function (IntegerWithCommasLeftTableBalance) {
                        if(IntegerWithCommasLeftTableBalance == 0)
                        {
                        }else {
                            expect(IntegerWithCommasLeftTableBalance).not.toContain('$');
                            expect(IntegerWithCommasLeftTableBalance).toContain(',');
                            expect(IntegerWithCommasLeftTableBalance).not.toContain('.00');
                        }
                    });
                });
            });
        });

        it('Verify "Short Decimal" Currency format>', function () {
            leftTableHeaderBalancegearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Short Decimal');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightBalance.getAttribute('value').then(function (ShortDecimalRightFormBalance) {
                if(ShortDecimalRightFormBalance == 0)
                {
                }else {
                    expect(ShortDecimalRightFormBalance).not.toContain('$');
                    expect(ShortDecimalRightFormBalance).toContain('.00');
                    expect(ShortDecimalRightFormBalance).not.toContain(',');
                }
            });
            browser.sleep(SleepTime);
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[2].getText().then(function (ShortDecimalLeftTableBalance) {
                        if(ShortDecimalLeftTableBalance == 0)
                        {
                        }else {
                            expect(ShortDecimalLeftTableBalance).not.toContain('$');
                            expect(ShortDecimalLeftTableBalance).toContain('.00');
                            expect(ShortDecimalLeftTableBalance).not.toContain(',');
                        }
                    });
                });
            });
        });

        it('Select Currency as a Default Option>', function () {

            selectCurrency();
            saveChanges();
        });
    });

    describe('TC:4-Verify Currency format for "Credit Limit" in Customer Table >', function () {
        beforeEach(function () {
            // Make sure this is an angular site
            isAngularSite(true);
        });
        //Click Credit Limit  gear Icon in Left Grid Header
        function leftTableHeaderCreditLimitgearIcon() {
            commonPage.waitUntilDisplayed(commonPage.leftTableHeaderCreditLimitgearIcon).then(function () {
                commonPage.leftTableHeaderCreditLimitgearIcon.click();
            });
        }

        //Select "Currency" in Display Cell Format
        function selectCurrency() {
            leftTableHeaderCreditLimitgearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Currency');
            browser.sleep(SleepTime);
        }

        it('Select Customer Table >', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
        });

        it('Select Currency as a Default Option>', function () {

            selectCurrency();
            saveChanges();
        });

        it('Verify "Integer" Currency Type>', function () {
            leftTableHeaderCreditLimitgearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Integer');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightCreditLimit.getAttribute('value').then(function (IntegerRightFormCreditLimit) {
                if(IntegerRightFormCreditLimit == 0)
                {
                }else {
                    expect(IntegerRightFormCreditLimit).not.toContain('$');
                    expect(IntegerRightFormCreditLimit).not.toContain(',');
                    expect(IntegerRightFormCreditLimit).not.toContain('.00');
                }
            });
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[3].getText().then(function (IntegerLeftTableCreditLimit) {
                        if(IntegerLeftTableCreditLimit == 0)
                        {
                        }else {
                            expect(IntegerLeftTableCreditLimit).not.toContain('$');
                            expect(IntegerLeftTableCreditLimit).not.toContain(',');
                            expect(IntegerLeftTableCreditLimit).not.toContain('.00');
                        }
                    });
                });
            });
        });

        it('Verify "Integer with commas" Currency format>', function () {
            leftTableHeaderCreditLimitgearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Integer with commas');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightCreditLimit.getAttribute('value').then(function (IntegerWithCommasRightFormCreditLimit) {
                if(IntegerWithCommasRightFormCreditLimit == 0)
                {
                }else {
                    expect(IntegerWithCommasRightFormCreditLimit).not.toContain('$');
                    expect(IntegerWithCommasRightFormCreditLimit).toContain(',');
                    expect(IntegerWithCommasRightFormCreditLimit).not.toContain('.00');
                }
            });
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[3].getText().then(function (IntegerWithCommasLeftTableCreditLimit) {
                        if(IntegerWithCommasLeftTableCreditLimit == 0)
                        {
                        }else {
                            expect(IntegerWithCommasLeftTableCreditLimit).not.toContain('$');
                            expect(IntegerWithCommasLeftTableCreditLimit).toContain(',');
                            expect(IntegerWithCommasLeftTableCreditLimit).not.toContain('.00');
                        }
                    });
                });
            });
        });

        it('Verify "Short Decimal" Currency format>', function () {
            leftTableHeaderCreditLimitgearIcon();
            commonPage.selectDropDownByText(topRightPage.balanceCurrencySelector, 'Short Decimal');
            browser.sleep(SleepTime);
            saveChanges();
            //Verify Right Form
            topRightPage.topRightCreditLimit.getAttribute('value').then(function (ShortDecimalRightFormCreditLimit) {
                if(ShortDecimalRightFormCreditLimit == 0)
                {
                }else {
                    expect(ShortDecimalRightFormCreditLimit).not.toContain('$');
                    expect(ShortDecimalRightFormCreditLimit).toContain('.00');
                    expect(ShortDecimalRightFormCreditLimit).not.toContain(',');
                }
            });
            browser.sleep(SleepTime);
            //Verify Left Table
            leftPage.topLeftTableRows.first().then(function (firstRow) {
                leftPage.getColumnsOfRow(firstRow).then(function (cols) {
                    cols[3].getText().then(function (ShortDecimalLeftTableCreditLimit) {
                        if(ShortDecimalLeftTableCreditLimit == 0)
                        {
                        }else {
                            expect(ShortDecimalLeftTableCreditLimit).not.toContain('$');
                            expect(ShortDecimalLeftTableCreditLimit).toContain('.00');
                            expect(ShortDecimalLeftTableCreditLimit).not.toContain(',');
                        }
                    });
                });
            });
        });

        it('Select Currency as a Default Option>', function () {
            selectCurrency();
            saveChanges();
        });

    });

    describe('TC:5-Purchase Order:Display parent columns for child table >', function()
    {
        beforeEach(function() {
            // Make sure this is an angular site
            isAngularSite(true);
        });
        function ClickBookCloseButton() {
            commonPage.waitUntilDisplayed(leftPage.BookCloseButton).then(function () {
                leftPage.BookCloseButton.click();
            });
        }
        function SelectProductNameOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableLineItemBookIconProductNameOption).then(function () {
                bottomRightPage.rightTableLineItemBookIconProductNameOption.click();
            });
        }
        function SelectIconOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableLineItemBookIconProductIconOption).then(function () {
                bottomRightPage.rightTableLineItemBookIconProductIconOption.click();
            });
        }
        function SelectFullImageOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableLineItemBookIconProductFullImageOption).then(function () {
                bottomRightPage.rightTableLineItemBookIconProductFullImageOption.click();
            });
        }
        function SelectPriceOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableLineItemBookIconProductPriceOption).then(function () {
                bottomRightPage.rightTableLineItemBookIconProductPriceOption.click();
            });
        }
        function SelectProductNumberOption() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableLineItemBookIconProductNumberOption).then(function () {
                bottomRightPage.rightTableLineItemBookIconProductNumberOption.click();
            });
        }
        function ClickRightChildTableBookIcon() {
            commonPage.waitUntilDisplayed(bottomRightPage.rightChildTableBookIcon).then(function () {
                bottomRightPage.rightChildTableBookIcon.click();
            });
        }

        xit('should switch to author mode with valid admin credentials', function(){
            // Login with default admin credentials
            menuPage.toggleAuthor('admin', 'pass');
        });

        it('Select PurchaseOrder Table and Select "Line Item" Tab Child Table >', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:PurchaseOrder');
            bottomRightPage.purchaseOrderChildTableLineItemTab.click();
            browser.sleep(SleepTime);
        });

        it('UnSelect LineItem child Column options to appear Parent Columns Properly>', function () {
            ClickRightChildTableBookIcon();
            bottomRightPage.rightChildTableBookIconLineItemOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    bottomRightPage.rightChildTableBookIconLineItemOption.click();
                }else{
                }
            });
            bottomRightPage.rightChildTableBookIconLineItemAmountOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    bottomRightPage.rightChildTableBookIconLineItemAmountOption.click();
                }else{
                }
            });
            bottomRightPage.rightChildTableBookIconLineItemOrderNumberOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    bottomRightPage.rightChildTableBookIconLineItemOrderNumberOption.click();
                }else{
                }
            });
            bottomRightPage.rightChildTableBookIconLineItemProductNumberOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    commonPage.rightChildTableBookIconLineItemProductNumberOption.click();
                }else{
                }
            });
            bottomRightPage.rightChildTableBookIconLineItemProductPriceOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    bottomRightPage.rightChildTableBookIconLineItemProductPriceOption.click();
                }else{
                }
            });
            bottomRightPage.rightChildTableBookIconLineItemQtyOrderedOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    bottomRightPage.rightChildTableBookIconLineItemQtyOrderedOption.click();
                }else{
                }
            });
        });
        it('LineItem:Select Parent Columns and verify in Child Grid>', function () {
            commonPage.waitUntilDisplayed(bottomRightPage.purchaseOrderChildTableLineItemProductRoleLink).then(function () {
                bottomRightPage.purchaseOrderChildTableLineItemProductRoleLink.click();
            });
            var ColumnName1 = 'Full Image';
            var ColumnName2 = 'Icon';
            var ColumnName3 = 'Name';
            var ColumnName4 = 'Product Number';
            bottomRightPage.rightTableLineItemBookIconProductFullImageOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                }else{
                    SelectFullImageOption();
                }
            });
            //Select Icon filed
            bottomRightPage.rightTableLineItemBookIconProductIconOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                }else{
                    SelectIconOption();
                }
            });
            //Name filed
            bottomRightPage.rightTableLineItemBookIconProductNameOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                }else{
                    SelectProductNameOption();
                }
            });
            //Price filed
            bottomRightPage.rightTableLineItemBookIconProductPriceOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    SelectPriceOption();
                }else{
                }
            });
            //Select Product Number filed
            bottomRightPage.rightTableLineItemBookIconProductNumberOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                }else{
                    SelectProductNumberOption();
                }
            });
            ClickBookCloseButton();
            browser.sleep(SleepTime);
            bottomRightPage.rightChildTable.getInnerHtml().then(function(HeaderColumnName){
                expect(HeaderColumnName).toContain(ColumnName1);
                expect(HeaderColumnName).toContain(ColumnName2);
                expect(HeaderColumnName).toContain(ColumnName3);
                expect(HeaderColumnName).toContain(ColumnName4);
            });
        });

        it('Select Binary Type as "Image" for Icon or Full Image Columns and verify Image in Child Grid >', function () {
            ClickRightChildTableBookIcon();
            commonPage.waitUntilDisplayed(bottomRightPage.purchaseOrderChildTableLineItemProductRoleLink).then(function () {
                bottomRightPage.purchaseOrderChildTableLineItemProductRoleLink.click();
            });
            //Name filed
            bottomRightPage.rightTableLineItemBookIconProductNameOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    SelectProductNameOption();
                }else{
                }
            });
            //Select Product Number filed
            bottomRightPage.rightTableLineItemBookIconProductNumberOption.getAttribute('checked').then(function(status){
                if(status == 'true'){
                    SelectProductNumberOption();
                }else{
                }
            });
            ClickBookCloseButton();
            browser.sleep(SleepTime);
            //Icon
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableHeaderIconColumngearIcon).then(function () {
                bottomRightPage.rightTableHeaderIconColumngearIcon.click();
            });
            leftPage.iconBinaryTypeSelector.sendKeys('Image');
            commonPage.waitUntilDisplayed(commonPage.saveButton).then(function(){
                commonPage.saveButton.click();
            });
            bottomRightPage.RightTableChildGridRows.first().then(function(firstRow){
                bottomRightPage.getRightChildGridColumnsOfRow(firstRow).then(function(cols){
                    expect(cols[1].getInnerHtml()).toContain('row-image');
                });
            });
            //Full Image
            commonPage.waitUntilDisplayed(bottomRightPage.rightTableHeaderFullImagegearIcon).then(function () {
                bottomRightPage.rightTableHeaderFullImagegearIcon.click();
            });
            leftPage.iconBinaryTypeSelector.sendKeys('Image');
            commonPage.waitUntilDisplayed(commonPage.saveButton).then(function(){
                commonPage.saveButton.click();
            });
            bottomRightPage.RightTableChildGridRows.first().then(function(firstRow){
                bottomRightPage.getRightChildGridColumnsOfRow(firstRow).then(function(cols){
                    expect(cols[1].getInnerHtml()).toContain('row-image');
                });
            });
        });

    });

    describe('TC:6-Table display - 3 gear top left icon in the Children pane >', function()
    {
        beforeEach(function() {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        xit('should switch to author mode with valid admin credentials >', function () {
            menuPage.toggleAuthor();
        });

        it('Table display - Click 3 gear top left icon in the Children pane-Unselect Column Name and Verify>', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:employee');
            browser.sleep(SleepTime);
            commonPage.waitUntilDisplayed(bottomRightPage.rigthchildGridTabThreegearIcon).then(function(){
                bottomRightPage.rigthchildGridTabThreegearIcon.click();
            });
            bottomRightPage.rigthchildGridTabThreegearIconRecords.then(function(RowCount){
                for(var i=0;i<RowCount.length;i++)
                {
                    bottomRightPage.rigthchildGridTabThreegearIconCheckBox.get(i).click();
                }
            });
            commonPage.waitUntilDisplayed(leftPage.BookCloseButton).then(function(){
                leftPage.BookCloseButton.click();
            });
            expect((bottomRightPage.rigthchildGridTab).isPresent()).toBeFalsy();
        });

        it('Table display - Click 3 gear top left icon in the Children pane-Select Column Name and Verify >', function () {
            commonPage.waitUntilDisplayed(bottomRightPage.rigthchildGridTabThreegearIcon).then(function(){
                bottomRightPage.rigthchildGridTabThreegearIcon.click();
            });
            bottomRightPage.rigthchildGridTabThreegearIconRecords.then(function(RowCount){
                for(var i=0;i<RowCount.length;i++)
                {
                    bottomRightPage.rigthchildGridTabThreegearIconCheckBox.get(i).click();
                }
            });
            commonPage.waitUntilDisplayed(leftPage.BookCloseButton).then(function(){
                leftPage.BookCloseButton.click();
            });
            browser.sleep(SleepTime);
            expect((bottomRightPage.rigthchildGridTab).isPresent()).toBeTruthy();
        });
    });

    describe('TC:2 -Date Formats >', function()
    {
        beforeEach(function() {
            // Make sure this is an angular site
            isAngularSite(true);
        });

        var SelectDateCellFormat= function (CellFormatOption){
            element(by.cssContainingText('option', CellFormatOption)).click();
        }

        function ClickleftTableHeaderBookIcon() {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeaderBookIcon).then(function () {
                leftPage.leftTableHeaderBookIcon.click();
            });
        }
        function ClickBookCloseButton() {
            commonPage.waitUntilDisplayed(leftPage.BookCloseButton).then(function () {
                leftPage.BookCloseButton.click();
            });
        }
        function clickleftTableHeaderAuditTimeColumngearIcon() {
            commonPage.waitUntilDisplayed(leftPage.leftTableHeaderAuditTimeColumngearIcon).then(function () {
                leftPage.leftTableHeaderAuditTimeColumngearIcon.click();
            });
        }
        function saveChanges() {
            commonPage.waitUntilDisplayed(commonPage.saveButton).then(function () {
                commonPage.saveButton.click();
            });
        }

        xit('should switch to author mode with valid admin credentials >', function () {
            menuPage.toggleAuthor('admin', 'pass');
        });

        it('Select PurchaseOrder audit Table >', function () {
            commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:purchaseorder_audit');
    });

        it('Select "Audit Time" Column and UnSelect Remaining Columns in Left Grid Book >', function () {
            ClickleftTableHeaderBookIcon();
            leftPage.leftTableLineItemBookIconAuditTimeOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {}else{
                    leftPage.leftTableLineItemBookIconAuditTimeOption.click();
                }
            });
            leftPage.leftTableHeaderBookIconAmountTotalOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconAmountTotalOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookIconCustomerNameOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconCustomerNameOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookIconNotesOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconNotesOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookIconOrderNumnerOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconOrderNumnerOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookIconPaidOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconPaidOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookIconAuditNumOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookIconAuditNumOption.click();
                }else{ }
            });
        });

        it('UnSelect PurchaseOrder_audit Columns in Left Grid Book >', function () {
            commonPage.waitUntilDisplayed(leftPage.purchaseOrderViaRolePurchaseOrderAuditLink).then(function () {
                leftPage.purchaseOrderViaRolePurchaseOrderAuditLink.click();
            });
            leftPage.leftTableHeaderBookPurchaseOrderAuditAmountTotalOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {leftPage.leftTableHeaderBookPurchaseOrderAuditAmountTotalOption.click();
                }else{}
            });
            leftPage.leftTableHeaderBookPurchaseOrderCustNameTotalOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookPurchaseOrderCustNameTotalOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookPurchaseOrderAuditNotesOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookPurchaseOrderAuditNotesOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookPurchaseOrderAuditOrderNoOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookPurchaseOrderAuditOrderNoOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookPurchaseOrderAuditPaidOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookPurchaseOrderAuditPaidOption.click();
                }else{ }
            });
            leftPage.leftTableHeaderBookPurchaseOrderAuditSalesrepOption.getAttribute('checked').then(function(status){
                if(status == 'true')
                {
                    leftPage.leftTableHeaderBookPurchaseOrderAuditSalesrepOption.click();
                }else{ }
            });
            ClickBookCloseButton();
        });

        it('Get "Full Date" and verify "Long Date", "Medium Date" Format Value>', function () {
            clickleftTableHeaderAuditTimeColumngearIcon();
            SelectDateCellFormat('Full Date');
            saveChanges();
            leftPage.topLeftTableRows.first().then(function(firstRow){
                leftPage.getColumnsOfRow(firstRow).then(function(cols){
                    cols[1].getText().then(function(FullDate){

                        //Verify Long Date
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Long Date');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(LongDate){
                                    var LongDateSplit=LongDate.split(",");
                                    expect(FullDate).toContain(LongDateSplit[0]+','+LongDateSplit[1].trim());
                                });
                            });
                        });

                        //Verify Medium Date
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Medium Date');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(MediumDate){
                                    var MediumDateSplit=MediumDate.split(",");
                                    var MediumDateMonth=MediumDateSplit[0].split(" ");
                                    expect(FullDate).toContain(MediumDateMonth[0].trim());
                                    expect(FullDate).toContain(MediumDateMonth[1].trim());
                                    expect(FullDate).toContain(MediumDateSplit[1].trim());
                                });
                            });
                        });
                    });
                });
            })
        });

        it('Get "Full Time" and verify "Short Time" Format Value>', function () {
            clickleftTableHeaderAuditTimeColumngearIcon();
            SelectDateCellFormat('Full Time');
            saveChanges();
            leftPage.topLeftTableRows.first().then(function(firstRow){
                leftPage.getColumnsOfRow(firstRow).then(function(cols){
                    cols[1].getText().then(function(FullDate) {

                        //Get Short Time
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Short Time');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(ShortTime){
                                    console.log(ShortTime);
                                    var ShortTimeSplit=ShortTime.split(" ");
                                    expect(FullDate).toContain(ShortTimeSplit[0]);
                                    expect(FullDate).toContain(ShortTimeSplit[1].trim());
                                });
                            });
                        });
                    });
                });
            });
        });

        it('Get "Full Date" and "Full Time" and verify "Medium Date Time" Format Value>', function () {
            clickleftTableHeaderAuditTimeColumngearIcon();
            SelectDateCellFormat('Full Date');
            saveChanges();
            leftPage.topLeftTableRows.first().then(function(firstRow){
                leftPage.getColumnsOfRow(firstRow).then(function(cols){
                    cols[1].getText().then(function(FullDate) {

                        //Get Full Time
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Full Time');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(FullTime){

                                    //Get Medium Date Time
                                    clickleftTableHeaderAuditTimeColumngearIcon();
                                    SelectDateCellFormat('Medium Date Time');
                                    saveChanges();
                                    leftPage.topLeftTableRows.first().then(function(firstRow){
                                        leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                            cols[1].getText().then(function(MediumDateTime){
                                                var MediumDateTimeSplit=MediumDateTime.split(",");
                                                var MediumDateMonth=MediumDateTimeSplit[0].split(" ");
                                                var MediumYearTime=MediumDateTimeSplit[1].split(" ");
                                                expect(MediumDateTime).toContain(FullTime);
                                                expect(FullDate).toContain(MediumDateMonth[0].trim());
                                                expect(FullDate).toContain(MediumDateMonth[1].trim());
                                                expect(FullDate).toContain(MediumYearTime[0].trim());
                                            });
                                        });
                                    });
                                });
                            });
                        });

                    });
                });
            });
        });

        it('Get "Full Date" and "Full Time" and verify "Short Date Time" Format Value>', function () {
            clickleftTableHeaderAuditTimeColumngearIcon();
            SelectDateCellFormat('Full Date');
            saveChanges();
            leftPage.topLeftTableRows.first().then(function(firstRow){
                leftPage.getColumnsOfRow(firstRow).then(function(cols){
                    cols[1].getText().then(function(FullDate){
                        var FullDateSplit=FullDate.split(",");
                        var MonthDate=FullDateSplit[1].trim().split(" ");
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var month = months.indexOf(MonthDate[0]);
                        var MonthNumber=month+1;
                        var Date=MonthDate[1];
                        var Year=FullDateSplit[2].trim().substring(2,4);
                        var MonthDateYear=MonthNumber+'/'+Date+'/'+Year;
                        console.log(MonthDateYear);

                        //Get Full Time
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Full Time');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(FullTime){
                                    var FullTimeSplit=FullTime.split(" ");
                                    var HourMinuteSeconds=FullTimeSplit[0].split(":");
                                    var ShortTime=HourMinuteSeconds[0]+':'+HourMinuteSeconds[1]+' '+FullTimeSplit[1];

                                    //Verify Long Date
                                    clickleftTableHeaderAuditTimeColumngearIcon();
                                    SelectDateCellFormat('Short Date Time');
                                    saveChanges();
                                    leftPage.topLeftTableRows.first().then(function(firstRow){
                                        leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                            cols[1].getText().then(function(ShortDateTime){
                                                expect(ShortDateTime).toEqual(MonthDateYear+' '+ShortTime);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
        });

        it('Get "Full Date" and verify "Short Date" Format Value>', function () {
            clickleftTableHeaderAuditTimeColumngearIcon();
            SelectDateCellFormat('Full Date');
            saveChanges();
            leftPage.topLeftTableRows.first().then(function(firstRow){
                leftPage.getColumnsOfRow(firstRow).then(function(cols){
                    cols[1].getText().then(function(FullDate){
                        var FullDateSplit=FullDate.split(",");
                        var MonthDate=FullDateSplit[1].trim().split(" ");
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var month = months.indexOf(MonthDate[0]);
                        var MonthNumber=month+1;
                        console.log(MonthNumber);
                        var Date=MonthDate[1];
                        var Year=FullDateSplit[2].trim().substring(2,4);
                        var MonthDateYear=MonthNumber+'/'+Date+'/'+Year;
                        console.log(MonthDateYear);

                        //Verify Long Date
                        clickleftTableHeaderAuditTimeColumngearIcon();
                        SelectDateCellFormat('Short Date');
                        saveChanges();
                        leftPage.topLeftTableRows.first().then(function(firstRow){
                            leftPage.getColumnsOfRow(firstRow).then(function(cols){
                                cols[1].getText().then(function(ShortDate){
                                    var LongDateSplit=ShortDate.split(",");
                                    expect(MonthDateYear).toEqual(ShortDate);
                                });
                            });
                        });
                    });
                });
            })
        });
    });

});

