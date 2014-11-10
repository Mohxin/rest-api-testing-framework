package com.espresso.testing;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;

import org.junit.*;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;

import com.google.common.base.Predicate;
import com.thoughtworks.selenium.Wait;

public class AutomationRulesTest {

  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://localhost:8080/";
    driver.manage().timeouts().implicitlyWait( 30, TimeUnit.SECONDS );
    driver
        .get( baseUrl
            + "LiveBrowser/#/?serverName=http:%2F%2Flocalhost:8080%2FKahunaService%2Frest%2Fel-local%2Fdemo%2Fv1%2F&forceLogin=true&table=demo:customer&pk=Alpha%20and%20Sons&closed=child&userName=demo&introSeen=true&intro=disabled" );
    driver.findElement( By.id( "loginButton" ) ).click();
  }

  @Test
  public void testWebdriver() throws Exception {
    // driver
    // .get( baseUrl
    // +
    // "LiveBrowser/#/?serverName=http:%2F%2Flocalhost:8080%2FKahunaService%2Frest%2Fel-local%2Fdemo%2Fv1%2F&forceLogin=true&table=demo:purchaseorder&pk=2&closed=child&userName=demo&introSeen=true&intro=disabled"
    // );
    try {
      // driver.findElement( By.id( "loginButton" ) ).click();
      Thread.sleep( 2000 );
      driver.findElement(By.xpath("//div[@id='eslo-header']/div[2]/div/a/i[2]")).click();
      driver.findElement(By.xpath("//div[@id='eslo-header']/div[2]/div/ul/li[2]/a/i")).click();
      driver.findElement(By.xpath("//div[@id='eslo-header']/div[2]/div")).click();
      driver.findElement(By.xpath("//div[@id='eslo-header']/div[2]/div/a/i[2]")).click();
      driver.findElement(By.xpath("//div[@id='eslo-header']/div[2]/div/ul/li[7]/a/i")).click();
      Thread.sleep( 2000 );
      driver.findElement( By.xpath( "//div[@id='rightSide']/div/div/div/button[4]" ) ).click();
      driver.findElement( By.cssSelector( "button.eslo-button.grid-insert" ) ).click();
      // isElementPresent( By.id( "attname" ) );
      // driver.findElement( By.id( "attname" ) ).clear();
      // driver.findElement( By.id( "attname" ) ).sendKeys( "Test Record" );
      // driver.findElement( By.id( "attcredit_limit" ) ).clear();
      // driver.findElement( By.id( "attcredit_limit" ) ).sendKeys( "1000" );
      driver.findElement( By.cssSelector( "i.fa.fa-reply > span" ) ).click();
      assertEquals(
          "Internal server error: Logic rule 1002 is a sum, but the specified role name PurchaseOrderList does not seem to exist in the table.",
          closeAlertAndGetItsText() );

    } catch ( Error e ) {
      verificationErrors.append( e.toString() );
    }
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if ( !"".equals( verificationErrorString ) ) {
      fail( verificationErrorString );
    }
  }

  private boolean isElementPresent( By by ) {
    try {
      driver.findElement( by );
      return true;
    } catch ( NoSuchElementException e ) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch ( NoAlertPresentException e ) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if ( acceptNextAlert ) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }

  @SuppressWarnings( "rawtypes" )
  private void waitForElement( By by ) {
    FluentWait wait =
        new FluentWait( driver ).withTimeout( 30, TimeUnit.SECONDS ).pollingEvery( 5, TimeUnit.SECONDS ).ignoring(
            NoSuchElementException.class );
    // Predicate isTrue = {driver.findElement( By.id( "attname" ) )};
    // WebElement foo = wait.until( isTrue );
  }

  public static void main( String[] args ) {
    // TODO Auto-generated method stub

  }

}
