//JavaScript Buy SDK
//Ready up the shop
var shopClient = ShopifyBuy.buildClient({
    //Buy Button Access Token
    accessToken: '373f1694d25bedc5a69debe2ca8ed4a2',
    //Site URL
    domain: 'fresh-gatherer.myshopify.com',
    //General Buy button ID
    appId: '6'
  });
  console.log(shopClient);

//Create a cart
var cart;
shopClient.createCart().then(function (newCart) {
  cart = newCart;
  console.log(cart.attrs);
  // do something with updated cart
});

//Retrieve all products (test)
shopClient.fetchAllProducts().then(products => {
    console.log(products);
    //Append all products to html element
    for (var i = 0; i < products.length; i++) {
        //Create a new div to hold the product
        var newSmoothie = $("<div>");
        //Create a new image element with specified dimensions
        var newImage = $("<img width = '350' height = '350'>");
        //Add necessary classes
        newImage.addClass("smoothie");
        //Set image source to currently iterated product
        newImage.attr("src", products[i].attrs.images[i].src);
        //Append new attributes to the div that holds the product
        newSmoothie.append(newImage, products[i].attrs.title);
        //Append the newSmoothie div to the section on the HTML file
        $("section").append(newSmoothie);
    }
});

//Retrieve product based on ID (test)
shopClient.fetchProduct('176946315293').then(product => {
    console.log(product);
});

//If user clicks Add To Cart button
    /*$(".add-button").on("click", function(){
        
    });*/

//Add items to the cart
    //Get product.selectedVariant, quantity selected (.val() from HTML)
    /* Example code ...
        cart.createLineItemsFromVariants({variant: product.selectedVariant, quantity: 1}).then(function (cart) {
            // do something with updated cart
        }); 
    */

//Checkout with updated cart
    //Use cart.checkoutURL to generate a checkout URL with current cart
    /*Example Code
        document.location.href = cart.checkoutUrl;
        //Implement Shopify Sandbox for card info
    */