/*
* This page holds properties and few methods to find the elements for inserting
* */

var InsertPage = function() {

    // get validation objects
    // Right bottom
    this.rightGridFooter = element(by.id('childFooter'));
    this.insertButton = function(){
        return this.rightGridFooter.element(by.buttonText('Insert'))
    };

    this.leftTableInsertButton = element(by.id('leftGridFooter')).element(by.css('.eslo-button.grid-insert'));

    this.childrenTableContainer = element(by.id('childrenTableContainer'));

    this.getLineItemGridRows = function(){
//       return this.childrenTableContainer.all(by.repeater('row in renderedRows'));
    	return element.all(by.css('#childCollections .ngRow'));
    };

    this.selectedRightTableRow = element(by.css('#childrenTable .ngRow.selected'));

    this.getLineItemGridFirstRow = function(){
//        return this.getLineItemGridRows().then(function(rows){
//            return rows[0];
//        })
        return this.getLineItemGridRows().first();
    };

    this.getLineItemGridFirstRowColumns = function(){
       return this.getLineItemGridFirstRow().all(by.repeater('col in renderedColumns'));
    };

    this.getInsertRowSelectItemIcon = function(){
        return this.getLineItemGridFirstRow().then(function(firstRow){
            return firstRow.element(by.css('.fa-sort-up'));
        })
    };

    this.getInsertRowSelectItemQty = function(){
        return this.getLineItemGridFirstRow().then(function(firstRow){
            return firstRow.all(by.repeater('col in renderedColumns'));
        })
    };

    // Popup
    this.LineItemModalDialog = element(by.css('.modal-dialog'));
    this.exitModal = element(by.css('.exitModal'));
    this.selectLineItemTableRows = element.all(by.repeater('row in searchRows'));
    this.selectParentTableColumns = element.all(by.repeater('col in selectedParentTableColumns'));

    this.getMappedLineItem = function(nameColNumber){
        if(typeof(nameColNumber)==='undefined') nameColNumber = 1;
      return this.selectLineItemTableRows.map(function(row){
         var columns = row.all(by.repeater('col in selectedParentTableColumns'));
          return columns.then(function(cols){
              return {
                  name: cols[nameColNumber].getText(),
                  rowElm: row
              }
            });
         });
    };

    this.leftGridFooter = element(by.id('leftGridFooter'));
    this.insertButton =this.leftGridFooter.element(by.css('.eslo-button.grid-insert'));
    this.employeePictureEmployeeID = element(by.id('attemployee_id'));
    this.employeePictureResumeID=element(by.id('attresume'));
    this.rightGridFooter = element(by.id('childFooter'));
    this.ChildGridInsertButton =this.rightGridFooter.element(by.buttonText('Insert'))
};

// Export the script as module
module.exports = new InsertPage();