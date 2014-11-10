/**
 * Created by Karuna on 08-07-2014.
 * This will be used to update the status of a test execution by protractor.
 */

var testCollab = function () {

    var rest = require('restler');

    // This method adds execution to the test collab to start the testing
    // Any time the test suite is executed, this method will be called to initialize the execution
    // This is the first step and post this action, test cases will be added to this execution
    this.addExecution = function(){
        var title = "LB Auto Execution at "+ new Date().toISOString();
        var jsonData = {data: {Execution: {title:title,priority:'1'}}};
        var url = TestCollabURL + 'executions/add.json?API_KEY=' + TestCollabAPIKey;
        rest.postJson(url, jsonData).on('complete', function(data, response) {
            // handle response
            if (response instanceof Error) {
                console.error('Error:Unable to add execution:', response.message);
            } else {
                // need to get the execution id and preserve it for all test case executions
                global.currentExecutionId = data.data.created_id;
                assignTestCases(data.data.created_id);
            }
        });
    };

    // This method assigns test cases to users as part of the created execution
    var assignTestCases = function(executionId){
        var jsonData = {data:{Execution: {assign_map: {User_3:{testCases:[106, 107, 113, 123, 119, 109, 111, 115, 258]}}}}};
        var url = TestCollabURL + 'executions/assignTest/'+executionId
            +'.json?API_KEY=' + TestCollabAPIKey;
        rest.postJson(url, jsonData).on('complete', function(data, response) {
            // handle response
            if (response instanceof Error) {
                console.error('Error:Unable to assign execution:', response.message);
            } else {
                // need to get the execution id and preserve it for all test case executions
                getExecutionCases(executionId);
            }
        });
    };

    // This method gets the list of execution cases
    var getExecutionCases = function(executionId){
        var url = TestCollabURL + 'executions/view/'+executionId
            +'.json?API_KEY=' + TestCollabAPIKey;
        rest.get(url).on('complete', function(data) {
            // handle response
            if (data instanceof Error) {
                console.error('Error:Unable to assign execution:', response.message);
            } else {
                // set the execution details at global level
                // so that they can be accessed in all test cases
                global.ExecutionData = data.data.execution;
            }
        });
    };

    // updates test execution status on testcollab.com
    // it also finds out the pass or fail status of the current spec
    this.markPassFailStatus = function(executionCaseId, timeSpent, testCaseId){
        // Get execution id
        // Get execution case id
        var passed = jasmine.getEnv().currentSpec.results().passed() ? 1 : 0;

        var jsonData = {data:{ExecutionRun: {note:'Test Ran', result: passed, time_taken: timeSpent }}};
        var url = TestCollabURL + 'executions/run/'+executionCaseId+'/1.json?API_KEY=' + TestCollabAPIKey;
        rest.postJson(url, jsonData).on('complete', function(data, response) {
            // handle response
            if (response instanceof Error) {
                console.error('Error:Unable to assign execution:', response.message);
            } else {
                var status = passed == 1 ? "passed" : "failed";
                console.log('Test case '+testCaseId+' executed and '+ status +' status was updated on testcollab.com');
            }
        });
    };
};

// Export the script as module
module.exports = new testCollab();

