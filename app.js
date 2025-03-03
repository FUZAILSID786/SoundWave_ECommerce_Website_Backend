const express = require("express");
const app = express();
// const dotenv = require("dotenv");
const cors = require('cors');
// const router = require("./routes/routes");
require("./database/connection");



// dotenv.config({path:"./config.env"})
// const port = process.env.PORT;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true,}));
app.use(express.json());
app.use(require("./routes/routes"))
app.use(cors()); // Enable CORS for all routes


app.get("/", (req, res) =>{
    res.send("Welcome to server")
})

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Server is listening at port http://localhost:${PORT}`);
} )