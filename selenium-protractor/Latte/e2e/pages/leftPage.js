/**
 * Created by Karuna on 27/10/14.
 */

var leftPage = function() {

    //Search Section
    this.searchOptionsButton = element(by.css('.filter-flyout-icon'));
    this.searchTypesIcon = element(by.css('.filter-flyout-icon'));
    this.searchIcon = element(by.css('.search-icon'));
    this.filterFlyOut = element(by.css('.filter-flyout'));
    this.filterTypeSelectName = element(by.css('select option[value="name"]'));
    this.filterValue = element(by.model('filter.value'));
    this.searchTable = element(by.model('searchTable'));
    this.searchTypesDropDown = element(by.model('filter.column'));
    this.leftTableSearchIcon = element(by.css('.fa-search.search-icon'));
    this.leftTableSearchInput = element(by.id('eslo-table-search-input'));
    //Select DD Values
    // Header
    this.tableSelctor = element(by.id('eslo-table-select'));

    // Table
    // Retrieving the values in a table is *very* slow using WebDriver. It can take
    // 7 seconds to retrieve 20 rows with 3 columns each.
    // This is a workaround: we execute a script in the browser to retrieve that information
    // as JSON, parse it locally, and supplement it with the actual row WebElement.
    // This is *hugely* faster.
    //
    // Parameters:
    // tableSelector: the css selector for the table rows, e.g. "#leftGridContainer .ngRow"
    // columnSelector: the additional css selector for the columns in a row, e.g. ".ng-binding"
    // colNames: an array of strings with the names of the columns
    var getTableValues = function (tableSelector, columnSelector, colNames) {
        return browser.driver.executeScript("return (function(){" +
        "var rows = []; var row = {}; var colNames = " + JSON.stringify(colNames) + ";" +
        "angular.element('" + tableSelector + " " + columnSelector + "')" +
        ".each(function(idx, c) {" +
        "	var colIdx = idx % colNames.length;" +
        "	row[colNames[colIdx]] = $(c).text();" +
        "	if (colIdx == colNames.length - 1) {" +
        "		rows.push(row);" +
        "		row = {};" +
        "	}" +
        "});" +
        "return JSON.stringify(rows);" +
        "})();").
            then(function (s) {
                var data = JSON.parse(s);
                // We have the table data, now supplement it with the WebElement for each row
                return element.all(by.css(tableSelector)).then(function (rows) {
                    rows.forEach(function (row, idx) {
                        data[idx].rowElm = row;
                    });
                    return data;
                });
            });
    };

    this.getLeftTableRowArray = function () {
        return getTableValues('#leftTableDiv .ngRow', '.ngCellText .ng-binding', ["name", "balance", "creditLimit"]);
    };

    //should select "Bravo Hardware" row in the left table

    this.selectDefaultCustomer = function (us) {
        var leftTableRows = this.getLeftTableRowArray();
        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: browser.params.customer.selected.name});
            // select the bravo customer
            bravoCustomer.rowElm.click();

            browser.sleep(SleepTime);
        })
    };



    this.leftTableDiv = element(by.id('leftTableDiv'));
    this.leftTableSortColumns = this.leftTableDiv.all(by.css('.ngHeaderSortColumn'));
    this.topLeftTableRows = this.leftTableDiv.all(by.css('#leftTableDiv .ngRow'));
    this.getColumnsOfRow = function (row) {
        return row.all(by.repeater('col in renderedColumns'));
    };
    this.getLeftTableRowArray = function () {
        return getTableValues('#leftTableDiv .ngRow', '.ngCellText .ng-binding', ["name", "balance", "creditLimit"]);
    };

    this.getLeftProductTableRows = function () {
        return getTableValues('#leftTableDiv .ngRow', '.ngCellText .ng-binding', ["productNumber", "name", "price"]);
    };

    this.getLeftLineItemTableRows = function () {
        return getTableValues('#leftTableDiv .ngRow', '.ngCellText .ng-binding', ["LineitemId", "name", "CustomerName"]);
    };

    this.getLeftPurchaseOrderTableRows = function () {
        return getTableValues('#leftTableDiv .ngRow', '.ngCellText .ng-binding', ["OrderNumber", "AmountTotal", "Paid"]);
    };

    this.leftTableCreditLimit = function (row) {
        return row.element(by.model('row.entity.credit_limit'));
    };

    this.getUndoIconOnLeftTable = function (row) {
        return row.element(by.css('.gridActionButton.searchGridActionButton.fa-undo'));
    };



    this.getDeleteIconOnLeftTable = function (row) {
        return row.element(by.css('.fa-times.gridActionButton.searchGridActionButton'));
    };

    this.getLeftTableHeaderButton = function (headerColumn) {
        return headerColumn.element(by.css('.ngHeaderText span'));
    };

    this.parentColumnSortTipElm = element(by.id('opentip-1'));

    // Left bottom
    this.leftGridFooter = element(by.id('leftGridFooter'));
    this.fetchMoreButton = function () {
        return this.leftGridFooter.element(by.buttonText('Fetch more'))
    };

    this.leftTableInsertButton = element(by.id('leftGridFooter')).element(by.css('.eslo-button.grid-insert'));
    this.employeePictureEmployeeID = element(by.id('attemployee_id'));

    this.RightTableChildGridDiv = element(by.id('childrenTable'));
    this.modalColumnContainer = element(by.css('.modal-column-container'));
    this.leftTableEditColumnsIcon = this.leftTableDiv.element(by.css('.columns-dropdown'));
    this.iconSettingsBinaryTypeDropDown = this.modalColumnContainer.element(by.model('$parent.binaryType'));
    this.productTableIconSettings = element(by.css('#leftTableDiv > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div > div.ngHeaderCell.ng-scope.col4.colt4 > div:nth-child(2) > div.ngHeaderSortColumn.ng-scope.ngSorted > div.ngHeaderText.colt4 > i'));
    this.iconSettingsSaveButton = this.modalColumnContainer.element(by.buttonText('Save'));

    this.leftTableHeadergearndowNameField=element(by.model('form.alias'));
    this.leftTableHeader=element(by.css('#leftTableDiv > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    this.leftTableHeadergearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.leftTableHeaderBookIcon = this.leftTableHeader.element(by.css('div.columns-dropdown.ng-scope > i'));
    this.BookCloseButton = element(by.buttonText('Close'));
    this.bookIcon = element(by.css('.eslo-button.formEditColumnSelection'));
    this.leftTableDiv = element(by.id('leftTableDiv'));
    this.leftTableHeaderRow =this.leftTableDiv.element(by.css('div.ngHeaderContainer'));
    this.leftTableHeaderBookIconAmountTotalOption = element(by.id('colSelectamount_total'));

    this.leftTableHeaderBookIconColumnCount=element.all(by.repeater('(colName, col) in form.columns'));

    this.iconBinaryTypeSelector = element(by.model('$parent.binaryType'));
    this.leftTableLineItemBookIconAuditTimeOption = element(by.id('colSelectaudit_time'));

    this.leftTableHeaderBookIconCustomerNameOption = element(by.id('colSelectcustomer_name'));
    this.leftTableHeaderBookIconNotesOption = element(by.id('colSelectnotes'));
    this.leftTableHeaderBookIconOrderNumnerOption = element(by.id('colSelectorder_number'));
    this.leftTableHeaderBookIconPaidOption = element(by.id('colSelectpaid'));
    this.leftTableHeaderBookIconAuditNumOption = element(by.id('colSelectaudit_number'));


    this.purchaseOrderViaRolePurchaseOrderAuditLink=element(by.linkText('demo:PurchaseOrder via role purchaseorder_audit'));
    this.leftTableHeaderBookPurchaseOrderAuditAmountTotalOption = element(by.id('colSelect-purchaseorder_audit-amount_total'));
    this.leftTableHeaderBookPurchaseOrderCustNameTotalOption = element(by.id('colSelect-purchaseorder_audit-customer_name'));
    this.leftTableHeaderBookPurchaseOrderAuditNotesOption = element(by.id('colSelect-purchaseorder_audit-notes'));
    this.leftTableHeaderBookPurchaseOrderAuditOrderNoOption = element(by.id('colSelect-purchaseorder_audit-order_number'));
    this.leftTableHeaderBookPurchaseOrderAuditPaidOption = element(by.id('colSelect-purchaseorder_audit-paid'));
    this.leftTableHeaderBookPurchaseOrderAuditSalesrepOption = element(by.id('colSelect-purchaseorder_audit-salesrep_id'));
    this.getColumnsOfRow = function (row) {
        return row.all(by.repeater('col in renderedColumns'));
    };
    this.leftTableHeaderAuditTimeColumngearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));

    this.leftTableHeaderBalancegearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt2 > i'));
};

// Export the script as module
module.exports = new leftPage();