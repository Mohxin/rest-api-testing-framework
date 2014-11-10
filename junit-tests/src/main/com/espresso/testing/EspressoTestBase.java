package com.espresso.testing;

import java.io.InputStream;
import java.net.URL;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.tools.shell.Global;

public class EspressoTestBase {
	public static Context cx;
	public static Scriptable scope;
	public static Class<?> rootClass;

	public static void beforeClass(Class<?> rootClass) throws Exception {
		EspressoTestBase.rootClass = rootClass;

		cx = Context.enter();

		cx.setLanguageVersion(Context.VERSION_1_8);
		cx.setGeneratingDebug(true);
		cx.setOptimizationLevel(-1);
		scope = new Global(cx);

		// this is strange, but we need this so that we can use getResource() inside the javascript world
		Object wrappedRootClass = Context.javaToJS(rootClass, scope);
		scope.put("rootClass", scope, wrappedRootClass);
		scope.put("out", scope, System.out);

		{
			// see if trim defined, if not add away, part of ECMAScript 5
			String addTrim = ""
			        + "if ('function' !== String.trim) {"
			        + "  String.prototype['trim'] = function() { return this.replace(/^\\s+|\\s+$/g, ''); };"
			        + "}";
			cx.evaluateString(scope, addTrim, "addTrim", 1, null);
		}

		Class<?> myClass = EspressoTestBase.class;
		{
			String filename = "minify.json.js";
			InputStream is = myClass.getResourceAsStream(filename);
			String js = EspressoTestFramework.readStream(filename, is);
			cx.evaluateString(scope, js, myClass.getResource(filename).getPath(), 1, null);
		}

		{
			String filename = "EspressoTestFramework.js";
			InputStream is = myClass.getResourceAsStream(filename);
			String js = EspressoTestFramework.readStream(filename, is);
			cx.evaluateString(scope, js, myClass.getResource(filename).getPath(), 1, null);
		}
	}

	public static void afterClass() throws Exception {
		Context.exit();
		cx = null;
		scope = null;
	}

	/**
	 * loads the given resource as a JavaScript file and runs it
	 * 
	 * @param noteEntryExit
	 *            print entry and exit of the script
	 * @param javascriptResourceName
	 *            resource name of the JavaScript file
	 */
	protected void eval(boolean noteEntryExit, String javascriptResourceName) {
		EspressoTestBase.evalResource(noteEntryExit, javascriptResourceName);
	}

	/**
	 * loads the given resource as a JavaScript file and runs it
	 * logging entry and exit
	 * 
	 * @param javascriptResourceName
	 *            resource name of the JavaScript file
	 */
	protected void eval(String javascriptResourceName) {
		EspressoTestBase.evalResource(true, javascriptResourceName);
	}

	protected static void evalString(String javascript) {
		EspressoTestBase.evalString(true, javascript);
	}

	protected static void evalString(boolean noteEntryExit, String javascript) {
		String idstring = javascript.length() <= 60 ? javascript : ((javascript.substring(0, 60 - 3) + "..."));
		try {
			if (noteEntryExit) {
				System.out.println("ENTER: " + idstring);
			}
			cx.evaluateString(scope, javascript, "arg", 1, null);
		} catch (Exception e) {
			System.out.println("ERROR: " + idstring);
			System.out.println("ERROR: " + e.getMessage());
			System.out.println("ERROR: " + e.getStackTrace());
			throw new RuntimeException(e);
		} finally {
			if (noteEntryExit) {
				System.out.println("EXIT: " + idstring);
			}
		}
	}

	protected static void evalResource(String javascriptResourceName) {
		EspressoTestBase.evalResource(true, javascriptResourceName);
	}

	protected static void evalResource(boolean noteEntryExit, String javascriptResourceName) {
		try {
			if (noteEntryExit) {
				System.out.println("ENTER: " + javascriptResourceName);
			}

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
				String js = EspressoTestFramework.readStream(javascriptResourceName, is);
				cx.evaluateString(scope, js, filename, 1, null);
			}
			else {
				throw new RuntimeException("Unable to read " + filename);
			}
		} catch (Exception e) {
			System.out.println("ERROR: " + javascriptResourceName);
			System.out.println("ERROR: " + e.getMessage());
			System.out.println("ERROR: " + e.getStackTrace());
			throw new RuntimeException(e);
		} finally {
			if (noteEntryExit) {
				System.out.println("EXIT: " + javascriptResourceName);
			}
		}
	}
}
