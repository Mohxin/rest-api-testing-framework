
/**
 * Created by Sony on 15-08-2014.
 */
var MenuPage = function(){

    this.toolsMenuMain = element(by.css('.header-menu.account-menu.dropdown'));
    this.toolsMenu = this.toolsMenuMain.element(by.css('i.fa.fa-caret-down.menu-caret'));
    this.toggleAuthorElm = element(by.css('.toggle-author > i.fa.fa-gear'));
    this.adminUsername = element(by.model('adminLogin.userName'));
    this.adminPassword = element(by.id('password'));
    this.adminLoginButton = element(by.id('loginButton'));

    this.appSettingsElm = element(by.css('.toggle-author > i.fa.fa-th'));
    this.skinsTab = element(by.linkText('Skins'));
    this.createNewSkinButton = element(by.buttonText('Create new skin'));
    this.downloadSkinLink = element(by.linkText('Download sample stylesheet'));
    this.modalDialog = element(by.css('.modal-dialog'));


    //TODO: need to add an id to the save button (buttonText is not working)
    this.saveSkinButton = element(by.css('[ng-click="saveSkin()"]'));
    this.buttonCloseSkinWindow = this.modalDialog.element(by.css('.pull-right.close'));

    this.closeButton = element(by.buttonText('Close'));
    this.chooseFileButton = element(by.id('skinFile'));

    this.skinTable = element.all(by.repeater('skin in skins'));

    this.editLastSkin = function(){
        this.skinTable.last().then(function(lastSkin){
            lastSkin.element(by.linkText('Edit')).click();
        })
    };

    this.deleteLastSkin = function(){
        this.skinTable.last().then(function(lastSkin){
            lastSkin.element(by.linkText('Delete')).click();
        })
    };

    this.helpButton = element(by.css('.header-menu.help-menu'));

    this.getMenuItemElm = function(menuItemName){
      return this.helpButton.element(by.linkText(menuItemName));
    };

    this.aboutDialogContent = element(by.css('.modal-column-container'));
    //Tools Window Element Properties
    this.ToolsWindowShare=element(by.linkText(' Share'));
    this.ToolsWindowShareContent=element(by.css('#app > div.modal.fade.in > div > div > div.modal-body.ng-scope > form > div > div > div.col-md-3 > textarea'));
    this.ToolsWindowShareCloseButton=element(by.css('[ng-click="close();"]'));
    this.ToolsWindowLogOut=element(by.linkText(' Log Out'));
    this.openNewWindow = function(url){
        browser.driver.executeScript("$(window.open('"+url+"'))");
    };
    //Menu Window Element Properties
    this.MenuWindow = element(by.css('#eslo-header'));
    this.MenuWindowButton = element(by.css('.fa-desktop.menu-icon'));
    this.MenuWindowMainGrid = this.MenuWindow.element(by.linkText('Main Grid'));
    this.MenuWindowRESTLog=this.MenuWindow.element(by.linkText('REST Log'));
    this.MenuWindowForm=this.MenuWindow.element(by.linkText('Form'));
    this.MenuWindowChildGrid=this.MenuWindow.element(by.linkText('Child Grid'));

    this.MenuWindowRESTLogTitle=element(by.css('#leftSide > div.restLogWindow.ng-scope > h3'));
    this.MenuWindowSaveButton=element(By.css('.menu-icon.large-menu-icon'));

    this.modalError = this.modalDialog.element(by.css('.alert.alert-danger'));

    this.authorLogin = function(adminUserName, adminPassword) {
        this.adminUsername.clear();
        this.adminPassword.clear();
        var userName = adminUserName ? adminUserName : browser.params.login.admin.userName;
        var password = adminPassword ? adminPassword : browser.params.login.admin.password;
        this.adminUsername.sendKeys(userName);
        this.adminPassword.sendKeys(password);
        this.adminLoginButton.click();
    };

    this.toggleAuthor = function(adminUserName, adminPassword){
        this.toolsMenu.click();
        this.toggleAuthorElm.click();
        this.authorLogin(adminUserName, adminPassword);
    };

    this.toggleAuthorToNormalUser = function(){
        this.toolsMenu.click();
        this.toggleAuthorElm.click();
    };
};

// Export the script as module
module.exports = new MenuPage();
