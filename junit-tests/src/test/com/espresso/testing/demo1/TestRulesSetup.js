(function() {
    "use strict";

    var etfAdmin = espressoTestFramework(config.espressoServerAdminUrl, config.espressoServerAdminApiKey);
    var sql = etfAdmin.readResource("TestRulesDatabaseConfig.sql");

    print("Setting up database, user");
    etfAdmin.executeSql(config.setupDatabaseUrl, config.setupDatabaseUser, config.setupDatabasePassword, sql);

    print("Setting up schema");
    sql = etfAdmin.readResource("TestRulesSchema.sql");
    etfAdmin.executeSql(config.testrulesDatabaseUrl, config.testrulesDatabaseUser, config.testrulesDatabasePassword, sql);

    print("Inserting test data");
    sql = etfAdmin.readResource("TestRulesData.sql");
    etfAdmin.executeSql(config.testrulesDatabaseUrl, config.testrulesDatabaseUser, config.testrulesDatabasePassword, sql);

    print("Loading rules");
    var json = etfAdmin.readResource("TestRulesSave.json");
    json = JSON.parse(json);

    // tweak the dbaseschema to set the correct password
    var schema = json[0]["DbaseSchemas"][0];
    schema["url"] = config.testrulesDatabaseUrl;
    schema["user_name"] = config.testrulesDatabaseUser;
    schema["catalog_name"] = config.testrulesDatabaseUser;
    schema["name"] = "TestRules Import Demo";
    schema["password"] = config.testrulesDatabasePassword;
    delete schema["salt"];
    print(JSON.stringify(schema, null, 2));

    print("importing project");
    var result = etfAdmin.doPost("ProjectExport", json);
    etfAdmin.logDebug(result);
    etfAdmin.logDebug(JSON.stringify(result, 2));

    // ok, we need the project_ident as well as the url_fragment ....
    etfAdmin.assertion(201 == result.statusCode, "Expected 201(insertion) for status code - got " + result.statusCode, result);
    var newProjects = etfAdmin.findInserted(result.txsummary, "ProjectExport");
    etfAdmin.assertion(1 === newProjects.length);
    print(JSON.stringify(newProjects, null, 2));

    var projectIdent = newProjects[0].ident;
    var urlName = newProjects[0].url_name;

    print("project ident " + projectIdent);
    print("project urlfrag" + urlName);

    // get all ApiVersions, use the last one
    var apiVersions = etfAdmin.findInserted(result.txsummary, "ProjectExport.ApiVersions");
    etfAdmin.assertion(apiVersions.length > 0, "Expected one or more ApiVersions", apiVersions);

    var apiVersion = apiVersions[apiVersions.length - 1];
    var apiName = apiVersion.name;

    // correct the dbaseschema

    delete etfAdmin;

    // create a 'new' configuration var that can be retrieved elsewhere in the
    // suite
    var newurl = config.espressoServerBaseUrl + "/rest/" + config.accountUrl + "/" + urlName + "/" + apiName;
    config.espressoServerUrl = newurl;
})();
