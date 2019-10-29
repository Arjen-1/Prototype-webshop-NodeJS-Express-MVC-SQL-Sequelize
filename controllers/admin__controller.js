
const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {  
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;

    res.render('admin/edit-product',{
        editingProduct : false,  
        docTitle:'Add product',
        shopCSS: true
    })
}

exports.getEditProduct = (req,res,next) => {  
    console.log('product req: --> ' , req.body)
    console.log('product id: --> ' , req.body.productId)
    clickedId = req.body.productId;
    Product.findAll({where:{id:clickedId}})
        .then((products)=>{ 
            // console.log(products[0].dataValues)
            clickedProduct = products[0].dataValues 
            res.render('admin/edit-product',{
                editingProduct : true,
                productToEdit :  clickedProduct,
                //prods:products, 
                docTitle:'Edit product',
                shopCSS: true
            });
        })
        .catch((data)=>{
            console.log(data)
        })  
}

exports.postEditProduct = (req,res,next) => {  
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description ;
    console.log('----- prodid:', prodId)
    Product.findByPk(prodId)
        .then( product =>{ 
            console.log('----- product:',product)
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save()


            // res.render('admin/edit-product',{
            //     editingProduct : true,
            //     productToEdit :  clickedProduct,
            //     //prods:products, 
            //     docTitle:'Edit product',
            //     shopCSS: true
            // });
        })
        .then(succes => {
            console.log(succes) 
            res.redirect('/')
        })
        .catch((data)=>{
            console.log(data)
        })  
    
}

exports.getAdminProducts = (req,res,next) => {
    req.user.getProducts()
        .then((products)=>{
            res.render('admin/admin-products', {
                prods:products, 
                docTitle:'Admin products',
                shopCSS: true
            });
        })
        .catch((err) => console.log(err)) 
}

exports.postNewProduct = (req,res,next) => { 
    const title =  req.body.title
    const imageUrl =  req.body.imageUrl
    const description =  req.body.description
    const price =  req.body.price
    req.user.createProduct({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    })
    .then((data)=>{
        console.log('created product')
        res.redirect('/admin/admin-products')

    })
    .catch((data)=>{
        console.log(data)
    });
}




exports.getDeleteProduct = (req,res,next) => { 
    
    reqBodyId = req.body.productId
    Product.findByPk(reqBodyId)
    .then((product)=>{
        return product.destroy()
    })
    .then( result =>{
        console.log(result)
        res.status(304).redirect('/admin/admin-products')
    })
    .catch(res=>console.log(res)) 

} 