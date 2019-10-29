const path = require('path');
const express = require('express')

const router = express.Router(); 

productController = require('../controllers/products__controller')
commonController = require('../controllers/common__controller')

router.use('/shop/product__list', productController.getProductList) 

router.use('/shop/index', productController.getShopIndex) 
router.use('/shop/checkout', productController.getCheckout) 
router.post('/shop/cart', productController.postCart) 
router.post('/shop/cart-delete', productController.deleteCartitem) 
router.use('/shop/cart', productController.getCart) 
router.use('/shop/orders', productController.getOrders) 
router.post('/shop/create-order', productController.postCreateOrder) 
router.use('/shop/product__detail', productController.getProdDetail) 



router.get('/products/:productId', productController.getProdDetail)

router.get('/', commonController.redirectToHome)


module.exports = router