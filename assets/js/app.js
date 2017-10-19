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
    
    //Store user's plan type (required quantity)
    var plan;
    //Store total quantity selected
    var totalQuantity = 0;

    var selectedQuantity = 0;

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
            
            //New image element with smoothie class, image src, modal attributes, and product information
            var newSmoothie = $("<img>").addClass("smoothie").attr({
                "src": products[x].attrs.images[0].src,
                "data-toggle": "modal",
                "data-target": ".bd-example-modal-lg",
                "smoothie-ID": products[x].attrs.product_id,
                "variant-ID" : products[x].attrs.variants[0].id,
                "in-stock"   : products[x].attrs.variants[0].available,
                "smoothie-title"  : products[x].attrs.title,
                "smoothie-details": products[x].attrs.body_html
            });

            //h6 for the smoothie title
            var smoothieTitle = $("<h6>").html(products[x].attrs.title);

            //Append newSmoothie to a div that contains the entire product
            var newDiv = $("<div>").append(newSmoothie, smoothieTitle);

            //Append the newSmoothie div to the section on the HTML file
            $("section").append(newDiv);
        }

        //On subscription click...
        $(document).on("click", ".plan-btn", function(){
            //update user's subscription
            plan = $(this).attr("data-value");
            //update plan-btn innerHTML
            //...
        });

        //On smoothie click...
        $(document).on("click", ".smoothie", function(){
            //update the modal content
                //Image, product/variant ID, availability
                $(".modal-img").attr({
                    "src": $(this).attr("src"),
                    "smoothie-ID": $(this).attr("smoothie-ID"),
                    "variant-ID" : $(this).attr("variant-ID"),
                    "in-stock"   : $(this).attr("in-stock")
                });
                //Title
                $(".modal-title").html($(this).attr("smoothie-title"));
                //Details
                $(".modal-details").html($(this).attr("smoothie-details"));
        });

        //On add click...
        $(document).on("click", ".add-btn", function(){
            //If the item is in stock...(true)
            if($(".modal-img").attr("in-stock")){
                //get product ID
                console.log($(".modal-img").attr("smoothie-ID"));
                //get variant ID
                console.log($(".modal-img").attr("variant-ID"));
                //get product quantity
                selectedQuantity = parseInt($("#quantity").val());
                console.log(selectedQuantity);
                //add to total quantity
                totalQuantity += selectedQuantity;
                //add product variant/qty to cart
                //...
            }
            else{
                console.log("Item is not in stock.");
            }
        });

        //On checkout click...
        $(document).on("click", ".checkout-btn", function(){
            console.log(this);
            //generate checkout URL
        });

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
