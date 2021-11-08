import CustomCommands from '../support/custom_commands';
var userData = require('../support/globalTestData');
import chai from 'chai';

const assert = chai.assert;

class BeforeYouStartPage {
    // Locators
    // ========
    
    homePageTitleImage = '//img[@alt="TESTSCRIPTDEMO"]';
    homePageTitleImage = '//a[@title="Products"]';
    
    productsSection = '//li[@id="menu-item-251"]';
    
    singleProducts = '//li[@id="menu-item-251"]/ul/li[@id="menu-item-315"]/a[@title="Single Product"]';
    groupedProducts = '//li[@id="menu-item-251"]/ul/li[@id="menu-item-312"]/a[@title="Grouped Product"]';
    saleProducts = '//li[@id="menu-item-251"]/ul/li[@id="menu-item-313"]/a[@title="Sale Product"]';
    externalProducts = '//li[@id="menu-item-251"]/ul/li[@id="menu-item-314"]/a[@title="External Product"]';
    ProductItemName = '//div[@class="summary entry-summary"]/h1';
    addToWishlist = '//a[@data-title="Add to wishlist"]';
    


    // methods
    // =======

    verifyPageIsLoaded() {
        CustomCommands.verifyElementIsVisible(this.homePageTitleImage);
        return this;
    }


    selectDifferntproducts() {
        // CustomCommands.verifyElementIsVisible(this.productsSection);
        CustomCommands.clickElement(this.productsSection);
        
        CustomCommands.clickElement(this.singleProducts);
        var itemOne = CustomCommands.getTextForElement(this.ProductItemName);
        console.log("itemOne : "+itemOne);
        CustomCommands.clickElement(this.addToWishlist);

        CustomCommands.clickElement(this.productsSection);
        CustomCommands.clickElement(this.groupedProducts);
        var itemTwo = CustomCommands.getTextForElement(this.ProductItemName);
        console.log("itemTwo : "+itemTwo);
        CustomCommands.clickElement(this.addToWishlist);

        CustomCommands.clickElement(this.productsSection);
        CustomCommands.clickElement(this.saleProducts);
        var itemThree = CustomCommands.getTextForElement(this.ProductItemName);
        console.log("itemThree : "+itemThree);
        CustomCommands.clickElement(this.addToWishlist);

        CustomCommands.clickElement(this.productsSection);
        CustomCommands.clickElement(this.externalProducts);
        var itemFour = CustomCommands.getTextForElement(this.ProductItemName);
        console.log("itemFour : "+itemFour);
        CustomCommands.clickElement(this.addToWishlist);


        return this;
    }

    

}

export default new BeforeYouStartPage();
