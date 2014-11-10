var defaultEnv = "dblocal";
var defaultSecondary = "localhost";

function espressoTestFramework(baseUrl, apiKey) {
	"use strict";

	return (function(myBaseUrl, myApiKey) {

		var etf = Packages.com.espresso.testing.EspressoTestFramework.create(myBaseUrl, myApiKey);

		var self = {};

		self.readResource = function(resourceName) {
			var resource = Packages.com.espresso.testing.EspressoTestFramework.readResource(resourceName);
			return resource;
		};

		self.evalTemplate = function(varName, template) {
			print("before temp: " + template);
			var result = etf.evalTemplate(varName.toString(), template.toString());
			print("templated: " + result);
			return result;
		};

		self.getBaseUrl = function() {
			return "" + etf.baseUrl;
		};

		self.doGet = function(endPoint) {
			etf.logTrace("Get " + endPoint);
			var json = etf.doGet(endPoint);
			return JSON.parse(json);
		};

		self.doPost = function(endPoint, jsonPayload) {
			etf.logTrace("Post " + endPoint);
			var json = etf.doPost(endPoint, JSON.stringify(jsonPayload));
			try {
				return JSON.parse(json);
			} catch (e) {
				etf.logError("Error parsing " + e + "\n" + jsonPayload);
				throw e;
			}
		};

		self.insert = function(endPoint, jsonPayload) {
			var result = self.doPost(endPoint, jsonPayload);
			var stringResult = JSON.stringify(result, null, 2);
			etf.logWarn("inserted " + stringResult);
			etf.assertion(result && result.hasOwnProperty("statusCode"), "Expected statusCode property in result", stringResult);
			etf.assertion(201 == result.statusCode, "Expected 201 status code - got " + result.statusCode + " while inserting " + endPoint, stringResult);
			return result;
		};

		self.doPut = function(endPoint, jsonPayload) {
			etf.logTrace("Put " + endPoint);
			var json = etf.doPut(endPoint, JSON.stringify(jsonPayload));
			return JSON.parse(json);
		};

		self.doDelete = function(endPoint) {
			etf.logTrace("Delete " + endPoint);
			var json = etf.doDelete(endPoint);
			return JSON.parse(json);
		};

		self.assertion = function(truth, failMessage, optionalObj) {
			if (!failMessage)
				failMessage = "";
			var optionalString;
			if (optionalObj) {
				if ("object" === typeof optionalObj) {
					optionalString = JSON.stringify(optionalObj, null, 2);
				} else {
					optionalString = optionalObj.toString();
				}
			} else {
				optionalString = null;
			}

			etf.assertion(!!truth, failMessage, optionalString);
		};

		self.logFatal = function(msg) {
			etf.logFatal(msg);
		};

		self.logError = function(msg) {
			etf.logError(msg);
		};

		self.logWarn = function(msg) {
			etf.logWarn(msg);
		};

		self.logInfo = function(msg) {
			etf.logInfo(msg);
		};

		self.logDebug = function(msg) {
			etf.logDebug(msg);
		};

		self.logTrace = function(msg) {
			etf.logTrace(msg);
		};

		/*
		 * Finds by name any and all that were inserted
		 */
		self.findInserted = function(txsummary, resourceName) {
			var result = new Array();
			var idx = undefined;
			for (idx in txsummary) {
				var item = txsummary[idx];
				var metadata = item["@metadata"];
				if (resourceName === metadata.resource && "INSERT" === metadata.verb) {
					result.push(item);
				}
			}
			return result;
		};

		/*
		 * Finds by name any and all that were updated
		 */
		self.findUpdated = function(txsummary, resourceName) {
			var result = new Array();
			var idx = undefined;
			for (idx in txsummary) {
				var item = txsummary[idx];
				var metadata = item["@metadata"];
				if (resourceName === metadata.resource && "UPDATE" === metadata.verb) {
					result.push(item);
				}
			}
			return result;
		};

		self.executeQuery = function(url, username, password, sql) {
			// TODO - this is not complete - the java currently returns strings,
			// this will need to be
			// enhanced.
			var objs = etf.executeQuery(url, username, password, sql, false);
			var result = {
				names : [],
				types : [],
				data : []
			};

			// TODO - this is NOT right - need to morph to better javascript
			// types
			// NOT just strings.
			var val = undefined;
			for ( var i in objs[0]) {
				val = "" + objs[0][i];
				result.names[i] = val;
			}
			for ( var i in objs[1]) {
				val = "" + objs[1][i];
				result.types[i] = val;
			}
			for ( var i = 2; i < objs.length; ++i) {
				result.data[i - 2] = [];
				for ( var j in objs[i]) {
					var val = "" + objs[i][j];
					result.data[i - 2][j] = val;
				}
			}
			return result;
		};

		self.executeSql = function(url, username, password, sql) {
			try {
				etf.executeSql(url, username, password, sql, false);
			} catch (e) {
				print("error: " + e);
				print("url: " + url);
				print("username: " + username);
				print("password: " + password);
				print("sql: " + password);
				self.logError(e);
				throw e;
			}
		};

		self.executeSqlIgnoreErrors = function(url, username, password, sql) {
			print("dmh url: " + url);
			print("dmh username: " + username);
			print("dmh password: " + password);
			print("dmh sql: " + sql);
			etf.executeSql(url, username, password, sql, true);
		};
		return self;
	})(baseUrl, apiKey);
}

