var us = require('underscore');
var commonPage = require('./pages/commonPage.js');
var leftPage = require('./pages/leftPage.js');
var topRightPage = require('./pages/topRightPage.js');

describe('Traverse Previous and Next', function()
{
    beforeEach(function() {
        //Make sure this is an angular site
        isAngularSite(true);
    });

    it('Go to customer table', function(){
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
    });

    it('Traverse Previous and Next', function()
    {
        //Click First Record and Click Next button
        leftPage.topLeftTableRows.first().then(function(firstRow)
        {
            firstRow.click();
            //Click Next button
            topRightPage.NextButton.click();
        });
            //Get Next Row Values From Left Table and Compare with Form values which is located in the Right Side Top
            leftPage.topLeftTableRows.get(1).then(function(SecondRow)
            {
                leftPage.getColumnsOfRow(SecondRow).then(function(cols)
                {
                    expect(topRightPage.topRightName.getAttribute('value')).toEqual(cols[1].getText());
                    expect(topRightPage.topRightBalance.getAttribute('value')).toEqual(cols[2].getText());
                    expect(topRightPage.topRightCreditLimit.getAttribute('value')).toEqual(cols[3].getText());
                });

                //Click Previous button
                topRightPage.PreviousButton.click();
                   //Get Previous Row Values From Left Table and Compare with Form values which is located in the Right Side Top
                leftPage.topLeftTableRows.first().then(function(firstRow)
                    {
                        leftPage.getColumnsOfRow(firstRow).then(function(cols)
                        {
                            expect(topRightPage.topRightBalance.getAttribute('value')).toEqual(cols[2].getText());
                            expect(topRightPage.topRightName.getAttribute('value')).toEqual(cols[1].getText());
                            expect(topRightPage.topRightCreditLimit.getAttribute('value')).toEqual(cols[3].getText());
                        });
                    });
            });
    });
});

describe('Save Prompt', function()
{
    beforeEach(function() {
        //Make sure this is an angular site
        isAngularSite(true);
    });

    it('For Unsaved changes', function()
    {
        //Select "LineItem"  from Table
        commonPage.selectDropDownByText(leftPage.tableSelctor,'demo:LineItem');

        //Modify Form Line Item Id
        topRightPage.FormLineItemIDInput.clear();
        topRightPage.FormLineItemIDInput.sendKeys('500');

        //Verify Message
        var UnsavedChangesTitle=topRightPage.UnsavedChangesTitle.getText();
        expect(UnsavedChangesTitle).toEqual('Unsaved changes');

        //Click Second Record From the Table
        leftPage.topLeftTableRows.get(1).then(function(secondRow){
            secondRow.click();
        });

        expect(commonPage.promptUnSavedNotification.isDisplayed()).toBeTruthy();
        expect(commonPage.promptUnSavedNotification.getText()).toContain('There are unsaved changes');
        commonPage.buttonUndoChanges.click();

        //Verify Message again
        UnsavedChangesTitle=topRightPage.UnsavedChangesTitle.getText();
        expect(UnsavedChangesTitle).toEqual('');
    });

    it('Go to customer table to keep the system in default state', function(){
        commonPage.selectDropDownByText(leftPage.tableSelctor, 'demo:customer');
    });
});
