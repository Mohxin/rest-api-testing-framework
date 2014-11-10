/*
* This page holds properties to find the elements for searching
* */

var SearchPage = function() {

    // get validation objects
    this.searchOptionsButton = element(by.css('.filter-flyout-icon'));
    this.searchIcon = element(by.css('.search-icon'));
    this.filterFlyOut = element(by.css('.filter-flyout'));

    this.filterTypeSelectName = element(by.css('select option[value="name"]'));
    this.filterValue = element(by.model('filter.value'));
};

// Export the script as module
module.exports = new SearchPage();