const express = require('express');
const path = require('path');
const app = express('public');
const hbs = require("hbs");

require("./db/conn"); // Assuming this file contains the database connection logic
const Register = require("./models/registers")
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) =>{ 
    res.render("index")
});
app.get("/register", (req, res) =>{
    res.render("register");
})
app.get("/about",(req, res) =>{
    res.render('about');
})
app.get("/contact", (req, res) =>{
    res.render('contact')
})
app.get("/cropnutrition", (req, res) =>{
    res.render('cropnutrition')
})
app.get("/cropprotection", (req, res) =>{
    res.render('cropprotection')
})
app.get("/hardware", (req, res) =>{
    res.render('hardware')
})
app.get("/seeds", (req, res) =>{
    res.render('seeds');
})
app.get("/login", (req, res) =>{
    res.render('login');
})
app.get("/cart", (req, res) => {
    res.render('cart')
})
//new user
app.post("/register", async(req, res) =>{
    try {
    
        const registerUser = new Register({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        });

        const registered = await registerUser.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})
//login
app.post("/login", async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail= await Register.findOne({email:email});
        const mobile = await Register.findone({mobile:mobile});
        
        if (useremail.password.mobile === password) {
            res.status(201).render("index");
        }else{
            res.send("Invalid Login details");
        }


    } catch (error) {
        res.status(400).send("Invalid Login details");
    }
})
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});