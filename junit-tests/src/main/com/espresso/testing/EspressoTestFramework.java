package com.espresso.testing;

import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.Reader;
import java.io.StringReader;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Assert;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mvel2.templates.TemplateRuntime;

public class EspressoTestFramework {

	static Logger logger = Logger.getLogger(EspressoTestFramework.class);

	private final String baseUrl;
	private final String apiKey;
	private final String apiSig;
	private final String auth;

	/**
	 * 
	 * @param rootobj
	 *            - used as rootobj.getResource
	 * @param baseUrl
	 * @param apiKey
	 */
	private EspressoTestFramework(String baseUrl, String apiKey) {
		this.baseUrl = baseUrl;
		this.apiKey = apiKey;
		this.apiSig = "123";
		this.auth = "Espresso " + this.apiKey + ":" + this.apiSig;
	}

	public String toString() {
		return "URL=" + baseUrl + " apiKey=" + apiKey;
	}

	public static EspressoTestFramework create(String baseUrl, String apiKey) {
		if (!baseUrl.endsWith("/")) {
			baseUrl += "/";
			logger.debug("baseurl = " + baseUrl);
		}
		EspressoTestFramework etf = new EspressoTestFramework(baseUrl, apiKey);
		return etf;
	}

	public void logFatal(String msg) {
		logger.fatal(msg);
	}

	public void logError(String msg) {
		logger.error(msg);
	}

	public void logWarn(String msg) {
		logger.debug(msg);
	}

	public void logInfo(String msg) {
		logger.info(msg);
	}

	public void logDebug(String msg) {
		logger.debug(msg);
	}

	public void logTrace(String msg) {
		logger.trace(msg);
	}

	/**
	 * Uses MVEL2 templating, with a map derived from the enumerable properties of the specified varName object
	 * 
	 * @param varName
	 *            the javascript name to use for obtaining values - typically 'config'
	 * @param template
	 *            the string to be templated, containing template values such as @{config.foo}
	 * @return the result after templating
	 */
	public String evalTemplate(String varName, String template) {

		// this is kind of odd, but not sure how else to do this
		Scriptable scope = EspressoTestBase.scope;

		NativeObject config = (NativeObject)scope.get(varName, scope);
		Object[] ids = config.getIds();
		HashMap<String, HashMap<String, String>> templateMap = new HashMap<String, HashMap<String, String>>();
		HashMap<String, String> configMap = new HashMap<String, String>();
		templateMap.put("config", configMap);
		for (Object o : ids) {
			String propName = (String)o;
			Object val = ScriptableObject.getProperty(config, propName);
			if (null != val) {
				String javaString = val.toString();
				configMap.put(propName, javaString);
			}
		}

		Object result = TemplateRuntime.eval(template, templateMap);
		return (String)result;
	}

	public String getBaseUrl() {
		return this.baseUrl;
	}

	public String doGet(String endPoint) throws Exception {
		DefaultHttpClient client = new DefaultHttpClient();
		String url = this.baseUrl + endPoint;
		logger.trace("GET: " + url);
		HttpGet get = new HttpGet(url);
		get.setHeader("Authorization", this.auth);
		HttpResponse resp = client.execute(get);
		HttpEntity entity = resp.getEntity();
		logger.trace("Status: " + resp.getStatusLine());
		String jsonString = EntityUtils.toString(entity);
		return jsonString;
	}

	public String doPost(String endPoint, String payload) throws Exception {
		DefaultHttpClient client = new DefaultHttpClient();
		String url = this.baseUrl + endPoint;
		logger.trace("POST: " + url);
		HttpPost post = new HttpPost(url);
		post.setHeader("Authorization", this.auth);
		post.setEntity(new StringEntity(payload));
		post.setHeader("Content-Type", "application/json");
		HttpResponse resp = client.execute(post);
		logger.trace("Status: " + resp.getStatusLine());
		HttpEntity entity = resp.getEntity();
		String jsonString = EntityUtils.toString(entity);
		return jsonString;
	}

