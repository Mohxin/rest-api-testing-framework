/*
* This page holds properties to find the elements for editing
* */

var EditPage = function() {

    // get validation objects
    this.tools = element(by.css('.header-menu.account-menu'));
    this.readOnlyButton = element(by.css('.fa.fa-edit'));
    this.saveButton = element(by.css('.large-menu-icon'));
    this.UndoButton = element(by.css('.header-menu.header-action.undo-action'));

    this.customerName = element(by.id('attname'));
    this.customerBalance = element(by.id('attbalance'));
    this.customerCreditLimit = element(by.id('attcredit_limit'));
    this.productPrice = element(by.id('attproduct_price'));
    this.lineItemTotal = element(by.id('attamount'));

    this.getPopupArrow = function(col) { return col.element(by.css('.fa.fa-sort-up'))};
    this.selectLineItemLink = function(row) { return row.element(by.tagName('a'))};
    this.getOrderNumber = function(row) { return row.element(by.model('row.entity.order_number'))};

    this.childFormCustomerName = element(by.id('attcustomer_name'));
    this.childFormSalesRep = element(by.id('attsalesrep_id'));

    this.notes = element(by.id('attnotes'));
    this.topRightPaid = element(by.id('attpaid'));

    // Notification elements
    this.readOnlyNotifier = element(by.css('.NotificationContent'));
    this.closeNotification = element(by.buttonText('Close'));

    this.getDeleteIconOnRightTable = function (row) {
        return row.element(by.css('.gridActionButton.childActionButton.fa-times'));
    };

    this.lineItemQtyOrdered = element(by.id('attqty_ordered'));
};

// Export the script as module
module.exports = new EditPage();