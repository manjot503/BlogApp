const {initializeApp} = require ("firebase/app")
const {getStorage} = require("firebase/storage")
//connection mongoose and mongodb
const mongoose= require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
// mongoose.connect(process.env.BLOG_URL)
.then(()=>{
    console.log("mongoose Connected")
});
//firebase configrations
const firebaseConfig = {
    apiKey: "AIzaSyDZaPS8pSkGZDXcfixUEvqRI-iNVfEfHOI",
    authDomain: "blogapp-55e3e.firebaseapp.com",
    projectId: "blogapp-55e3e",
    storageBucket: "blogapp-55e3e.appspot.com",
    messagingSenderId: "962619036076",
    appId: "1:962619036076:web:c6d24493d7bfd5ea00aa09",
    measurementId: "G-TBRLBY4MQL"
  };
//schema
const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String
})
const app =initializeApp(firebaseConfig);
const storage = getStorage(app)
//connection mongoose with schema
const user = mongoose.model("user",userSchema)

const blogSchema = new mongoose.Schema({
    title:String,
    description:String,
    img:String,
    date:Date,
    userId:String,
    authorName:String
    
    
})
const Blog = mongoose.model("blogs",blogSchema)

module.exports = {user,Blog,storage};

