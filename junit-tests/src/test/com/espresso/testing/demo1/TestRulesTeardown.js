(function(global) {
    "use strict";

    var etfAdmin = espressoTestFramework(config.espressoServerAdminUrl, config.espressoServerAdminApiKey);
    var sql = etfAdmin.readResource("TestRulesDatabaseTeardown.sql");

    var enableTeardown = false;
    if (enableTeardown) {
        etfAdmin.executeSql(config.setupDatabaseUrl, config.setupDatabaseUser, config.setupDatabasePassword, sql);
    } else {
        print("!!!!! NOT DONE !!! did not tear down or user");
    }
})(this);
