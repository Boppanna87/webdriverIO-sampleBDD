import {And, But, Given, Then, When} from 'cucumber';
import BeforeYouStartPage from '../page_objects/before_we_start.page';

import CustomCommands from '../support/custom_commands';



Given(/^I verify title on the BeforeYouStart page$/, function () {
    BeforeYouStartPage.verifyPageIsLoaded();
});



Given(/^I add (.*) different products to my wish list$/, function (itemCount) {
    BeforeYouStartPage.verifyPageIsLoaded();
    BeforeYouStartPage.selectDifferntproducts();
    
});








