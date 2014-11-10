package com.espresso.testing.demo1;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.espresso.testing.EspressoTestBase;

/**
 * This project loads an exported EspressoDemo
 * 
 * @author dhewitt
 * 
 */
public class TestRules extends EspressoTestBase {
	@BeforeClass
	public static void beforeClass() throws Exception {
		EspressoTestBase.beforeClass(TestRules.class);

		// beforeClass above imports the common framework config, this augments with a test specific config 
		EspressoTestBase.evalString("loadConfig(this, 'config');");

		EspressoTestBase.evalResource("TestRulesSetup.js");
	}

	@AfterClass
	public static void afterClass() throws Exception {
		EspressoTestBase.evalResource("TestRulesTeardown.js");

		// note, this is normally the LAST statement of this method.
		EspressoTestBase.afterClass();
	}

	@Test
	public void TestRulesTest1() {
		eval("TestRulesTest1.js");
	}

	@Test
	public void TestRulesTest2() {
		eval("TestRulesTest2.js");
	}
}
