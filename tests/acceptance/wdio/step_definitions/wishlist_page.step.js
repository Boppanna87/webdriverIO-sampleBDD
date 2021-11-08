import {And, But, Given, Then, When} from 'cucumber';

import WishList from '../page_objects/wishlist.page';
import BeforeYouStartPage from '../page_objects/before_we_start.page';

import CustomCommands from '../support/custom_commands';



// Given(/^I verify title on the BeforeYouStart page$/, function () {
//     BeforeYouStartPage.verifyPageIsLoaded();
// });
//
//
// Given(/^I add (.*) different products to my wish list$/, function (itemCount) {
//     BeforeYouStartPage.verifyPageIsLoaded();
//     BeforeYouStartPage.selectDifferntproducts();
//     //BeforeYouStartPage.selectDifferentproductsFromHomePage();
// });
//
When(/^I view my wishlist table$/, function () {
    WishList.viewWishList();

});


Then(/^I find total (.*) selected items in my Wishlist$/, function (count) {
    WishList.verifyItemCount(count);
});


When(/^I search for lowest price product$/, function () {
    WishList.searchLowestPriceItemToCart()
});


Then(/^I am able to add the lowest price item to my cart$/, function () {
    WishList.addLowestPriceItemToCart()
});


Then(/^I am able to verify the item in my cart$/, function () {
    WishList.verifyItemInCart()
});
