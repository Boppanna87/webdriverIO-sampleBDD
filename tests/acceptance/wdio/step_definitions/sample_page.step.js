import {And, But, Given, Then, When} from 'cucumber';
import CustomCommands from '../support/custom_commands';
import SamplePage from '../page_objects/sample.page';


Given(/^I load (.*) url/, (domain) => {
    CustomCommands.loadUrl(domain);
});


Then(/^I verify the header of amazon$/, function () {
    SamplePage().verifyPageIsLoaded();
    SamplePage().verifyBeforeYouStartPageTitle();
});

