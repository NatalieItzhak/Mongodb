const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    productsName: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (value.length <0) {
                throw Error("Name can'e be empty")
            }
        }

    },
    productsCategory: {
        type: String,
        required: true,
        unique: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        unique: false,
        default: true
    },
    productDetails: {

        description: {
            type: String,
            required: true,
            unique: true,
           min:10,
            },
        Price: {
            type: Number,
            required: true,
            unique: true,
            min: 0
        },
        discount: {
            type: Number,
            required: false,
            unique: true,
            default: 0
        },
        images: {
            type: Array,
            required: true,
            unique: true,
            validate(value) {
                if (value.length < 2) {
                    throw Error("you must add min 2 Images")
                }
            }
        },
        phonenumber: {
            type: Number,
            required: true,
            unique: true,
            min: 10,
        },
        date: {
            type: Date,
            required: false,
            unique: false,
            default: Date.now()
        }
    }

})

const productSModel = mongoose.model('products', productSchema);
module.exports = productSModel;

