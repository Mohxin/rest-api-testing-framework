var us = require('underscore');
var commonPage = require('./pages/commonPage.js');
var menuPage = require('./pages/menuPage.js');
var homePage = require('./pages/homePage.js');

describe('Search in look ups >', function () {

    beforeEach(function () {
        // Make sure this is an angular site
        isAngularSite(true);
    });
    function ClickRightChildTableBookIcon() {
        commonPage.waitUntilDisplayed(commonPage.rightChildTableBookIcon).then(function () {
            commonPage.rightChildTableBookIcon.click();
        });
    }

    function ClickBookCloseButton() {
        commonPage.waitUntilDisplayed(homePage.closeButtonInaddGroupWindow).then(function () {
            homePage.closeButtonInaddGroupWindow.click();
        });
    }

    //Store the current window handle for retuning
    var winHandleBefore = browser.getWindowHandle();

    it('Toggle to author mode >', function () {
        browser.switchTo().frame(0);
        menuPage.toolsMenu.click();
        menuPage.toggleAuthorElm.click();
    });

    it('Select Required Columns in Categories Child Table >', function () {

        commonPage.selectDropDownByText(commonPage.tableSelector, 'Categories');
        ClickRightChildTableBookIcon();
        commonPage.rightChildTableCategoryIDOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableCategoryIDOption.click();
            } else {
            }
        });
        commonPage.rightChildTableDiscontinuedOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableDiscontinuedOption.click();
            } else {
            }
        });
        commonPage.rightChildTableProductIDOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableProductIDOption.click();
            } else {
            }
        });
        commonPage.rightChildTableProductNameOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableProductNameOption.click();
            } else {
            }
        });
        commonPage.rightChildTableQuantityPerUnitOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableQuantityPerUnitOption.click();
            } else {
            }
        });
        commonPage.rightChildTableReorderLevelOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableReorderLevelOption.click();
            } else {
            }
        });
        commonPage.rightChildTableSupplierIDOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableSupplierIDOption.click();
            } else {
            }
        });
        commonPage.rightChildTableUnitPriceOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableUnitPriceOption.click();
            } else {
            }
        });
        commonPage.rightChildTableUnitsInStockOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableUnitsInStockOption.click();
            } else {
            }
        });
        commonPage.rightChildTableDisUnitsOnOrderOption.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableDisUnitsOnOrderOption.click();
            } else {
            }
        });

    });

    it('Select Required Columns', function () {
        commonPage.waitUntilDisplayed(commonPage.rightChildTableProductCategoriesRoleLink).then(function () {
            commonPage.rightChildTableProductCategoriesRoleLink.click();
        });
        commonPage.rightChildTableFKProductsCategoryID.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsCategoryID.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsCategoryName.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsCategoryName.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsCategoryDescription.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsCategoryDescription.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsCategoryPicture.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsCategoryPicture.click();
            } else {
            }
        });
    });

    it('Select Required Columns', function () {
        commonPage.waitUntilDisplayed(commonPage.rightChildTableProductSuppliersRoleLink).then(function () {
            commonPage.rightChildTableProductSuppliersRoleLink.click();
        });
        commonPage.rightChildTableFKProductsSuppliersAddress.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersAddress.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersCity.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersCity.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersCompanyName.getAttribute('checked').then(function (status) {
            if (status == 'true') {
            } else {
                commonPage.rightChildTableFKProductsSuppliersCompanyName.click();
            }
        });
        commonPage.rightChildTableFKProductsSuppliersContactName.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersContactName.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersContactTitle.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersContactTitle.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersCountry.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersCountry.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersFax.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersFax.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersHomePage.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersHomePage.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersPhone.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersPhone.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersPostalCode.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersPostalCode.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersRegion.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersRegion.click();
            } else {
            }
        });
        commonPage.rightChildTableFKProductsSuppliersSupplierID.getAttribute('checked').then(function (status) {
            if (status == 'true') {
                commonPage.rightChildTableFKProductsSuppliersSupplierID.click();
            } else {
            }
        });
        commonPage.waitUntilDisplayed(commonPage.rightChildTableProductSuppliersRoleLink).then(function () {
            commonPage.rightChildTableProductSuppliersRoleLink.click();
        });
        ClickBookCloseButton();
        browser.sleep(SleepTime);
    });

    it('Click "Company Name" lookup Icon and search by "Supplier ID"', function () {
        commonPage.RightTableChildGridRows.first().then(function (firstRow) {
            commonPage.getRightChildGridColumnsOfRow(firstRow).then(function (cols) {
                expect(cols[1].getInnerHtml()).toContain('fa fa-sort-up');
                var getRuntimeCompanyNameInChildGrid = cols[1].getText();
                cols[1].element(commonPage.companyNameLookupIcon).click();
                //cols[1].commonPage.companyNameLookupIcon.click();
                commonPage.selectDropDownByText(commonPage.companyNameLookupSelector, 'SupplierID');
                commonPage.companyNameLookupSearchValue.sendKeys('1');
                commonPage.waitUntilDisplayed(commonPage.companyNameLookupSearchButton).then(function () {
                    commonPage.companyNameLookupSearchButton.click();
                });
                commonPage.getRightChildGridCompanyNameWindowTableRows.first().then(function (firstRow) {
                    commonPage.getRightChildGridCompanyNameWindowTableColumnsOfRow(firstRow).then(function (cols) {
                        var getRuntimeCompanyNameInWindowTable = cols[1].getText();
                        expect(getRuntimeCompanyNameInChildGrid).toBe(getRuntimeCompanyNameInWindowTable);
                    });
                });
                commonPage.waitUntilDisplayed(commonPage.companyNameLookupWindowCloseButton).then(function () {
                    commonPage.companyNameLookupWindowCloseButton.click();
                });
            });
        });
    });

    it('Toggle to author mode and go back to Logic Designer', function () {
        menuPage.toolsMenu.click();
        menuPage.toggleAuthorElm.click();
        browser.switchTo().window(winHandleBefore);
    });
});