// read the environment and java system properties
// ensure that env.KahunaEnvironment and env.KahunaEnvironmentSecondary is set
// with a value
// first from system environment
// failing that from java system properties
// failing that a default value of dblocal and localhost
(function(global) {
	"use strict";
	function convertJavaMap(map) {
		var result = {};
		var keySet = map.keySet();
		var keySetIter = keySet.iterator();
		while (keySetIter.hasNext()) {
			var s = "" + keySetIter.next();
			var v = "" + map.get(s);
			result[s] = v;
		}
		return result;
	}

	var newenv = convertJavaMap(java.lang.System.getenv());
	var newSystemProperties = convertJavaMap(java.lang.System.getProperties());

	if ('undefined' === typeof newenv.KahunaEnvironment) {
		if ('undefined' === typeof newSystemProperties.KahunaEnvironment) {
			newenv.KahunaEnvironment = defaultEnv;
			print('Using default KahunaEnvironment of ' + newenv.KahunaEnvironment);
		} else {
			print("Using java system properties for environment " + newSystemProperties.KahunaEnvironment);
			newenv.KahunaEnvironment = newSystemProperties.KahunaEnvironment;
		}
	}

	if ('undefined' === typeof newenv.KahunaEnvironmentSecondary) {
		if ('undefined' === typeof newSystemProperties.KahunaEnvironmentSecondary) {
			newenv.KahunaEnvironmentSecondary = defaultSecondary;
			print('Using default KahunaEnvironmentSecondary of ' + newenv.KahunaEnvironmentSecondary);
		} else {
			print("Using java system properties for environment secondary" + newSystemProperties.KahunaEnvironmentSecondary);
			newenv.KahunaEnvironmentSecondary = newSystemProperties.KahunaEnvironmentSecondary;
		}
	}

	global.env = newenv;
	global.systemProperties = newSystemProperties;
})(this);

function loadConfig(global, base) {
	"use strict";
	// typically loadConfig(this, "config")
	// and loadConfig(this, "/config");
	var primary = env.KahunaEnvironment;
	var secondary = env.KahunaEnvironmentSecondary;

	print("Environment: " + primary + " / " + secondary);

	var readResource = function(resourceName) {
		var str = Packages.com.espresso.testing.EspressoTestFramework.readResource(resourceName);
		if (undefined == typeof str || !str) {
			print("Not found: " + resourceName);
			str = null;
		}
		return str;
	};

	if ("undefined" === typeof global.config || !global.config) {
		print("Creating config");
		global.config = {};
	}

	var tmp = null;
	var filename = base + "/" + primary + ".json";
	var primaryConfig = readResource(filename);
	if (primaryConfig) {
		print("Parsing: " + filename);
		primaryConfig = JSON.parse(JSON.minify(primaryConfig));
		for (tmp in primaryConfig) {
			global.config[tmp] = primaryConfig[tmp];
		}
	}

	filename = base + "/" + primary + "-" + secondary + ".json";
	var secondaryConfig = readResource(filename);
	if (secondaryConfig) {
		print("Parsing: " + filename);
		secondaryConfig = JSON.parse(JSON.minify(secondaryConfig));

		for (tmp in secondaryConfig) {
			global.config[tmp] = secondaryConfig[tmp];
		}
	}
}

// load the standard common config into the global object
loadConfig(this, "/config");
