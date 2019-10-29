
const Product = require('../models/product')

//const Cart = require('../models/cart')
//const Order = require('../models/order')

exports.getProductList = (req,res,next) => { 
    Product.findAll().then((products)=>{
        res.render('shop/product__list', {
            prods:products, 
            docTitle:'Products overview',
            shopCSS: true
        });
    })
    .catch((err) => console.log(err)) 
}

exports.getShopIndex = (req,res,next) => { 
    Product.findAll().then((products)=>{
        res.render('shop/product__list', {
            prods:products, 
            docTitle:'myShop',
            shopCSS: true
        });
    })
    .catch((err) => console.log(err))

    
}
exports.getCheckout = (req,res,next) => { 
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            prods:products, 
            docTitle:'Checkout!',
            shopCSS: true
        });
    });
    
}
exports.getCart = (req,res,next) => {
        req.user.getCart()
            .then((cart)=>{
                //console.log(result)
                return cart
                    .getProducts()
                    .then(products=>{
                        console.log(products)
                        res.render('shop/cart', {
                                    products:products, 
                                    docTitle:'My cart!',
                                    shopCSS: true
                                });
                    })
                    .catch((err) => {
                    console.log(err)
                    })
                
            })
            .catch((err) => {
                console.log(err)
                })
            
        // Cart.fetchCartProducts((products) => {
        //     console.log('fetch:', products)
        //     res.render('shop/cart', {
        //         prods:products, 
        //         docTitle:'My cart!',
        //         shopCSS: true
        //     });
        // });

        
    
    
}

exports.postCart = (req,res,next) => {  
    console.log('eeeeeeeeeeeeeeee')
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
            .then((cart)=>{
                fetchedCart = cart;
                return cart.getProducts({where:{id:prodId}})
                
            })
            .then(products =>{
                let product;
                if (products.length > 0){
                    product = products[0]
                }
                
                if (product) {
                   const oldQuantity = product.cartItem.quantity
                   newQuantity = oldQuantity + 1;
                   return product;                   
                }
                return Product.findByPk(prodId)
            })
            .then( product => {
                return fetchedCart.addProduct(product , {through : {quantity: newQuantity}})
            })
            .then(()=>{ 
                res.redirect('/shop/cart')
            }) 
            .catch((err) => {
            console.log(err) 
            }) 
    
}

exports.deleteCartitem = (req,res,next) => {  
    const prodId = req.body.productId; 
    req.user.getCart()
        .then((cart)=>{
            return cart.getProducts({where: {id:prodId}})
        
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy()
        })
        .then(result=>{
            console.log(result)
            res.redirect('/shop/cart')
        })
        .catch((err) => {
        console.log(err)
        }) 
}

exports.postCreateOrder = (req,res,next) => {
    let fetchedCart ; 
    req.user.getCart()
        .then((cart)=>{
        //console.log(cart)
            fetchedCart = cart;
            return cart.getProducts()
        
        })
        .then(products => {
            return req.user.createOrder()
                .then((order)=>{
                return order.addProducts(products.map(product =>{
                    product.orderItem = {quantity : product.cartItem.quantity}
                    return product
                }))
                
                })
                .then( result=>{
                    return fetchedCart.setProducts(null)
                    
                })
                .then(result =>{
                    res.redirect('/shop/orders')
                })
                .catch((err) => {
                console.log(err)
                })
            console.log('order: ', products)
        })
        .catch((err) => {
        console.log(err)
        })
}

exports.getOrders = (req,res,next) => {  
        req.user.getOrders({include: ['products']})
            .then((orders)=>{
             
                res.render('shop/orders', { 
                    docTitle:'My orders!',
                    shopCSS: true,
                    orders:orders
                });
            
            })
            .catch((err) => {
            console.log(err)
            })
        
     
}
exports.getProdDetail = (req,res,next) => {  
        const prodId = req.params.productId;
        // Product.findAll({where:{id:prodId}})
        // .then(products => {
        //     res.render('shop/product__detail', {
        //         docTitle:'Product detail',
        //         shopCSS: true,
        //         product: products[0]
        //     }); 
        // })
        Product.findByPk(prodId)
        .then((product)=>{
            res.render('shop/product__detail', {
                docTitle:'Product detail',
                shopCSS: true,
                product: product
            }); 
        })
        .catch((err) => console.log(err)) 
}
