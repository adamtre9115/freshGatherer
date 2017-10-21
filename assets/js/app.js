//JavaScript Buy SDK
var shopClient = ShopifyBuy.buildClient({
    //Buy Button Access Token
    accessToken: '373f1694d25bedc5a69debe2ca8ed4a2',
    //Site URL
    domain: 'fresh-gatherer.myshopify.com',
    //General Buy button ID
    appId: '6'
});

//When document is ready...
$(document).ready(function () {

    //Store user's subtotal (prices retrieved from server)
    var subtotal = 0;

    //Create a cart
    var cart;
    shopClient.createCart().then(newCart => {
        cart = newCart;
    });

    //Retrieve all products available on the Shopify store
    shopClient.fetchAllProducts().then(products => {

        //Append all products to HTML element
        for (var x = 0; x < products.length; x++) {

            //New image element with smoothie class, image src, modal attributes, and product information
            var newSmoothie = $("<img>").addClass("smoothie img-fluid").attr({
                "src": products[x].attrs.images[0].src,
                "data-toggle": "modal",
                "data-target": "#product-view",
                "smoothie-ID": products[x].attrs.product_id,
                "variant-ID": products[x].attrs.variants[0].id,
                "in-stock": products[x].attrs.variants[0].available,
                "smoothie-title": products[x].attrs.title,
                "smoothie-details": products[x].attrs.body_html
            });

            //h6 for the smoothie title
            var smoothieTitle = $("<h6>").html(products[x].attrs.title);

            //Append newSmoothie to a div that contains the entire product
            var newDiv = $("<div class = 'col-md-3'>").append(newSmoothie, smoothieTitle);

            //Append the newSmoothie div to the section on the HTML file
            $("#shopifyImg").append(newDiv);
        }
    });

    //On add-btn click...
    $(document).on("click", ".add-btn", function () {
        //Grab product ID and quantity from the modal (which displays selected product)
        var productID = parseInt($(".modal-img").attr("smoothie-ID"));
        var amount = parseInt($("#quantity").val());

        //Retrieve info from shopify...
        shopClient.fetchProduct(productID).then(product => {
            //Check if available
            if (product.attrs.available) {
                //Then add product/quantity to cart
                cart.createLineItemsFromVariants({
                    variant: product.selectedVariant,
                    quantity: amount
                })
            }
        });
    });

    /*On subscription click...
    $(document).on("click", ".plan-btn", function () {
        //update user's subscription
        planName = $(this).attr("plan-name");
        planQty = parseInt($(this).attr("plan-qty"));
        planCost = parseFloat($(this).attr("plan-cost"));

        //update plan-btn innerHTML
        $(".plan-1").html($(".plan-1").attr("plan-name"));
        $(".plan-2").html($(".plan-2").attr("plan-name"));
        this.innerHTML = $(this).attr("plan-name") + ' \u2714';
    });*/

    //On smoothie click update the modal content
    $(document).on("click", ".smoothie", function () {
        //Image, product/variant ID, availability
        $(".modal-img").attr({
            "src": $(this).attr("src"),
            "smoothie-ID": $(this).attr("smoothie-ID"),
            "variant-ID": $(this).attr("variant-ID"),
            "in-stock": $(this).attr("in-stock")
        });
        //Title
        $(".modal-title").html($(this).attr("smoothie-title"));
        //Details
        $(".modal-details").html($(this).attr("smoothie-details"));
        //Reset dropdown value to default (1)
        $("#quantity").val(1);
    });

    //On cart-btn click...
    $(document).on("click", ".cart-btn", function () {
        //generate checkout URL (new href)
        $(".checkout-link").attr("href", cart.checkoutUrl);
        //Clear previous items
        $(".cart-body").empty();
        //Iterate through cart
        for (var c = 0; c < cart.attrs.line_items.length; c++) {
            //Get image src, title, quantity from items in cart
            var cartItemImg = $("<td>").append($("<img class='img-fluid checkout-img'>").attr("src", cart.attrs.line_items[c].image.src));
            var cartItemTitle = $("<td>").html(cart.attrs.line_items[c].title);
            var cartItemId = $("<td>").html(cart.attrs.line_items[c].product_id);
            var cartItemQty = $("<td>").html(cart.attrs.line_items[c].quantity);

            //Append to new div that contains img, title, qty info
            var cartItemRow = $("<tr>").append(cartItemImg, cartItemTitle, cartItemId, cartItemQty);

            //Append to correct location
            $(".cart-body").append(cartItemRow);

            //Calculate subtotal (price * quantity, retrieved from server)
            subtotal += (parseFloat(cart.attrs.line_items[c].price) * cart.attrs.line_items[c].quantity);
        }
        //Update subtotal
        $(".subtotal").html("Subtotal: $" + subtotal.toFixed(2));
    });

});