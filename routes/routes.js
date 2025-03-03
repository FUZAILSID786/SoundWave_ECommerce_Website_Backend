const express = require("express");
const Product = require("../model/AddProductSchema");
const allProduct = require("../model/AddAllProductSchema");
const shopProductSc = require("../model/AddShopProductSchema");
const Contact = require("../model/ContactDetailsSchema");
const User = require("../model/UserSchema");
const router = express.Router();
require("../model/AddProductSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe");
const Admin = require("../model/AdminLoginSchema");

const Stripe = new stripe("sk_test_51Q3gaIGGaYoYt1Z7yFMvQ9NWxiZjFgdngBBdhnd7L55y6mwhwgIqULJmOsqyJGfVZ22KOGGazU0mCqYM5eClvXfo00BbF8SdFi", {
    apiVersion : "2024-06-20"
  })

// Add Product API
router.post('/addproduct' , async (req , res) => {
    try{
        const{title, description, price, selectedImage} = req.body;

        if(!title || !description || !price || !selectedImage){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const productData = new Product({title, description, price, selectedImage})
        await productData.save();
        res.status(201).json({message:"Product Added Successfully"});
    }catch(err){
        console.log(err)
    }
});

// Update Product API

router.put('/addproduct/:id' , async (req , res) => {
    try{
        const productId = req.params.id;

        const{title, description, price, selectedImage} = req.body;

        if(!title || !description || !price || !selectedImage){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const updateProduct = await Product.findByIdAndUpdate(productId,{
            title, 
            description, 
            price, 
            selectedImage,
        } ,
        {new:true})
        await updateProduct.save();
        res.status(201).json({message:"Product Updated Successfully"});
    }catch(err){
        console.log(err)
    }
});

// Delete Product API

router.delete('/addproduct/:productid' , async (req , res) => {
    try{
        const productId = req.params.productid;

    if(!productId){
        res.json({message:"Product Id Not Found!"});
    }

    const product = await Product.findById(productId);
    if(!product)
    {
        res.json({message:"Product Not Found"});
    }

    await Product.findByIdAndDelete(productId);
    res.json({message:"Product Deleted Successfully!"});
    }catch(err){
        console.log(error); 
    }
});
// Add All Products API

router.post('/addallproduct' , async (req , res) => {
    try{
        const{allTitle, allDescription, allPrice, AllSelectedImage} = req.body;

        if(!allTitle || !allDescription || !allPrice || !AllSelectedImage){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const productData = new allProduct({allTitle, allDescription, allPrice, AllSelectedImage})
        await productData.save();
        res.status(201).json({message:"Product Added Successfully"});
    }catch(err){
        console.log(err)
    }
});

//Add Shop Product API

router.post('/addshopproduct' , async (req , res) => {
    try{
        const{shopTitle, shopDescription, shopPrice, shopSelectedImage} = req.body;

        if(!shopTitle || !shopDescription || !shopPrice || !shopSelectedImage){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const productData = new shopProductSc({shopTitle, shopDescription, shopPrice, shopSelectedImage})
        await productData.save();
        res.status(201).json({message:"Product Added Successfully"});
    }catch(err){
        console.log(err)
    }
});


// Fetch Product API

router.get("/addproduct" , async (req , res) => {
    try{
        const fetchDataFromDb = await Product.find({})
        res.status(201).send(fetchDataFromDb);
    }catch(err){
        console.log(err);
    }
})

// Fetch All Products API

router.get("/addallproduct" , async (req , res) => {
    try{
        const fetchallDataFromDb = await allProduct.find({})
        res.status(201).send(fetchallDataFromDb);
    }catch(err){
        console.log(err);
    }
})

// Fetch Shop Products API

router.get("/addshopproduct" , async (req , res) => {
    try{
        const fetchshopDataFromDb = await shopProductSc.find({})
        res.status(201).send(fetchshopDataFromDb);
    }catch(err){
        console.log(err);
    }
})

// Get Single Product API for Products

router.get("/addproduct/:id" , async (req , res) => {
    try{
        const singleproduct = await Product.findById(req.params.id)
        res.status(201).send(singleproduct);

    }catch(err){
        console.log(err); 
        // res.status(409).json({message :"Product Not Found"}); 
    }
})

// Get Single Product API for All Products

router.get("/addallproduct/:id" , async (req , res) => {
    try{
        const allsingleproduct = await allProduct.findById(req.params.id)
        res.status(201).send(allsingleproduct);

    }catch(err){
        res.status(409).json({message : "Product Not Found"});
    }
})

// Get Single Product API for Shop Products

router.get("/addshopproduct/:id" , async (req , res) => {
    try{
        const shopsingleproduct = await shopProductSc.findById(req.params.id)
        res.status(201).send(shopsingleproduct);

    }catch(err){
        console.log(err)
        res.status(409).json({message : "Product Not Found"});
    }
})

// Contact Form POST API

router.post('/contactdetails' , async (req , res) => {
    try{
        const{fullName, email, subject, message} = req.body;

        if(!fullName || !email || !subject || !message){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const saveContactDetails = new Contact({fullName, email, subject, message})
        await saveContactDetails.save();
        res.status(201).json({message:"User Added Successfully"});
    }catch(err){
        console.log(err)
    }
});

// Create User 

router.post('/register' , async (req , res) => {
    try{
        const{fname, lname, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password , 10);

        if(!fname || !lname || !email || !password){
            return res.json({message:"Please Dont Leave Any Field Blank"});
        }

        const createUser = new User({fname, lname, email, password : hashedPassword})
        await createUser.save();
        res.status(201).json({message:"Message Sent Successfully"});
    }catch(err){
        console.log(err)
    }
});

// Login Api 

router.post("/login" , async(req , res) => {
    const {email , password} = req.body;

    // Check Whether user exists or not
    
    const checkUser = await User.findOne({email});
    if(!checkUser){
        return res.json({message:"User Not Found!"})
    }
    if(await bcrypt.compare(password , checkUser.password)){
        const expireTime = 60 * 60 * 24 * 2;
        const token = jwt.sign({email : checkUser.email} , "vmvm676kvmdfv[vv]g[fd]dfvdnjnvkz335jnvjkvnkjdznvv53nvklnvfdvnr34njknv" , {expiresIn : expireTime });

        if(res.status(201)){
            return res.json({data:token});
        }
        return res.json({message : "Invalid Details"});
    }
    return res.json({message : "Incorrect Password!"}); 
});

// 

router.post("/checkout" , async (req,res)=>{
    try{
        const session = await Stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            mode : "payment",
            line_items : req.body.items.map((item)=>{
                return{
                    price_data : {
                        currency : "usd",
                        product_data : {
                            name : item.name
                        },
                        unit_amount : item.price * 100
                    },
                    quantity : 1
                };
            }),
            success_url : "http://localhost:3000/placeOrder",
            cancel_url : "http://localhost:3000/cancelOrder",
        });
        res.json({url : session.url})
    }catch(error){
        console.log("Error While Calling Stripe Payment Gateway : ", error);
    }
    
});

// Admin Login

router.get("/adminlogin" , async (req , res)=>{
    try{
        const adminlogincredentials = await Admin.find();
        res.status(201).send(adminlogincredentials);

    }catch(err){
        console.log(err)
        res.status(409).json({message : "Admin Not Found"});
    } 
})


module.exports = router;