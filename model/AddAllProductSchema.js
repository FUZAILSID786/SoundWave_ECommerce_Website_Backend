const mongoose = require("mongoose");

const allProductSchema = new mongoose.Schema({
    allTitle: {
        type: String,
        required: true
    },

    allDescription: {
        type: String,
        required: true
    },

    allPrice: {
        type: Number,
        required: true
    },

    AllSelectedImage: {
        type: String,
        required: true
    }
});

const allProduct = mongoose.model("allproduct", allProductSchema);
module.exports = allProduct;