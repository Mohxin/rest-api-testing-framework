var HtmlReporter = require('protractor-html-screenshot-reporter');
var fs = require('fs');

//Set this to true to run the test locally
var localMode = false;

var reportDir = "/tmp/TestReport";
var jobName = "Local latte test";
var buildName = "N/A";
if ( ! localMode) {
	reportDir = 'Report';
	jobName = 'LB - Latte test';
	buildName = '' + process.env.BUILD_NUMBER;
}

var testCollab = require('./TestCollab/testCollab.js');

var rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
};

exports.config = {
    // ----- How to setup Selenium -----
    //
    // There are three ways to specify how to use Selenium. Specify one of the
    // following:
    //
    // 1. seleniumServerJar - to start Selenium Standalone locally.
    // 2. seleniumAddress - to connect to a Selenium server which is already
    //    running.
    // 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
    //
    // If the chromeOnly option is specified, no Selenium server will be started,
    // and chromeDriver will be used directly (from the location specified in
    // chromeDriver)

    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to protractor/selenium/selenium-server...
    // seleniumServerJar: null, //'./selenium/selenium-server-standalone-2.37.0.jar',
    
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
//    seleniumPort: 3010,
//    seleniumPort: 4444,
    
    // Chromedriver location is used to help the selenium standalone server
    // find chromedriver. This will be passed to the selenium jar as
    // the system property webdriver.chrome.driver. If null, selenium will
    // attempt to find chromedriver using PATH.
    //chromeDriver: './selenium/chromedriver',
    
    // If true, only chromedriver will be started, not a standalone selenium.
    // Tests for browsers other than chrome will not run.
    chromeOnly: true,
    
    // Additional command line options to pass to selenium. For example,
    // if you need to change the browser timeout, use
    // seleniumArgs: ['-browserTimeout=60'],
    // seleniumArgs: [],

    // The address of a running selenium server. If specified, Protractor will
    // connect to an already running instance of selenium. This usually looks like
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    
    // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
    // The tests will be run remotely using SauceLabs.
  ,

    sauceUser: process.env.SAUCEUSER,
    sauceKey: process.env.SAUCEKEY,
    sauceRecordVideo: true,

    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 90000,
    
    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        'e2e/login-spec.js',
        //'e2e/sort-spec.js',
        //'e2e/general-spec.js',
        //'e2e/search-spec.js',
        //'e2e/search-attribute-spec.js',
        //'e2e/select-table-spec.js',
        //'e2e/menu-spec.js',
        //'e2e/upload-file-spec.js',
        //'e2e/insert-update-delete-spec.js'
        //'e2e/author-spec.js'
    ],

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    capabilities: {
        //browserName: 'chrome',
        //browserName: 'firefox',
        //  'browserName': 'phantomjs'
        //'browserName': 'iehta',
	browserName: process.env.BROWSERNAME,
        name: jobName,
        build: buildName
    },
    params: {
        login: {
            userName: 'demo',
            password: 'Password1',
            admin: {
                userName: 'admin',
                password: 'Password1'
            }
         },
         customer: {
             first : {
                 name: "Alpha and Sons",
                 creditLimit: "$9,000.00"
             },
             second : {
                 name: "Lima Citrus Supply",
                 balance: "$65.00"
             },
             selected : {
                 name: "Bravo Hardware"
             },
             search : {
                 name: "Jill Exports Ltd."
             }
         },
         lineItem: 'Bench grinder',
         //server: 'https://demotest.espressologic.com/rest/el-test/demo/v1/'
	server: process.env.REST_URL
    },
    
    // A base URL for your application under dev. Calls to protractor.get()
    // with relative paths will be prepended with this.
    //baseUrl: 'https://demotest.espressologic.com',
    baseUrl: process.env.BASE_URL,

    onPrepare: function() {

        rmDir('Report');

        // The following line makes the chrome fail on sauce labs. so commenting this
        //browser.driver.manage().window().maximize();

        global.SleepTime = 2000;

        global.TestCollabAPIKey = '8422d258a50bb48ffb231abb42c6ee8d99fcf849';
        global.TestCollabURL = 'https://33187437.app.testcollab.com/index.php/project/4/';

        // In step 4, the system has to wait for few seconds to complete database setup
        global.dbSetupTime = 20000;

        global.isAngularSite = function(flag) {
            browser.ignoreSynchronization = !flag;
        };

        // Get browser name and keep it as a global access
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.caps_.browserName;
        });

        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: reportDir
        }));

        //testCollab.addExecution();

    },
    
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        isVerbose: true, // List all tests in the console
        includeStackTrace: true,
        defaultTimeoutInterval: 90000
    }
};


// Override things for local mode
if (localMode) {
	exports.config.sauceUser = null;
	exports.config.sauceKey = null;
	exports.config.capabilities.browserName = 'chrome';
	exports.config.params.server = 'http://localhost:8080/KahunaService/rest/el-local/demo/v1/';
	exports.config.baseUrl = 'http://localhost:8080/KahunaService';
}
