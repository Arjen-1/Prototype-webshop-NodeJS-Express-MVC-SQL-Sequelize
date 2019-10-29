exports.get404 = (req,res,next) => { 
    
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.render('404', {docTitle:'404'})
}


exports.redirectToHome = (req,res,next) => { 
    res.redirect('/shop/index')
}