	public String doPut(String endPoint, String payload) throws Exception {
		DefaultHttpClient client = new DefaultHttpClient();
		String url = this.baseUrl + endPoint;
		logger.trace("PUT: " + url);
		HttpPut put = new HttpPut(url);
		put.setHeader("Authorization", this.auth);
		put.setEntity(new StringEntity(payload));
		put.setHeader("Content-Type", "application/json");
		HttpResponse resp = client.execute(put);
		logger.trace("Status: " + resp.getStatusLine());
		HttpEntity entity = resp.getEntity();
		String jsonString = EntityUtils.toString(entity);
		return jsonString;
	}

	public String doDelete(String endPoint) throws Exception {
		DefaultHttpClient client = new DefaultHttpClient();
		String url = this.baseUrl + endPoint;
		logger.trace("DELETE: " + url);
		HttpDelete del = new HttpDelete(url);
		del.setHeader("Authorization", this.auth);
		HttpResponse resp = client.execute(del);
		logger.trace("Status: " + resp.getStatusLine());
		HttpEntity entity = resp.getEntity();
		String jsonString = EntityUtils.toString(entity);
		return jsonString;
	}

	public void throwException(String message) {
		throw new RuntimeException(message);
	}

	public void assertion(boolean truth, CharSequence errorMessage) {
		assertion(truth, errorMessage, null);
	}

	public void assertion(boolean truth, CharSequence errorMessage, CharSequence optionalDetail) {
		String msg = errorMessage.toString();
		if (null != optionalDetail && 0 != optionalDetail.length()) {
			msg += "\n" + optionalDetail.toString();
		}
		Assert.assertTrue(msg, truth);
	}

	private class SqlStatementHolder {

		public int firstLinenumber;
		public String sqlStatement;
	}

	/**
	 * NOTE: This is a naive implementation for now.
	 * 
	 * Split given SQL into separate statements.
	 * This is actually a hard problem. Various comment types, various string quotations etc.
	 * 
	 * Oracle: For example Oracle allows a single line
	 * '/' - on a single line (unless just after another '/' in which case it is a re-execute'
	 * ';' - at end of statement (unless inside stored proc, trigger)
	 * 
	 * MySQL:
	 * ';' and end of statement;
	 * 
	 * SqlServer:
	 * GO (in various cases) on a single line
	 * 
	 * @param sql
	 * @param delim
	 * @return
	 */
	private List<SqlStatementHolder> splitSql(String sql, String delimiter, boolean isFullLineDelimiter) {
		List<SqlStatementHolder> result = new ArrayList<SqlStatementHolder>();

		StringBuffer command = null;
		LineNumberReader lineReader = new LineNumberReader(new StringReader(sql));
		String line = null;
		SqlStatementHolder holder = null;
		try {
			while ((line = lineReader.readLine()) != null) {
				if (command == null) {
					command = new StringBuffer();
					holder = new SqlStatementHolder();
					holder.firstLinenumber = lineReader.getLineNumber();
				}
				String trimmedLine = line.trim();

				int commentIdx = trimmedLine.indexOf("--"); // If the SQL ends with a comment, strip it out
				if (commentIdx >= 0) {
					trimmedLine = trimmedLine.substring(0, commentIdx);
				}
				else if (trimmedLine.length() < 1
					|| trimmedLine.startsWith("//")) {
					// Do nothing
				}
				else if (!isFullLineDelimiter && trimmedLine.endsWith(delimiter)
					|| isFullLineDelimiter && trimmedLine.equals(delimiter)) {
					command.append(trimmedLine.substring(0, trimmedLine.lastIndexOf(delimiter)));
					holder.sqlStatement = command.toString();
					result.add(holder);
					command = null;
					holder = null;
				}
				else {
					command.append(trimmedLine);
					command.append('\n');
				}
			}
		}
		catch (IOException e) {
			return null;
		}

		return result;
	}

