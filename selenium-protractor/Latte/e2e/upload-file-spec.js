var MenuPage = require('./pages/menuPage.js')
var us = require('underscore');
var HomePage = require('./pages/homePage.js');
var InsertPage = require('./pages/insertPage.js');
var commonPage = require('./pages/commonPage.js');

var path = require('path');

describe('Image/File Upload >', function () {
    var newEmployeeId;

    function getNewEmployeeId() {
        var searchInput = HomePage.leftTableSearchInput;

        // generate a random number
        var randomEmployeeID = HomePage.getRandomNumber(1, 60);

        // Search for the existence of the new number
        searchInput.clear();
        HomePage.searchTypesIcon.click();
        HomePage.selectDropDownByText(HomePage.searchTypesDropDown, 'employee_id');
        searchInput.sendKeys(randomEmployeeID);
        HomePage.leftTableSearchIcon.click();

        // if doesn't exists return the new number
        // otherwise repeat until doesn't exists
        return HomePage.topLeftTableRows.then(function (rows) {
            if (rows.length == 0)
                return randomEmployeeID;
            else
                return getNewEmployeeId();
        })
    }

    describe('Add new employee to employee picture > ', function () {

        it('should get new employee id', function () {
            HomePage.selectDropDownByText(HomePage.tableSelctor, 'demo:employee_picture');
            newEmployeeId = getNewEmployeeId();

        });

        it('should add new employee', function () {
            //Click Insert Button
            InsertPage.leftTableInsertButton.click();
            //Clear value
            InsertPage.employeePictureEmployeeID.clear();
            //Enter Employee ID
            InsertPage.employeePictureEmployeeID.sendKeys(newEmployeeId);

            //Click Save button
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });
        });
    });

    /**
     * Test Case-1:Select employee_picture table, click on any record and on the form,
     * go to picture or icon (<2000 bytes) and click upload file.
     */
    describe('Update images', function () {

        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Updating images', function () {
            //Select "employee_picture"  from Table
            HomePage.selectDropDownByText(HomePage.tableSelctor, 'employee_picture');
            browser.sleep(SleepTime);

            //Click First Record From the Table
            HomePage.topLeftTableRows.first().then(function (firstRow) {
                firstRow.click();
            });

            //Click Picture Icon
            HomePage.FormTableUploadContentPicture.click();
            browser.sleep(SleepTime);

            //Click "Upload File" option
            HomePage.PictureUploadFileOption.click();

            HomePage.UploadImageFunction('../files/UL1.png');

            HomePage.UploadButton.click();
            browser.sleep(SleepTime);

            HomePage.VerifyUploadImageMessageFunction('Upload complete');
            HomePage.CloseButton.click();

            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });
            HomePage.topLeftTableRows.first().then(function (firstRow) {
                HomePage.getColumnsOfRow(firstRow).then(function (cols) {
                    expect(cols[3].getText()).not.toEqual('0 binary');
                });
            });
        });

    });

    /**
     * Test Case-2:Select employee_picture table-Insert Record and Upload Image-Select Display to Show Image
     */
    describe('Upload images', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Uploading images', function () {
            /**
             * Step1
             * The file should be uploaded successfully.
             * Select "employee_picture"  from Table
             */

                //Click Latest Added(Always shows in Last Row) Record From the Table
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                lastRow.click();
            });

            //Click Picture Icon
            HomePage.FormTableUploadContentPicture.click();

            //Click "Upload File" option
            HomePage.PictureUploadFileOption.click();

            HomePage.UploadImageFunction('../files/UL1.png');

            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');

            //Close Upload Window
            HomePage.CloseButton.click();

            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Verify whether the file has been added or not
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[3].getText()).not.toEqual('0 binary');
                });
            });

            /* Step2
             * The image should be loaded on both the form and the grid successfully
             * Click Picture Icon
             */
            HomePage.FormTableUploadContentPicture.click();

            //Click "Show As Image" option
            HomePage.PictureShowAsImageOption.click();

            //Verify whether the file showing in left table or not
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                HomePage.getColumnsOfRow(lastRow).then(function (cols) {
                    cols[3].getText().getAttribute('innerHTML').then(function (LeftTableImageText) {
                        expect(LeftTableImageText).toContain('row-image');
                    });
                });
            });

            //verify image in right form
            HomePage.ContentPictureID.getAttribute('innerHTML').then(function (RightFormPictureImageText) {
                expect(RightFormPictureImageText).toContain('scalarImage');
            });
        });
    });

    /**
     * Test Case-3:Select employee_picture table-Insert Record and Upload Image<2000(Icon)-Select Display to Show Image-Upload Image>2000
     */
    describe('Upload icons', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Uploading images', function () {
            /*
             * Step1
             * The file should be uploaded successfully.
             * Select "employee_picture"  from Table
             */

            //Click Latest Added(Always shows in Last Row) Record From the Table
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                lastRow.click();
            });

            //Click Picture Icon
            HomePage.FormTableUploadContentIcon.click();

            //Click "Upload File" option
            HomePage.IconUploadFileOption.click();
            HomePage.UploadImageFunction('../files/lessthan2kb.png');

            //Click Upload Button
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');

            //Close Upload Window
            HomePage.CloseButton.click();

            //Click Menu Window Save Button
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Verify whether the file has been added or not
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[2].getText()).not.toEqual('0 binary');
                });
            });

            /* Step3
             The upload should fail with an appropriate error message
             Upload Image >2000 bytes
             Click Latest Added(Always shows in Last Row) Record From the Table
             */
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                lastRow.click();
            });

            //Click Picture Icon
            HomePage.FormTableUploadContentIcon.click();

            //Click "Upload File" option
            HomePage.IconUploadFileOption.click();

            //Upload Image
            HomePage.UploadImageFunction('../files/GreaterThan2kb.png');

            //Click Upload Button
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);

            //Click Close button
            HomePage.CloseButton.click();

            //Click Menu Window Save Button
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Verify whether the file has been added or not
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[2].getText()).not.toEqual('0 binary');
                });
            });

            /* Step2
             * The image should be loaded on both the form and the grid successfully
             * Click Picture Icon
             */
            HomePage.FormTableUploadContentIcon.click();

            //Click "Show As Image" option
            HomePage.IconShowAsImageOption.click();

            //Verify whether the file showing in left table or not
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                HomePage.getColumnsOfRow(lastRow).then(function (cols) {
                    cols[2].getText().getAttribute('innerHTML').then(function (LeftTableImageText) {
                        console.log(LeftTableImageText);
                        expect(LeftTableImageText).toContain('row-image');
                    });
                });
            });

            //verify image in right form
            HomePage.ContentIconID.getAttribute('innerHTML').then(function (RightFormPictureImageText) {
                console.log(RightFormPictureImageText);
                expect(RightFormPictureImageText).toContain('scalarImage');
            });
        });
    });

    describe('Insert image into updated row', function () {

        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('It should display a message that the row should be saved first and upload image successfully', function () {

            /**
             * Step1
             */
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                lastRow.click();
            });

            //Click Picture Icon
            //HomePage.FormTableUploadContentPicture.click();

            HomePage.PictureOptions.click();
            //Upload File
            HomePage.PictureUploadFileOption.click();
            HomePage.UploadImageFunction('../files/UL1.png');
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');

            //Close Upload Window
            HomePage.CloseButton.click();

            // Save the changes
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Verify whether the file has been added or not
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[3].getText()).not.toEqual('0 binary');
                });
            });
        });
    });

    describe('Verify binary types for images', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Verify binary types for images', function () {
            // Step 1
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                lastRow.click();
            });

            //=========Add Picture Icon==============
            //Click Picture Icon
            HomePage.FormTableUploadContentPicture.click();
            //HomePage.PictureOptions.click();
            //Click "Upload File" option
            HomePage.PictureOptions.click();
            HomePage.PictureUploadFileOption.click();
            HomePage.UploadImageFunction('../files/lessthan2kb.png');
            //Click Upload Button
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');
            //Close Upload Window
            HomePage.CloseButton.click();
            browser.sleep(5000);

            //==============Add Icon Image============
            //Click Icon
