//JavaScript Buy SDK
var shopClient = ShopifyBuy.buildClient({
    //API Key
    accessToken: '01fca01ffb6bcc6e4450d6ed94e5d195',
    //Site URL
    domain: 'fresh-gatherer.myshopify.com',
    //Password
    appId: 'b43314de3e6ef4322bffd0c1e44f6b10'
  });
console.log(shopClient);

//Ajax API
//Current URL is not working
$.ajax({
    url: 'https://01fca01ffb6bcc6e4450d6ed94e5d195:b43314de3e6ef4322bffd0c1e44f6b10@fresh-gatherer.myshopify.com/admin/orders.js',
    method: 'GET'
}).done(function(response){
    console.log(response);
});