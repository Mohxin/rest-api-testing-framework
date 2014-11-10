/**
 * Created by Karuna on 27/10/14.
 */
var path = require('path');
var topRightPage = function() {
    // Header
    this.detailsHeader = element(by.css('.details-header.eslo-details-header'));
    this.NextButton=this.detailsHeader.element(by.buttonText('Next'));
    this.PreviousButton=this.detailsHeader.element(by.buttonText('Previous'));
    this.UnsavedChangesTitle=element(by.css('#eslo-details-title')).element(by.css('.badge'));
    this.rightSideBackButton = this.detailsHeader.element(by.buttonText('Back'));
    // Form elements
    this.topRightName = element(by.id('attname'));
    this.topRightBalance = element(by.id('attbalance'));
    this.topRightCreditLimit = element(by.id('attcredit_limit'));
    this.topRightOrderNum = element(by.id('attorder_number'));
    this.topRightAmount = element(by.id('attamount_total'));
    this.topRightPaid = element(by.id('attpaid'));
    this.FormLineItemIDInput=element(by.id('attlineitem_id'));
    this.topRightFormFieldItemsCount = element.all(by.repeater('(attName, att) in formColumns | array | filter:attribFilter:attributeSearchString'));
    this.topRightFormName = element(by.name('detailsForm'));
    this.balanceCurrencySelector = element(by.model('form.mask'));
    // Search Attributes
    this.SearchAttribute = element(by.id('eslo-scalar-search'));

    //Upload File
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
    this.employeePictureResumeID=element(by.id('attresume'));
    this.rightTableForm =element(by.css('div.details-content.ng-scope > form'));

    this.topRightBalance = element(by.id('attbalance'));
    this.topRightCreditLimit = element(by.id('attcredit_limit'));

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

    this.getUndoIconOnRightTable = function (row) {
        return row.element(by.css('.gridActionButton.childActionButton'));
    };
    // This method gets the customer change icon from the details page
    this.getDetailsCustomerChangeIcon = function(){
        //return element(by.xpath('//*[@id="rightSide"]/div[1]/div[2]/form/div[5]/div/div[2]/div/span[1]/button'));
        return element.all(by.css('.fa.fa-caret-square-o-up.parentSelectButton'));
    };
};

// Export the script as module
module.exports = new topRightPage();