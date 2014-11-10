var CommonPage = function () {
    this.closeButtonInaddGroupWindow=element(by.buttonText('Close'));
    this.selectDropDownByText =
        function (dropDownElm, optionText) {
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

    this.waitUntilDisplayed = function (elm) {
        return browser.wait(function () {
            return elm.isPresent().then(function (itsThere) {
                if (itsThere)
                    return elm.isDisplayed().then(function () {
                        return true;
                    }, function () {
                        return false;
                    });
                else
                    return false;
            }, function () {
                return false;
            })
        });
    };

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

    this.getRandomNumber = function (min, max) {
        min = min ? min : 1000;
        max = max ? max : 10000;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    this.promptUnSavedNotification = element(by.css('.NotificationContent'));
    this.buttonUndoChanges = element(by.buttonText('Undo Changes'));
    this.buttonReviewChanges = element(by.buttonText('Review Changes'));

    this.selectProject = element(by.id('projectSelect'));
    //Select Project
    this.selectSampleProject = function (ProjectName) {
        element.all(by.css('#projectMenu > ul > li')).filter(function (elem) {
            return elem.getText().then(function (text) {
                return text.indexOf(ProjectName) == 0;
            });
        }).then(function (filteredElements) {
            filteredElements[0].click();
        });
    };
    this.liveBrowser = element(by.id('lbLink'));
    this.inThisBrowser = element(by.id('LBlocal'));
    this.inNewBrowser = element(by.id('LBwindow'));
    this.toolsMenu = element(by.css('.header-menu.account-menu.dropdown'));
    this.toggleAuthorElm = element(by.linkText(' Toggle Author Mode'));
    this.toolsWindowLogOut = element(by.css('.fa.fa-power-off'));

    this.saveButton= element(by.buttonText('Save'));
    this.toggLoginFailureMessage= element(by.css('#app > div.modal.fade.in > div > div > form > div.modal-body > div.alert.alert-danger.ng-hide'));
    this.toggCancelButton = element(by.buttonText('Cancel'));
    this.leftTableHeadergearndowNameField=element(by.model('form.alias'));
    this.leftTableHeader=element(by.css('#leftTableDiv > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    //this.leftTableHeadergearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.RightchildGridTableHeader=element(by.css('#childrenTable > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    //this.RigthchildGridgearIcon=this.RightchildGridTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.rigthchildGridTabLabelName=element.all(by.repeater('tab in formChildrenTablesKeys'));
    this.rigthchildGridTabThreegearIconLabelValue=element.all(by.model('scalarTableSettings.childrenSettings[childName].alias'));
    //Case-4
    this.leftTableHeaderCreditLimitgearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt3 > i'));
    //Case3
    this.leftTableHeaderBookIconSalesrepIdOption = element(by.id('colSelectsalesrep_id'));
    this.leftTableDiv = element(by.id('leftTableDiv'));
    //this.leftTableHeaderRow =this.leftTableDiv.element(by.css('div.ngHeaderContainer'));
    this.rightChildTable=element(by.css('#childrenTable > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    //this.rightChildTableBookIcon = this.rightChildTable.element(by.css('div.columns-dropdown.ng-scope > i'));
    //this.purchaseOrderChildTableLineItemProductRoleLink = element(by.css('div.panel-heading > h4 > a'));
    this.leftTableHeaderBookIconProductIconOption = element(by.id('colSelecticon'));
    this.leftTableHeaderBookIconProductNameOption = element(by.id('colSelectname'));
    this.leftTableHeaderBookIconProductFullImageOption = element(by.id('colSelectfull_image'));
    this.leftTableHeaderBookIconProductPriceOption = element(by.id('colSelectprice'));
    this.leftTableHeaderBookIconProductNumberOption = element(by.id('colSelectproduct_number'));
    this.leftTableHeaderIconColumngearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt1 > i'));
    this.leftTableHeaderFullImagegearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt2 > i'));




    this.auditTimeOptionSelector = element(by.model('form.mask'));


    this.waitUntilDisplayed = function (elm) {
        return browser.wait(function () {
            return elm.isPresent().then(function (itsThere) {
                if (itsThere)
                    return elm.isDisplayed().then(function () {
                        return true;
                    }, function () {
                        return false;
                    });
                else
                    return false;
            }, function () {
                return false;
            })
        });
    };

    this.bookIcon = element(by.css('.eslo-button.formEditColumnSelection'));
    this.columnDisplay = element(by.linkText('Column Display'));
    this.columnOrder = element(by.linkText('Column Order (Beta)'));
    this.bookWindowAddNewGroupButton = element(by.css('button.btn.btn-default'));
    this.bookWindow = element(by.css('div.tab-section.active'));

    this.bookWindowAddNewGroupTitle = function (AddGroupWindow) {
        return AddGroupWindow.all(by.model('group.title'));
    };

    this.bookWindowDeleteGroupIcon = function (DeleteIcon) {
        return DeleteIcon.all(by.css('div.input-group-addon'));
    };

    this.bookWindowAttributesRow = function (GroupNum, AttRowNum) {
        element(by.repeater('group in params.groups').row(GroupNum)).
            element(by.repeater('key in group.columns').row(AttRowNum - 1)).click();
        browser.sleep(SleepTime);
    };
    this.bookWindowGroupRow = function (GroupNum) {
        return element(by.repeater('group in params.groups').row(GroupNum)).
            element(by.css('.sortable.grouping.ui-sortable'));
    };

    this.closeButtonInaddGroupWindow = element(by.buttonText('Close'));
    this.selectPlacementDropdownValue = function (Value) {
        element(by.cssContainingText('option', Value)).click();
    };

    //Select DD Values
    this.searchTable = element(by.model('searchTable'));
    this.tableSelector = element(by.id('eslo-table-select'));

    //Sep 26
    this.rightSideTopForm=element(by.css('div.details-content.ng-scope > form > div'));
    this.rightSideTopFormRepeater=element.all(by.repeater('(attName, att) in formColumns | array | filter:attribFilter:attributeSearchString'));
    this.baseSalaryEvaluation=element(by.model('activeExp.expression'));
    this.baseSalaryCSSSelector=element(by.model('activeExp.selector'));
    this.baseSalaryTrueStyle=element(by.model('activeExp.onTrue'));
    this.baseSalaryFalseStyle=element(by.model('activeExp.onFalse'));
    this.baseSalaryPlusIcon=element(by.css('[ng-click="addExp();"]'));

    this.leftTableInsertButton = element(by.id('leftGridFooter')).element(by.css('.eslo-button.grid-insert'));
    this.employeeTypeID = element(by.id('attemployee_type'));
    this.employeeName = element(by.id('attname'));
    this.gearSave= element(by.buttonText('Save'));

    this.leftTableHeader=element(by.css('#leftTableDiv > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    this.leftTableHeaderBaseSalarygearIcon=this.leftTableHeader.element(by.css('div.ngHeaderText.colt2 > i'));
    this.leftTableHeaderBookIcon = this.leftTableHeader.element(by.css('div.columns-dropdown.ng-scope > i'));
    this.leftTableHeaderBookIconNameOption = element(by.id('colSelectname'));
    this.rightFormBaseSalaryInput = element(by.id('attbase_salary'));


    this.rightChildTable=element(by.css('#childrenTable > div.ngTopPanel.ng-scope > div.ngHeaderContainer > div'));
    this.rightChildTableBookIcon = this.rightChildTable.element(by.css('div.columns-dropdown.ng-scope > i'));

    this.rightChildTableCategoryIDOption = element(by.id('colSelectCategoryID'));
    this.rightChildTableDiscontinuedOption = element(by.id('colSelectDiscontinued'));
    this.rightChildTableProductIDOption = element(by.id('colSelectProductID'));
    this.rightChildTableProductNameOption = element(by.id('colSelectProductName'));
    this.rightChildTableQuantityPerUnitOption = element(by.id('colSelectQuantityPerUnit'));
    this.rightChildTableReorderLevelOption = element(by.id('colSelectReorderLevel'));
    this.rightChildTableSupplierIDOption = element(by.id('colSelectSupplierID'));
    this.rightChildTableUnitPriceOption = element(by.id('colSelectUnitPrice'));
    this.rightChildTableUnitsInStockOption = element(by.id('colSelectUnitsInStock'));
    this.rightChildTableDisUnitsOnOrderOption = element(by.id('colSelectUnitsOnOrder'));

    this.rightChildTableProductCategoriesRoleLink=element(by.linkText('nw:Categories via role FK_Products_Categories'));
    this.rightChildTableFKProductsCategoryID = element(by.id('colSelect-FK_Products_Categories-CategoryID'));
    this.rightChildTableFKProductsCategoryName = element(by.id('colSelect-FK_Products_Categories-CategoryName'));
    this.rightChildTableFKProductsCategoryDescription = element(by.id('colSelect-FK_Products_Categories-Description'));
    this.rightChildTableFKProductsCategoryPicture = element(by.id('colSelect-FK_Products_Categories-Picture'));

    this.rightChildTableProductSuppliersRoleLink=element(by.linkText('nw:Suppliers via role FK_Products_Suppliers'));
    this.rightChildTableFKProductsSuppliersAddress = element(by.id('colSelect-FK_Products_Suppliers-Address'));
    this.rightChildTableFKProductsSuppliersCity = element(by.id('colSelect-FK_Products_Suppliers-City'));
    this.rightChildTableFKProductsSuppliersCompanyName = element(by.id('colSelect-FK_Products_Suppliers-CompanyName'));
    this.rightChildTableFKProductsSuppliersContactName = element(by.id('colSelect-FK_Products_Suppliers-ContactName'));
    this.rightChildTableFKProductsSuppliersContactTitle = element(by.id('colSelect-FK_Products_Suppliers-ContactTitle'));
    this.rightChildTableFKProductsSuppliersCountry = element(by.id('colSelect-FK_Products_Suppliers-Country'));
    this.rightChildTableFKProductsSuppliersFax = element(by.id('colSelect-FK_Products_Suppliers-Fax'));
    this.rightChildTableFKProductsSuppliersHomePage = element(by.id('colSelect-FK_Products_Suppliers-HomePage'));
    this.rightChildTableFKProductsSuppliersPhone = element(by.id('colSelect-FK_Products_Suppliers-Phone'));
    this.rightChildTableFKProductsSuppliersPostalCode = element(by.id('colSelect-FK_Products_Suppliers-PostalCode'));
    this.rightChildTableFKProductsSuppliersRegion = element(by.id('colSelect-FK_Products_Suppliers-Region'));
    this.rightChildTableFKProductsSuppliersSupplierID = element(by.id('colSelect-FK_Products_Suppliers-SupplierID'));


    this.RightTableChildGridDiv = element(by.id('childrenTable'));
    this.RightTableChildGridRows = this.RightTableChildGridDiv.all(by.css('#childrenTable .ngRow'));
    this.getRightChildGridColumnsOfRow = function (row) {
        return row.all(by.repeater('col in columns'));
    };
    this.companyNameLookupIcon = by.css('div.ngCell.ng-scope.col1.colt1 > div > div > i');
    this.companyNameLookupSelector = element(by.model('crit.col'));
    this.companyNameLookupSearchValue = element(by.model('crit.colValue'));
    this.companyNameLookupSearchButton= element(by.buttonText('Search'));
    this.companyNameLookupWindowCloseButton= element(by.buttonText('X'));
    this.getRightChildGridCompanyNameWindowTableRows = element.all(by.repeater('row in searchRows'));
    this.getRightChildGridCompanyNameWindowTableColumnsOfRow = function (row) {
        return row.all(by.repeater('col in selectedParentTableColumns'));
    };


};

// Export the script as module
module.exports = new CommonPage();
