import chai from 'chai';
const assert = chai.assert;
import localConfig from '../conf/local.conf';
import jenkinsConfig from '../conf/jenkins.conf';

class CustomCommands {

  verifyIfChannelIsValid(channel) {
    const validChannels = ['ib', 'mca'];
    if (!validChannels.includes(channel.toLowerCase())) {
      throw new Error("Value for Channel in the feature file should be one of: IB, MCA");
    }
  }

  verifyIfBrandIsValid(brand) {
    const validBrands = ['lloyds', 'bos', 'halifax'];
    if (!validBrands.includes(brand.toLowerCase())) {
      throw new Error("Value for Brand in the feature file should be one of: lloyds, bos, halifax");
    }
  }

  getBaseUrl(channel, brand) {
    this.verifyIfChannelIsValid(channel);
    this.verifyIfBrandIsValid(brand);
    let identifier = brand.toLowerCase() + channel.toLowerCase();
    if (process.env.PLATFORM === 'local') {
      return localConfig.config.serverUrls[identifier]
    } else {
      return jenkinsConfig.config.serverUrls[identifier];
    }
  }

  loadUrlWithEndpoint(channel, brand, endpoint) {
    const urlToLoad = this.getBaseUrl(channel, brand) + "/" + endpoint;
    browser.url(urlToLoad);
    console.log("URL launched:" + urlToLoad);
    return this;
  }



  getBaseUrlFromConfig(domain) {
 
    let identifier = domain.toLowerCase();
    if (process.env.PLATFORM === 'local') {
      return localConfig.config.serverUrls[identifier]
    } else {
      return jenkinsConfig.config.serverUrls[identifier];
    }
  }

  
  loadUrl(domain) {
    const urlToLoad = this.getBaseUrlFromConfig(domain)
    browser.url(urlToLoad);
    console.log("URL launched:" + urlToLoad);
    return this;
  }


  navigateBack() {
    browser.back();
    console.log("Navigated Back");
    return this;
  }


  waitForElementToBeVisible(locator) {
    const webElement = $(locator);
    expect(webElement).toBeDisplayed();
    return this;
  }

  waitForElementToBeClickable(locator) {
    const webElement = $(locator);
    expect(webElement).toBeClickable();
    return this;
  }


  clearAndEnterText(locator, text) {
    this.waitForElementToBeVisible(locator);
    this.waitForElementToBeClickable(locator);
    const webElement = $(locator);
    webElement.clearValue();
    webElement.setValue(text);
    return this;
  }

  waitForElementToHaveText(locator, text) {
    const webElement = $(locator);
    expect(webElement).toHaveTextContaining(text);
  }

  getTextForElement(locator) {
    const webElement = $(locator);
    expect(webElement).toBeVisible();
    return webElement.getText();
  }

  getNumberOfElementsWithLocator(locator) {
    return $$(locator).length;
  }

  getAllElementsWithLocator(locator) {
    return $$(locator);
  }

  verifyElementIsVisible(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.isTrue(webElement.isDisplayed(), "Element with locator '" + locator + "' is expected to be displayed. But it is not displayed");
    return this;
  }

  isExisting(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    if (webElement.isDisplayed()) {
      return assert(true === true, 'Expected element exists');
    } else {
      return assert(true === false, 'Expected element exists');
    }
  }

  verifyElementIsEnabled(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.isTrue(webElement.isEnabled(), "Element with locator '" + locator + "' is expected to be enabled. But it is disabled");
    return this;
  }

  verifyElementIsNotExisting(locator) {
    const webElement = $(locator);
    assert.isNotTrue(webElement.isDisplayed(), "Element with locator '" + locator + "' is expected not to be displayed. But it is displayed");
    return this;
  }

  verifyElementIsDisabled(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.isNotTrue(webElement.isEnabled(), "Element with locator '" + locator + "' is expected to be disabled. But it is enabled");
    return this;
  }

  verifyElementIsSelected(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.isTrue(webElement.isSelected(), "Element with locator '" + locator + "' is expected to be selected. But it is not selected");
    return this;
  }

  verifyElementIsNotSelected(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.isNotTrue(webElement.isSelected(), "Element with locator " + locator + "is expected NOT to be selected. But it is selected");
    return this;
  }

  selectByVisibleText(locator, text) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    this.waitForElementToBeClickable(locator);
    webElement.selectByVisibleText(text);
    return this;
  }

  selectByValue(locator, value) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    this.waitForElementToBeClickable(locator);
    webElement.selectByAttribute('value', value);
    return this;
  }

  clickElement(locator) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    this.waitForElementToBeClickable(locator);
    webElement.click();
    return this;
  }

  assertTextForElement(locator, expectedText) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.equal(webElement.getText().toLowerCase().trim(), expectedText.toLowerCase().trim(),
      "Expected Text: " + expectedText.toLowerCase() +
      "\n Actual Text: " + webElement.getText().toLowerCase() +
      "\n Element Locator: " + locator + "\n");
    return this;
  }

  assertUrlForLinkElement(locator, expectedText) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.equal(webElement.getAttribute('href'), expectedText,
      "Expected link URL: " + expectedText.toLowerCase() +
      "\n Actual link URL: " + webElement.getText().toLowerCase() +
      "\n Element Locator: " + locator + "\n");
    return this;
  }


  getAttributeForLocator(locator, attribute) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    return webElement.getAttribute(attribute);
  }

  assertPartialTextForElement(locator, expectedPartialText) {
    const webElement = $(locator);
    this.waitForElementToBeVisible(locator);
    assert.include(webElement.getText().toLowerCase(),expectedPartialText.toLowerCase() ,
      "Expected Partial Text: " + expectedPartialText.toLowerCase() +
      "\n Actual Text: " + webElement.getText().toLowerCase() +
      "\n Element Locator: " + locator + "\n");
    return this;
  }

  assertNumbersAreEqual(expectedNumber, actualNumber) {
    assert.equal(expectedNumber, actualNumber,
      "Expected Number: " + expectedNumber +
      "\n Actual Number: " + actualNumber + "\n");
    return this;
  }

  assertValueIsTrue(value) {
    assert.isTrue(value, "Expected value is true, but returned false");
    return this;
  }


  assertUrlLinkContains(expectedText) {
    this.waitForPageToLoadFully();
    let url = browser.getUrl();
    console.log('Navigated URL : ' + url + "shd contain  " + expectedText);

    if (url.includes(expectedText)) {
      return assert(true === true, 'Expected element exists');
    }
    else {
      return assert(true === false, 'Expected element does not exists');
    }
  }



  saveScreenshot()
  {
    const d = new Date();
    const time= d.getMilliseconds();
    const filename= "Chrome_" + d.getMilliseconds() +d.getSeconds();
    const cucumberJson = require('wdio-cucumberjs-json-reporter').default
    cucumberJson.attach(browser.saveScreenshot('./tests/acceptance/wdio/screenshots/'+filename+'.png'), 'image/png');
  }

  waitForPageToLoadFully() {
    browser.waitUntil(() => {
        const state = browser.execute(() => {
          return document.readyState;
        });
        return state === 'complete';
      },
      {
        timeout: 60000,
        timeoutMsg: 'Page is not fully loaded'
      });
  }
}
export default new CustomCommands();
