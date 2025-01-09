'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var Resource = require('dw/web/Resource');
var ContentMgr = require('dw/content/ContentMgr');

server.get('Show', function( req, res, next) {
    var productID = req.querystring.pid;
    var product = ProductMgr.getProduct(productID);

    if (!product) {
        res.setStatusCode(404);
        res.render("error/notFound");
        return next();
    }

    var isAvailable = product.availabilityModel.inStock;

    var productModel = {
        id: product.ID,
        name: product.name,
        shortDescription: product.shortDescription,
        image: product.getImage('medium').URL.toString(),
        price: product.priceModel.price.decimalValue,
        hasStock: isAvailable,
    };

    var productNotAvailable = Resource.msg("notAvailable", "myproduct", null);
    var addCart = Resource.msg("button.addcart", "myproduct", null);
    var addToCartMessage = ContentMgr.getContent("add_to_cart_message").custom.body;

    res.render('myProduct/myproduct', {
        product : productModel,
        productNotAvailable,
        addCart,
        addToCartMessage,
    });

    // 008884303996M  - tem em estoque
    // 008884303989M  - não tem em estoque
    next();
})

module.exports = server.exports();