//           HomePage.IconOptions.click();
//            //Click "Upload File" option
//            HomePage.IconUploadFileOption.click();
//            //Upload Image
//            HomePage.UploadImageFunction('../files/lessthan2kb.png');
//            //Click Upload Button
//            HomePage.UploadButton.click();
//            browser.sleep(SleepTime);
//            HomePage.VerifyUploadImageMessageFunction('Upload complete');
//            //Close Upload Window
//            HomePage.CloseButton.click();

            //==============Add Voice============
            //Click Voice
            HomePage.FormTableUploadcontentVoice.click();
            //Click "Upload File" option
            HomePage.VoiceUploadFileOption.click();
            HomePage.UploadImageFunction('../files/audio.mid');
            //Click Upload Button
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');
            //Close Upload Window
            HomePage.CloseButton.click();

            /**
             * Step 2
             * The image should be loaded on both the form and the grid successfully
             */

                //Icon
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[2].getText()).not.toEqual('0 binary');
                });
            });

            //Picture
            HomePage.topLeftTableRows.last().then(function (selectedRow) {
                HomePage.getColumnsOfRow(selectedRow).then(function (cols) {
                    expect(cols[3].getText()).not.toEqual('0 binary');
                });
            });

            /**
             * Step3
             * Select "Show As Image" option and verify image should be loaded on both the form and the grid successfully
             */

            HomePage.FormTableUploadContentPicture.click();
            HomePage.PictureOptions.click();

            HomePage.PictureShowAsImageOption.click();
            browser.sleep(SleepTime);

            //Verify whether the Picture Image file showing in left table or not
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                HomePage.getColumnsOfRow(lastRow).then(function (cols) {
                    cols[3].getText().getAttribute('innerHTML').then(function (LeftTableImageText) {
                        expect(LeftTableImageText).toContain('row-image');
                    });
                });
            });

            //verify Picture image in right form
            HomePage.ContentPictureID.getAttribute('innerHTML').then(function (RightFormPictureImageText) {
                expect(RightFormPictureImageText).toContain('scalarImage');
            });

            //Icon
            //Just Focusing Employee ID text box to click "Show as Image" for Icon
            InsertPage.employeePictureEmployeeID.clear();
            InsertPage.employeePictureEmployeeID.sendKeys(newEmployeeId);

            //Click Menu Window Save Button
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Click Icon
            HomePage.FormTableUploadContentIcon.click();
            HomePage.IconOptions.click();

            //Click "Show As Image" option
            HomePage.IconShowAsImageOption.click();
            //Verify whether the Icon Image file showing in left table or not
            HomePage.topLeftTableRows.last().then(function (lastRow) {
                HomePage.getColumnsOfRow(lastRow).then(function (cols) {
                    cols[3].getText().getAttribute('innerHTML').then(function (LeftTableImageText) {
                        expect(LeftTableImageText).toContain('row-image');
                    });
                });
            });
            //verify Icon image in right form
            HomePage.ContentPictureID.getAttribute('innerHTML').then(function (RightFormIconImageText) {
                expect(RightFormIconImageText).toContain('scalarImage');
            });

            //Voice
            //Just Focusing Employee ID text box to click "Show as Sound" for Voice
            InsertPage.employeePictureResumeID.clear();
            InsertPage.employeePictureResumeID.sendKeys('1');
            //Click Voice Icon
            HomePage.FormTableUploadcontentVoice.click();
            //Click "Show As Sound" option
            HomePage.VoiceShowAsSoundOption.click();
        });
    });

    xdescribe('Upload images onto child grid ', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Employee Table-Select Employee Child Grid', function () {
            var searchInput = HomePage.leftTableSearchInput;

            //Get New Employee ID
            HomePage.selectDropDownByText(HomePage.tableSelctor, 'employee_picture');
            newEmployeeId = getNewEmployeeId();

            //Select "employee"  from Table
            HomePage.selectDropDownByText(HomePage.tableSelctor, 'employee');

            //Search Record using Random Number
            HomePage.searchTypesIcon.click();
            HomePage.selectDropDownByText(HomePage.searchTypesDropDown, 'employee_id');
            searchInput.sendKeys(newEmployeeId);
            HomePage.leftTableSearchIcon.click();

            //Click First Record From the Table
            HomePage.topLeftTableRows.first().then(function (firstRow) {
                firstRow.click();
            });

            //Click Employee Right Side Child Table "Employee Picture Tab"
            HomePage.RightSideChildTableEmployeePictureTab.click();
            browser.sleep(SleepTime);

            //Click Insert Button
            InsertPage.ChildGridInsertButton.click();

            //Click Menu Window Save Button
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });

            //Click First Record From the Child Table
            HomePage.RightTableChildGridRows.first().then(function (firstRow) {
                firstRow.click();
            });
        });

        it('Upload images onto child grid ', function () {

            //Click Zoom In Icon
            HomePage.RightSideChildTableEmployeePicutureZoomInIcon.click();
            browser.sleep(SleepTime);

            //Click Icon
            HomePage.FormTableUploadContentIcon.click();

            //Click "Upload File" option
            HomePage.IconUploadFileOption.click();
            HomePage.UploadImageFunction('../files/lessthan2kb.png');

            //Click Upload Button
            HomePage.UploadButton.click();
            browser.sleep(SleepTime);
            HomePage.VerifyUploadImageMessageFunction('Upload complete');

            //Close Upload Window
            HomePage.CloseButton.click();

            // Go to back to get into the child grid
            HomePage.rightSideBackButton.click();

            //Click Employee Right Side Child Table "Employee Picuture Tab"
            HomePage.RightSideChildTableEmployeePictureTab.click();
            browser.sleep(SleepTime);

            //Click Zoom In Icon
            HomePage.RightSideChildTableEmployeePicutureZoomInIcon.click();
            browser.sleep(SleepTime);

            //Click Picture Icon
            HomePage.FormTableUploadContentPicture.click();
            browser.sleep(SleepTime);

            //Click "Upload File" option
            HomePage.PictureUploadFileOption.click();
            HomePage.UploadImageFunction('../files/lessthan2kb.png');
            browser.sleep(SleepTime);

            HomePage.UploadButton.click();
            browser.sleep(SleepTime);

            HomePage.VerifyUploadImageMessageFunction('Upload complete');

            HomePage.CloseButton.click();
            commonPage.waitUntilDisplayed(MenuPage.MenuWindowSaveButton).then(function(){
                MenuPage.MenuWindowSaveButton.click();
            });
        });

        it('Verify whether the uploaded images are showing in Right Child Grid Or NOT ', function () {

            // Go to back to get into the child grid
            HomePage.rightSideBackButton.click();

            //Click Employee Right Side Child Table "Employee Picuture Tab"
            HomePage.RightSideChildTableEmployeePictureTab.click();

            //Select Record in Left top Table
            HomePage.RightTableChildGridRows.first().then(function (firstRow) {
                HomePage.getRightChildGridColumnsOfRow(firstRow).then(function (cols) {
                    expect(cols[1].getText()).not.toEqual('0 binary');
                });
            });

            HomePage.RightTableChildGridRows.first().then(function (firstRow) {
                HomePage.getRightChildGridColumnsOfRow(firstRow).then(function (cols) {
                    expect(cols[2].getText()).not.toEqual('0 binary');
                });
            });
        });

    });

    xdescribe('Loading lookup with images', function () {
        beforeEach(function () {
            //Make sure this is an angular site
            isAngularSite(true);
        });

        it('Select Product Table-Toggle to author mode', function () {
            var searchInput = HomePage.leftTableSearchInput;
            //Get New Employee ID
            HomePage.selectDropDownByText(HomePage.tableSelctor, 'product');

            MenuPage.toggleAuthor();
        });
        it('should change icon settings to show image', function () {

            // make sure the icon column is visible
            HomePage.leftTableEditColumnsIcon.click();
            var iconCheckBox = HomePage.productIconColumSettingCheckBox;
            iconCheckBox.getAttribute('checked').then(function (chk) {
                if (chk == null)
                    iconCheckBox.click();

                HomePage.CloseButton.click();

                // Change binary type to Image and save
                HomePage.productTableIconSettings.click();
                var imageType = HomePage.iconSettingsBinaryTypeDropDown;
                HomePage.selectDropDownByText(imageType, '1');
                HomePage.iconSettingsSaveButton.click();

            });
        });

        it('should go back to edit mode and make sure product look up is enabled', function () {

            // check product look up in child grid
            HomePage.rightTableEditColumnsIcon.click();
            browser.sleep(SleepTime);

            HomePage.rightTableProductNumberSettingCheckBox.getAttribute('checked').then(function(chk){
                if(chk == null)
                    HomePage.rightTableProductNumberSettingCheckBox.click();

                HomePage.CloseButton.click();
            });
        });

        it('should verify the images are displayed in the lookup', function () {

            // Go back to edit mode
            MenuPage.toolsMenu.click();
            MenuPage.toggleAuthorElm.click();

            //TODO: Need to implement verification after confirm the operation
        });
    });
});