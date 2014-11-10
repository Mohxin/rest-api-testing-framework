/**
 * Created by Karuna on 27/10/14.
 */

var bottomRightPage = function() {
    this.ChildTable = element.all(by.css('#childrenTable > div.ngTopPanel.ng-scope'));

    this.RightSideChildTableEmployeePicutureZoomInIcon = element(by.xpath('//*[@id="childrenTable"]/div[2]/div/div[1]/div/div[1]/div/div/div/button[2]'));

    this.RightSideChildTableHeaderLineItem = element(by.css('.eslo-child-tab.LineItemList-child-tab'));
    this.RightSideChildTableHeaderPurchaseOrder = element(by.css('.eslo-child-tab.purchaseorder_auditList-child-tab'));

    this.UploadWithoutSaveRecordMessage = element(by.css('div.notifyjs-container > div > span'));
    this.RightSideChildTableEmployeePictureTab = element(by.css('#childTabs > li.eslo-child-tab.employee_pictureList-child-tab'));
    // RightTable Child Grid
    this.RightTableChildGridDiv = element(by.id('childrenTable'));
    this.RightTableChildGridRows = this.RightTableChildGridDiv.all(by.css('#childrenTable .ngRow'));
    this.getRightChildGridColumnsOfRow = function (row) {
        return row.all(by.repeater('col in columns'));
    };
    this.rightGridFooter = element(by.id('childFooter'));
    this.ChildGridInsertButton = this.rightGridFooter.element(by.buttonText('Insert'));
    this.rightTableEditColumnsIcon = this.RightTableChildGridDiv.element(by.css('.fa.fa-columns.eslo-header-button'));
    this.modalColumnContainer = element(by.css('.modal-column-container'));
    this.productIconColumSettingCheckBox = this.modalColumnContainer.element(by.id('colSelecticon'));
    this.rightTableProductNumberSettingCheckBox = this.modalColumnContainer.element(by.id('colSelectproduct_number'));

    this.rightChildTableHeader = element(by.id('childrenTable'));
    this.RightchildGridTableHeader = element(by.css('#childrenTable > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    this.RigthchildGridgearIcon = this.RightchildGridTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.rightChildTable = element(by.css('#childrenTable > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    this.rightChildTableBookIcon = this.rightChildTable.element(by.css('div.columns-dropdown.ng-scope > i'));
    this.rightChildTableBookIconLineItemOption = element(by.id('colSelectlineitem_id'));
    this.rightChildTableBookIconLineItemAmountOption = element(by.id('colSelectamount'));
    this.rightChildTableBookIconLineItemOrderNumberOption = element(by.id('colSelectorder_number'));
    this.rightChildTableBookIconLineItemProductNumberOption = element(by.id('colSelectproduct_number'));
    this.rightChildTableBookIconLineItemProductPriceOption = element(by.id('colSelectproduct_price'));
    this.rightChildTableBookIconLineItemQtyOrderedOption = element(by.id('colSelectqty_ordered'));
    this.rightTableHeaderIconColumngearIcon = this.rightChildTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.rigthchildGridTabThreegearIconRecords = element.all(by.repeater('(childName, child) in scalarTableInfo.childrenByName'));
    this.rigthchildGridTabThreegearIconCheckBox = element.all(by.model('scalarTableSettings.childrenSettings[childName].displayed'));
    this.rigthchildGridTabThreegearIcon = element(by.css('#childTabs > span > button > i'));
    this.rigthchildGridTab = element(by.css('#childTabs > li.eslo-child-tab.employee_pictureList-child-tab.active'));
    this.rightTableHeaderFullImagegearIcon = this.rightChildTableHeader.element(by.css('div.ngHeaderText.colt2 > i'));

    this.purchaseOrderChildTableLineItemProductRoleLink = element(by.linkText('demo:product via role product'));
    this.rightTableLineItemBookIconProductIconOption = element(by.id('colSelect-product-icon'));
    this.rightTableLineItemBookIconProductNameOption = element(by.id('colSelect-product-name'));
    this.rightTableLineItemBookIconProductFullImageOption = element(by.id('colSelect-product-full_image'));
    this.rightTableLineItemBookIconProductPriceOption = element(by.id('colSelect-product-price'));
    this.rightTableLineItemBookIconProductNumberOption = element(by.id('colSelect-product-product_number'));

    this.purchaseOrderChildTableLineItemTab = element(by.css('#childTabs > li.eslo-child-tab.LineItemList-child-tab > a'));

    //should click on the first row in the PurchaseOrder table
    this.getPurchaseDetailsOfDefaultCustomer = function () {

        this.rightTableRows().then(function (rows) {
            rows[0].then(function (row) {
                row.click();
                //click on the magnifying glass icon that appears at the left of that row
                var zoomIcon = row.element(by.css('.gridActionButton.childZoomButton'));
                zoomIcon.click();
            });
        });
    };

    // Firefox and Chrome works fine with this approach. IE does not
    this.rightTableLineItemTab = function () {
        var tab = element.all(by.repeater('tab in formChildrenTables')).first();

        // IE needs the li element not the link of the LineItem tab
        if (browser.browserName == 'internet explorer')
            return tab;

        return tab.element(by.tagName('a'));
    };

    // Right table
    this.rightPaneBottom = element(by.id('childCollections'));
    this.rightTableRows = function () {
//        return this.rightPaneBottom.all(by.repeater('row in renderedRows'));
        return element.all(by.css('#childrenTable .ngRow'));
    };

    //right table zoom button
    this.rightTableRowZoomButton = function (row) {
        return row.element(by.css('.glyphicon-zoom-in'));
    };

    this.zoomRightTableItem = function (row) {
        row.click();
        //click on the magnifying glass icon that appears at the left of that row
        var zoomIcon = row.element(by.css('.gridActionButton.childZoomButton'));
        zoomIcon.click();
    };
};

module.exports = new bottomRightPage();