//JavaScript Buy SDK
var shopClient = ShopifyBuy.buildClient({
    //Buy Button Access Token
    accessToken: '373f1694d25bedc5a69debe2ca8ed4a2',
    //Site URL
    domain: 'fresh-gatherer.myshopify.com',
    //General Buy button ID
    appId: '6'
  });

var cart;
shopClient.createCart().then(function (newCart) {
  cart = newCart;
  console.log(cart);
  // do something with updated cart
});

//Retrieve a particular product with ID
shopClient.fetchProduct('176946315293').then(product => {
    console.log(product);
});