	/**
	 * 
	 * @param url
	 * @param username
	 * @param password
	 * @param sql
	 *            a single sql select statement
	 * @param ignoreErrors
	 */
	public String[][] executeQuery(String url, String username, String password, String sql, boolean ignoreErrors) {
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = DriverManager.getConnection(url, username, password);
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			ArrayList<String[]> result = new ArrayList<String[]>();
			ResultSetMetaData rsmeta = rs.getMetaData();
			int numCols = rsmeta.getColumnCount();
			String[] columnNames = new String[numCols];
			String[] columnTypes = new String[numCols];
			for (int i = 0; i < numCols; ++i) {
				columnNames[i] = rsmeta.getColumnName(1 + i);
				columnTypes[i] = rsmeta.getColumnTypeName(1 + i);
			}

			result.add(columnNames);

			result.add(columnTypes);
			while (rs.next()) {
				String[] vals = new String[numCols];
				for (int i = 0; i < numCols; ++i) {
					vals[i] = rs.getString(1 + i);
				}
				result.add(vals);
			}

			String[][] newResult = result.toArray(new String[0][0]);
			return newResult;
		}
		catch (SQLException e) {
			logger.error("Database " + url, e);
			throwException(e.getMessage());
			return null;
		}
		finally {
			if (null != stmt) {
				try {
					stmt.close();
				}
				catch (Exception ex) {
				}
				stmt = null;
			}
			if (null != conn) {
				try {
					conn.close();
				}
				catch (Exception ex) {
				}
				conn = null;
			}
		}
	}

	public void executeSql(String url, String username, String password, String sql, boolean ignoreErrors) {
		Connection conn = null;
		Statement stmt = null;

		try {
			List<SqlStatementHolder> sqlStatements = this.splitSql(sql, ";", false);
			conn = DriverManager.getConnection(url, username, password);
			stmt = conn.createStatement();
			for (SqlStatementHolder holder : sqlStatements) {
				try {
					logger.trace("SQL: " + holder.sqlStatement);
					stmt.execute(holder.sqlStatement);
				}
				catch (SQLException ex) {
					String msg = "Error near line " + holder.firstLinenumber + "\n" + holder.sqlStatement + "\n" + ex.getMessage();
					if (ignoreErrors) {
						logger.error("SQL IGNORE: " + msg);
					}
					else {
						logger.error("SQL: " + msg);
						throwException(msg);
					}
				}
			}
		}
		catch (SQLException e) {
			logger.error("Database " + url, e);
			throwException(e.getMessage());
		}
		finally {
			if (null != stmt) {
				try {
					stmt.close();
				}
				catch (Exception e) {
				}
			}
			stmt = null;
			if (null != conn) {
				try {
					conn.close();
				}
				catch (Exception e) {
				}
			}
			conn = null;
		}
	}

	public static String readFile(String path) {
		logger.debug("READ: " + path);
		Reader rdr = null;
		try {
			rdr = new FileReader(path);

			StringBuilder sb = new StringBuilder();
			int c;
			while (-1 != (c = rdr.read())) {
				sb.append((char)c);
			}
			rdr.close();
			return sb.toString();
		}
		catch (IOException e) {
			if (null != rdr) {
				try {
					rdr.close();
				}
				catch (Exception e2) {
				}
			}
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static String readStream(String tag, InputStream stream) {
		logger.debug("READSTREAM: " + tag);
		Reader rdr = null;
		try {
			rdr = new InputStreamReader(stream);

			StringBuilder sb = new StringBuilder();
			int c;
			while (-1 != (c = rdr.read())) {
				sb.append((char)c);
			}
			rdr.close();
			return sb.toString();
		}
		catch (IOException e) {
			if (null != rdr) {
				try {
					rdr.close();
				}
				catch (Exception e2) {
				}
			}
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static String readResource(String javascriptResourceName) {
		try {
			String filename = javascriptResourceName;
			InputStream is = null;
			URL url = null;
			if (null != EspressoTestBase.rootClass) {
				url = EspressoTestBase.rootClass.getResource(javascriptResourceName);
				is = EspressoTestBase.rootClass.getResourceAsStream(javascriptResourceName);
			}
			else {
				url = ClassLoader.getSystemClassLoader().getResource(javascriptResourceName);
				is = ClassLoader.getSystemClassLoader().getResourceAsStream(javascriptResourceName);
			}

			if (null != url) {
				filename = url.getPath();
			}

			if (null != is) {
				String js = EspressoTestFramework.readStream(filename, is);
				return js;
			}
			return null;
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
