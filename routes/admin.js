const path = require('path');
const express = require('express')

const router = express.Router();

const rootDir = require('../util/path')

productController = require('../controllers/products__controller')
adminController = require('../controllers/admin__controller')


router.post('/product-edit/:id', adminController.postEditProduct)

router.post('/product', adminController.postNewProduct)

router.get('/add-product', adminController.getAddProduct) 

router.get('/admin-products', adminController.getAdminProducts)

router.post('/edit-product', adminController.getEditProduct)
router.get('/edit-product', adminController.getEditProduct)

router.get('/add-product', adminController.getAddProduct)

router.post('/delete-product', adminController.getDeleteProduct)





module.exports.routes = router;