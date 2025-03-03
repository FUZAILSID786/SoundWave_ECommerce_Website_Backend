const mongoose = require("mongoose");
const DBURL = "mongodb+srv://fuzailsiddiqui499:ECommerceDB@cluster0.n5q18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBURL, {
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(() => {
    console.log("Database Connected!");
}).catch((err) => {
    console.log("Error while connecting Database", err);
});