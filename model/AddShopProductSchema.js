const mongoose = require("mongoose");

const shopproductSchema = new mongoose.Schema({
    shopTitle: {
        type: String,
        required: true
    },

    shopDescription: {
        type: String,
        required: true
    },

    shopPrice: {
        type: Number,
        required: true
    },

    shopSelectedImage: {
        type: String,
        required: true
    }
});

const shopProductSc = mongoose.model("shopproduct", shopproductSchema);
module.exports = shopProductSc;