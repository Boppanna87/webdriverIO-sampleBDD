
import CustomCommands from '../support/custom_commands';
import chai from 'chai';

const assert = chai.assert;

class SamplePage {
    // Locators
    // ========
   
    amazonHomePageTitle = '//*[@id="nav-xshop"]/a[text()="Customer Service"]';
    
    // Expected Text
    // =============

    expectedPageTitle = "Customer Service";
    

    // methods
    // =======

    verifyPageIsLoaded() {
        CustomCommands.verifyElementIsVisible(this.amazonHomePageSearchBox);
        return this;
    }

  

}

export default new SamplePage();
