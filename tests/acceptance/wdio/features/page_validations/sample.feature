Feature: Sample BDD to load Testscriptdemo url and verify cart


  Background:
    Given  I load sample url

  @Sample
  Scenario Outline: Validate workflow to add item into cart from Wishlist


    Given  I add <itemCount> different products to my wish list
    When I view my wishlist table
    Then I find total <itemCount> selected items in my Wishlist
    When I search for lowest price product
    And I am able to add the lowest price item to my cart
    Then I am able to verify the item in my cart


    Examples:
      | itemCount |
      | 4         |
