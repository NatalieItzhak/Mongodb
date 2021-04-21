const productModel = require('../models/product.model');


const createProduct = async (req, res) => {

    const { productsName, productsCategory, isActive, productDetails } = req.body;

    const product = new productModel({
        productsName: productsName,
        productsCategory: productsCategory,
        isActive: isActive,
        productDetails: productDetails
    });
    try {
        const result = await product.save();
        return res.status(201).json({ "success": result });
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

const getProductbyName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await productModel.findOne({ name: name });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.send(product);
    } catch (error) {
        return res.status(500).json({ "error": error })
    }

}

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send("Wrong ID");
        }
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getActiveProducts = async (req, res) => {
    try {
        const products = await productModel.find({ isActive: true });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProductsByPriceRange = async (req, res) => {
    const { min, max } = req.body;
    try {
        const products = await productModel.find({
            "details.price": { $gte: min, $lte: max },
        });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
    const update = async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["isActive", "details.discount"];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );
        if (!isValidOperation) return res.status(400).send("Invalid update");

        try {
            const product = await productModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!product) {
                return res.status(404).send("This ID was not found");
            }
            res.send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    };

    const deleteProduct = async (req, res) => {
        try {
            const product = await productModel.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).send("This ID was not found");
            }
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    const deleteAllProducts = async (req, res) => {
        try {
            const response = await productModel.deleteMany();
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    module.exports = {
        create: createProduct,
        getAll: getProduct,
        getProductbyName,
        getActiveProducts,
        getProductsByPriceRange,
        update,
        deleteProduct,
        deleteAllProducts

    }
}
