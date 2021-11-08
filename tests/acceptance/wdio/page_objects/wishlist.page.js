
import CustomCommands from '../support/custom_commands';
var userData = require('../support/globalTestData');
import chai from 'chai';

const assert = chai.assert;

class WishListPage {
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
    homePageAddToWishlist = '(//a[@title="Wishlist"])[1]';

    
    // wishlist Page
    wishlistItemCount = '//tbody[@class="wishlist-items-wrapper"]/tr';
    wishlistItemProductPrice = '//tbody[@class="wishlist-items-wrapper"]/tr[{0}]/td[@class="product-price"]';
    wishlistItemrowId = '//tbody[@class="wishlist-items-wrapper"]/tr[{0}]';
    wishlistAddToCart = '//td[@class="product-add-to-cart"]/a[@data-product_id="{0}"]';
    wishlistProductName = '//tbody[@class="wishlist-items-wrapper"]/tr[@data-row-id="{0}"]/td[@class="product-name"]/a';
    wishlistProductprice = '//tbody[@class="wishlist-items-wrapper"]/tr[@data-row-id="{0}"]/td[@class="product-price"]';


    cartPage = '//a[@title="Cart"]/i';
    cartProductprice = '//tr[@class="woocommerce-cart-form__cart-item cart_item"]/td[@class="product-remove"]/a[@class="remove"]';




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



    viewWishList()
    {
        CustomCommands.clickElement(this.homePageAddToWishlist)
    }

    verifyItemCount(expectedCount)
    {
        var itemCount = CustomCommands.getNumberOfElementsWithLocator(this.wishlistItemCount)
        console.log("itemCount : "+itemCount);
        CustomCommands.assertNumbersAreEqual(itemCount,expectedCount);
    }


    sortPriceofProductinWishList(){
        var expectedCount=4;
        var wishListProd = this.wishlistItemProductPrice;
        var wishListrowId = this.wishlistItemrowId;
        var wishListprdName = this.wishlistProductName;
        const priceList = new Array(4);
        const fullpriceList = new Array(4);
        // const rowId = new Array(4);

        for (var k = 1; k <= expectedCount; k++) {
            var DynamicWishListPrice=wishListProd.replace('{0}',k);
            var DynamicwishListrowId=wishListrowId.replace('{0}',k);
            CustomCommands.verifyElementIsVisible(DynamicWishListPrice);
            var cost= CustomCommands.getTextForElement(DynamicWishListPrice);
            console.log("price of each item of index "+ k + "is "+ cost);
            var lastFive = cost.substr(cost.length - 5);

            console.log("values of each item "+ lastFive);
            console.log("price of each item "+ lastFive.substring(0,2));
            priceList[k-1]=lastFive.substring(0,2)+"RowID"+CustomCommands.getAttributeForLocator(DynamicwishListrowId,"data-row-id");
            fullpriceList[k-1]=cost;
        }
        console.log("sorted price in ascending order"+ priceList[0]);
        console.log("sorted fullpriceList in ascending order"+ priceList[0]);
        console.log("sorted price in ascending order sorted "+ priceList.sort(function(a, b){return a - b}))


        var rowId= priceList[1].split("RowID");
        var productID= rowId[1];
        userData.setField('prodcutID',productID);

        var DynamicrowId=(this.wishlistAddToCart).replace('{0}',productID);
        var DynamicProdName=(this.wishlistProductName).replace('{0}',productID);
        var DynamicProdprice=(this.wishlistProductprice).replace('{0}',productID);
        console.log("Final product "+ CustomCommands.getTextForElement(DynamicProdName) +"  with lowest cost"+CustomCommands.getTextForElement(DynamicProdprice) + " for row id "+productID);
        return productID;
    }

    searchLowestPriceItemToCart()
    {
        var lowestPrdRowId= this.sortPriceofProductinWishList();
        var DynamicrowId=(this.wishlistAddToCart).replace('{0}',lowestPrdRowId);
        var DynamicProdName=(this.wishlistProductName).replace('{0}',lowestPrdRowId);
        var DynamicProdprice=(this.wishlistProductprice).replace('{0}',lowestPrdRowId);
        console.log("Final product "+ CustomCommands.getTextForElement(DynamicProdName) +"  with lowest cost"+CustomCommands.getTextForElement(DynamicProdprice) + " for row id "+lowestPrdRowId);

    }


    addLowestPriceItemToCart()
    {

        var lowestPrdRowId= this.sortPriceofProductinWishList();
        var DynamicrowId=(this.wishlistAddToCart).replace('{0}',lowestPrdRowId);
        var DynamicProdName=(this.wishlistProductName).replace('{0}',lowestPrdRowId);
        var DynamicProdprice=(this.wishlistProductprice).replace('{0}',lowestPrdRowId);
        console.log("Final product "+ CustomCommands.getTextForElement(DynamicProdName) +"  with lowest cost"+CustomCommands.getTextForElement(DynamicProdprice) + " for row id "+lowestPrdRowId);
        CustomCommands.clickElement(DynamicrowId);
    }


    verifyItemInCart()
    {
        var lowestPrdRowId= userData.testData.prodcutID;
        CustomCommands.clickElement(this.cartPage);
        CustomCommands.assertNumbersAreEqual(CustomCommands.getAttributeForLocator(this.cartProductprice,"data-product_id"),lowestPrdRowId);
    }




}

export default new WishListPage();
