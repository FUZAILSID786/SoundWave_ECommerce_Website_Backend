const mongoose = require("mongoose");

const ContactDetaillsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique:true,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model("contactdetail", ContactDetaillsSchema);
module.exports = Contact;