/*
 * This page holds properties and few methods to find the home page elements
 * */
var path = require('path');
var HomePage = function () {
        this.selectProject=element(by.id('projectSelect'));
        //Select Project
        this.selectSampleProject= function(ProjectName)
        {
            element.all(by.css('#projectMenu > ul > li')).filter(function(elem) {
                return elem.getText().then(function(text) {
                    //console.log(text);
                    return text === ProjectName;
                });
            }).then(function(filteredElements) {
                filteredElements[0].click();
            });
        };
    this.liveBrowser=element(by.id('lbLink'));
    this.inThisBrowser=element(by.id('LBlocal'));
    this.inNewBrowser=element(by.id('LBwindow'));
    this.toolsMenu = element(by.css('.header-menu.account-menu.dropdown'));
    this.toolsWindowToggleAuthorMode=element(by.linkText(' Toggle Author Mode'));
    this.toolsWindowLogOut=element(by.linkText(' Log Out'));
    this.toggLoginButton = element(by.id('loginButton'));
    this.bookIcon = element(by.css('.eslo-button.formEditColumnSelection'));
    this.columnDisplay=element(by.linkText('Column Display'));
    this.columnOrder=element(by.linkText('Column Order (Beta)'));
    this.bookWindowAddNewGroupButton=element(by.css('button.btn.btn-default'));
    this.bookWindow=element(by.css('div.tab-section.active'));

    this.bookWindowAddNewGroupTitle = function(AddGroupWindow)
    {
        return AddGroupWindow.all(by.model('group.title'));
    };

    this.bookWindowDeleteGroupIcon=function(DeleteIcon)
    {
        return DeleteIcon.all(by.css('div.input-group-addon'));
    };

    this.bookWindowAttributesRow = function(GroupNum,AttRowNum)
    {
        element(by.repeater('group in params.groups').row(GroupNum)).
            element(by.repeater('key in group.columns').row(AttRowNum - 1)).click();
        browser.sleep(SleepTime);
    };
    this.bookWindowGroupRow = function(GroupNum)
    {
        return element(by.repeater('group in params.groups').row(GroupNum)).
            element(by.css('.sortable.grouping.ui-sortable'));
    };

    this.closeButtonInaddGroupWindow=element(by.buttonText('Close'));
    this.selectPlacementDropdownValue= function(Value){
        element(by.cssContainingText('option', Value)).click();
    };



    //Select DD Values
    this.searchTable = element(by.model('searchTable'));
    this.tableSelctor = element(by.id('eslo-table-select'));
    this.selectDropDownByText = function (dropDownElm, optionText) {
        if (optionText) {
            var options = dropDownElm.all(by.tagName('option'))
                .then(function (options) {
                    options.forEach(function (option) {
                        option.getAttribute('value').then(function (txt) {
                            if (txt == optionText) {
                                option.click();
                                return true;
                            }
                        })
                    });
                });
        }
    };
    // Left Table
    this.leftTableDiv = element(by.id('leftTableDiv'));
    this.topLeftTableRows = this.leftTableDiv.all(by.css('#leftTableDiv .ngRow'));

    this.leftTableSortColumns = this.leftTableDiv.all(by.css('.ngHeaderSortColumn'));
    this.leftTableSearchInput = element(by.id('eslo-table-search-input'));
    this.leftTableSearchIcon = element(by.css('.fa-search.search-icon'));

    this.getColumnsOfRow = function (row) {
        return row.all(by.repeater('col in renderedColumns'));
    };

    this.getInputElement = function (parentElm) {
        return parentElm.element(by.tagName('input'));
    };
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

    // An alternate implementation using WebDriver, used to show performance difference
    // This run almost 100 times slower than the previous implementation.
    var getTableValues2 = function (tableSelector, columnSelector, colNames) {
        return element.all(by.css(tableSelector)).map(function (row, index) {
            var columns = row.all(by.css(columnSelector));
            return columns.then(function (cols) {
                var result = {};
                cols.forEach(function (col, idx) {
                    result[colNames[idx]] = col.getText();
                    result.rowElm = row;
                });
                return result;
            });
        });
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

    this.getUndoIconOnRightTable = function (row) {
        return row.element(by.css('.gridActionButton.childActionButton'));
    };

    this.getDeleteIconOnLeftTable = function (row) {
        return row.element(by.css('.fa-times.gridActionButton.searchGridActionButton'));
    };

    this.getLeftTableHeaderButton = function (headerColumn) {
        return headerColumn.element(by.css('.ngHeaderText span'));
    };

    this.searchTypesIcon = element(by.css('.filter-flyout-icon'));
    this.searchTypesDropDown = element(by.model('filter.column'));

    this.parentColumnSortTipElm = element(by.id('opentip-1'));

    // Left bottom
    this.leftGridFooter = element(by.id('leftGridFooter'));
    this.fetchMoreButton = function () {
        return this.leftGridFooter.element(by.buttonText('Fetch more'))
    };

    // Top right
    this.topRightName = element(by.id('attname'));
    this.topRightBalance = element(by.id('attbalance'));
    this.topRightCreditLimit = element(by.id('attcredit_limit'));

    this.topRightOrderNum = element(by.id('attorder_number'));
    this.topRightAmount = element(by.id('attamount_total'));
    this.topRightPaid = element(by.id('attpaid'));

    // Right table
    this.rightPaneBottom = element(by.id('childCollections'));
    this.rightTableRows = function () {
//        return this.rightPaneBottom.all(by.repeater('row in renderedRows'));
        return element.all(by.css('#childrenTable .ngRow'));
    };

    this.rightTablePurchaseOrderRows = function(){
        return element.all(by.css('#childrenTableContainer .ngRow'));
    };
    this.rightTableRowZoomButton = function (row) {
        return row.element(by.css('.glyphicon-zoom-in'));
    };

    // Firefox and Chrome works fine with this approach. IE does not
    this.rightTableLineItemTab = function () {
        var tab = element.all(by.repeater('tab in formChildrenTables')).first();

        // IE needs the li element not the link of the LineItem tab
        if (browser.browserName == 'internet explorer')
            return tab;

        return tab.element(by.tagName('a'));
    };
    // Only with the below way IE works. Firefox and chrome does not work
    //this.rightTableLineItemTab = element.all(by.repeater('tab in formChildrenTables')).first();

    this.rightTableRowOrderNum = function (row) {
        return row.element(by.model('row.entity.order_number'));
    };

    this.rightTableRowAmount = function (row) {
        return row.element(by.model('row.entity.amount_total'));
    };

    this.rightTableRowPaid = function (row) {
        return row.element(by.model('row.entity.paid'));
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

    this.selectCustomerRow = function (us, customerName) {
        var leftTableRows = this.getLeftTableRowArray();
        leftTableRows.then(function (rows) {
            // pick the bravo hardware customer
            var bravoCustomer = us.findWhere(rows, {name: customerName});
            // select the bravo customer
            bravoCustomer.rowElm.click();

            browser.sleep(SleepTime);
        })
    };
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

        // Give a delay to load selected row values
        browser.sleep(SleepTime);
    };

    this.zoomRightTableItem = function (row) {
        row.click();
        //click on the magnifying glass icon that appears at the left of that row
        var zoomIcon = row.element(by.css('.gridActionButton.childZoomButton'));
        zoomIcon.click();
    };

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    this.getRandomNumber = function (min, max) {
        min = min ? min : 1000;
        max = max ? max : 10000;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    this.convertMoneyToFloat = function (money) {
        return parseFloat(money.replace(/[^0-9-.]/g, ''));
    };

    // This method returns a customer row element
    // from the top right details page
    this.getDetailsCustomerRow = function(){
      return element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div[5]/div/div[2]/div/span[1]/button'));
    };

    // This method gets the customer change icon from the details page
    this.getDetailsCustomerChangeIcon = function(){
       //return element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div[5]/div/div[2]/div/span[1]/button'));
       return element.all(by.css('.fa.fa-caret-square-o-up.parentSelectButton'));
    };

    // This method gets a random order number that has not been used so for
    var getUniqueOrderNumber = function () {
        var searchInput = HomePage.leftTableSearchInput;

        // generate a random number
        var newOrderNum = HomePage.getRandomNumber(2000, 4000);

        // Search for the existence of the new number
        searchInput.clear();
        HomePage.searchTypesIcon.click();
        HomePage.selectDropDownByText(HomePage.searchTypesDropDown, 'order_number');
        searchInput.sendKeys(newOrderNum);
        HomePage.leftTableSearchIcon.click();

        // if doesn't exists return the new number
        // otherwise repeat until doesn't exists
        return HomePage.topLeftTableRows.then(function (rows) {
            if (rows.length == 0)
                return newOrderNum;
            else
                return getUniqueOrderNumber();
        })
    };
    this.RightSideChildTableHeaderLineItem=element(by.css('.eslo-child-tab.LineItemList-child-tab'));
    this.RightSideChildTableHeaderPurchaseOrder=element(by.css('.eslo-child-tab.purchaseorder_auditList-child-tab'));
    this.ChildTable=element.all(by.css('#childrenTable > div.ngTopPanel.ng-scope'));

    this.detailsHeader = element(by.css('.details-header.eslo-details-header'));
    this.NextButton=this.detailsHeader.element(by.buttonText('Next'));
    this.PreviousButton=this.detailsHeader.element(by.buttonText('Previous'));
    this.rightSideBackButton = this.detailsHeader.element(by.buttonText('Back'));

    this.acceptAlert = function(){
        browser.switchTo().alert().then(
            function (alert) {
                alert.accept();
            },
            function (error) {
                console.log(error);
            }
        );
    };
//Aug 24 2014-Upload Image--general-spec.js
    this.FormTableUploadContentPicture=element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div/div[3]/div/div/div/div[2]/div/div/div'));
    this.ContentPictureID=this.FormTableUploadContentPicture.element(by.id('contentpicture'));
    this.PictureOptions=this.FormTableUploadContentPicture.element(by.css('.dropdown-toggle'));

    this.PictureUploadFileOption=this.FormTableUploadContentPicture.element(by.partialLinkText('Upload file'));
    this.PictureShowAsImageOption=this.FormTableUploadContentPicture.element(by.linkText('Show as image'));

    this.FormTableUploadContentIcon=element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div/div[2]/div/div/div/div[2]/div/div/div'));
    this.IconOptions=this.FormTableUploadContentIcon.element(by.css('.dropdown-toggle'));

    this.ContentIconID=this.FormTableUploadContentIcon.element(by.id('contenticon'));
    this.IconUploadFileOption=this.FormTableUploadContentIcon.element(by.partialLinkText('Upload file'));
    this.IconShowAsImageOption=this.FormTableUploadContentIcon.element(by.linkText('Show as image'));
    this.FormTableUploadcontentVoice=element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div/div[4]/div/div/div/div[2]/div/div/div'));
    this.VoiceIconID=this.FormTableUploadcontentVoice.element(by.id('contentvoice'));
    this.VoiceUploadFileOption=this.FormTableUploadcontentVoice.element(by.partialLinkText('Upload file'));
    this.VoiceShowAsSoundOption=this.FormTableUploadcontentVoice.element(by.linkText('Show as sound'));
    this.SelectedFile = element(by.id('uploadFileChooser'));
    this.UploadButton = element(by.buttonText('Upload'));
    this.CloseButton = element(by.buttonText('Close'));
    this.UploadMessage = element(by.css('#upload-progress-bar > div > span'));
    this.RightFormPictureImage=element(by.css('#contentpicture > img'));
    this.VerifyUploadImageMessageFunction = function(UploadMessageText){
        this.UploadMessage.getText().then(function(RunTimeUploadMessageText)
        {
            expect(RunTimeUploadMessageText).toEqual(UploadMessageText);
        })
    };
    //Upload file function
    this.UploadImageFunction = function(filepath){
        var absolutePath = path.resolve(__dirname, filepath);
        this.SelectedFile.sendKeys(absolutePath);
    };

    this.UploadWithoutSaveRecordMessage = element(by.css('div.notifyjs-container > div > span'));
    this.RightSideChildTableEmployeePictureTab=element(by.css('#childTabs > li.eslo-child-tab.employee_pictureList-child-tab'));
    this.RightSideChildTableEmployeePicutureZoomInIcon=element(by.xpath('//*[@id="childrenTable"]/div[2]/div/div[1]/div/div[1]/div/div/div/button[2]'));
    // RightTable Child Grid
    this.RightTableChildGridDiv = element(by.id('childrenTable'));
    this.RightTableChildGridRows = this.RightTableChildGridDiv.all(by.css('#childrenTable .ngRow'));
    this.getRightChildGridColumnsOfRow = function (row) {
        return row.all(by.repeater('col in columns'));
    };

    this.modalColumnContainer = element(by.css('.modal-column-container'));
    this.leftTableEditColumnsIcon = this.leftTableDiv.element(by.css('.columns-dropdown'));
    this.rightTableEditColumnsIcon = this.RightTableChildGridDiv.element(by.css('.fa.fa-columns.eslo-header-button'));
    this.productIconColumSettingCheckBox = this.modalColumnContainer.element(by.id('colSelecticon'));
    this.rightTableProductNumberSettingCheckBox = this.modalColumnContainer.element(by.id('colSelectproduct_number'));

    // Product Table
    this.productTableIconSettings = element(by.css('#leftTableDiv > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div > div.ngHeaderCell.ng-scope.col4.colt4 > div:nth-child(2) > div.ngHeaderSortColumn.ng-scope.ngSorted > div.ngHeaderText.colt4 > i'));
    this.iconSettingsBinaryTypeDropDown = this.modalColumnContainer.element(by.model('$parent.binaryType'));
    this.iconSettingsSaveButton = this.modalColumnContainer.element(by.buttonText('Save'));
    this.SearchAttribute = element(by.id('eslo-scalar-search'));
    this.topRightCustomerName = element(by.id('attcustomer_name'));
    this.topRightFormFieldItemsCount = element.all(by.repeater('(attName, att) in formColumns | array | filter:attribFilter:attributeSearchString'));
    this.topRightFormName = element(by.name('detailsForm'));
    this.balanceCurrencySelector = element(by.model('form.mask'));
    this.rightTableForm =element(by.css('div.details-content.ng-scope > form'));
    this.iconBinaryTypeSelector = element(by.model('$parent.binaryType'));
    
    this.rightSideTopForm=element(by.css('div.details-content.ng-scope > form > div'));
    this.rightSideTopFormRepeater=element.all(by.repeater('(attName, att) in formColumns | array | filter:attribFilter:attributeSearchString'));

    this.rightSideTopForm=element(by.css('div.details-content.ng-scope > form > div'));
    this.rightSideTopFormRepeater=element.all(by.repeater('(attName, att) in formColumns | array | filter:attribFilter:attributeSearchString'));

};

// Export the script as module
module.exports = new HomePage();
