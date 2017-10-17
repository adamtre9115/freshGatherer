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

//When document is ready...
$(document).ready(function(){
        
    //Create a cart
    var newCart;
    shopClient.createCart().then(function (newCart) {
        console.log(newCart.attrs);
        // do something with updated cart
        $("#total").text(newCart.subtotal);
    });

    //Retrieve all products available on the Shopify store
    shopClient.fetchAllProducts().then(products => {
        console.log(products);
        
        //Append all products to HTML element
        for (var x = 0; x < products.length; x++) {
            
            //New image element with smoothie class and correct image source (Always .image[0].src)
            var newImage = $("<img>").addClass("smoothie").attr("src", products[x].attrs.images[0].src);
            
            //h6 for smoothie title
            var smoothieTitle = $("<h6>").html(products[x].attrs.title);

            //New variable to hold smoothie description
            var smoothieInfo = $("<p>").html(products[x].attrs.body_html);

            //Description button, Add button
            var smoothieButton = $("<button>").addClass("btn btn-outline-primary moreBtn").html("Details");
            var addBtn = $("<button>").addClass("btn btn-outline-success addBtn").html("Select");

            //Append new attributes to a div that contains the entire product
            var newSmoothie = $("<div>").append(newImage, smoothieTitle, smoothieInfo, smoothieButton, addBtn);

            //Append the newSmoothie div to the section on the HTML file
            $("section").append(newSmoothie);
        }

    });

    

    /*Retrieve product based on ID (test)
    shopClient.fetchProduct('176946315293').then(product => {
        console.log(product);
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


});
