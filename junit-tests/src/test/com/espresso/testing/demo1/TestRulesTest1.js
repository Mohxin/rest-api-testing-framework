(function() {
    "use strict";
    print(config.espressoServerUrl);
    var etf = espressoTestFramework(config.espressoServerUrl, config.espressoServerApiKey);

    newOrder = {
        "Notes" : "Inserted by test",
        "CustomerName" : "Alpha and Sons",
        "LineItems" : [ {
            "ProductNumber" : 1,
            "Quantity" : 50
        } ]
    };

    var result = etf.doPost("Customers.Orders", newOrder);
    etf.assertion(result && result.hasOwnProperty("statusCode"), "Expected statusCode property in result - "
            + JSON.stringify(result, null, 2));
    etf.assertion(201 === result.statusCode, "Expected 201 status code - got " + result.statusCode, result);

    var inserted = etf.findInserted(result.txsummary, "Customers.Orders");
    etf.assertion(1 === inserted.length, "Expected 1 and only 1 new order - got " + inserted.length, inserted);

    var insertedAudit = etf.findInserted(result.txsummary, "main:purchaseorder_audit");
    etf.assertion(1 === insertedAudit.length, "Expected 1 and only 1 purchaseorder_audit - got " + insertedAudit.length, insertedAudit);

    print(JSON.stringify(result.txsummary, null, 2));
})();