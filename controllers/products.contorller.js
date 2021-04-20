const productModel = require('../models/product.model');


const createProduct = (req, res) => {

    const { productsName, productsCategory, isActive, productDetails } = req.body;

    const product = new productModel({
        productsName: productsName,
        productsCategory: productsCategory,
        isActive: isActive,
        productDetails: productDetails
    });
    // const product1 = new product(
    //     {
    //         productsName: "Iphone",
    //         productsCategory:"Electronic",
    //         isActive:isActive,
    //         productDetails:{description:'iphone', Price:4000, images:[]}
    //     }
    // )

    product.save((err) => {
        if (err) return res.json({ "error": err })
        return res.json({ "success": product})
    });


}

const getProduct = (req, res) => {
    productModel.find({}).then((product) => {
        return res.send(product)
    });
}

module.exports = {
    create: createProduct,
    getAll: getProduct
}
