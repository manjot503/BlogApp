const express = require("express")
const zod = require("zod");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs")
const {user} = require("../db");
const {Blog} =require("../db")
const sendEmail  = require("../nodemailer");
const Auth = require("../middleware/auth");

const app = express();
app.use(cors())
app.use(express.json())
require("dotenv").config();
const userRouter = express.Router()


const signupValidator =  zod.object({
    username : zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})


userRouter.post("/signup", async (req,res)=>{
    const body = req.body
    const success = signupValidator.safeParse(body)
    if(!success){
        return res.status(411).json({msg: "invalid inputs"})
    }
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password,salt)
    try {
        const check = await user.findOne({
            email: body.email
        })
        if(check){
            return res.status(403).json({
                msg: "email already exist"
            })
        }
        const response= await user.create({
            firstname: body.firstname,
            lastname: body.lastname,
            username : body.username,
            email: body.email,
            password: securePass
        })
        const token = jwt.sign(response._id.toHexString(),process.env.SECRET);
        return res.json({
            name:response.firstname,
            token:token
        })
    }catch(error){
        console.log(error)
        return res.status(403).json({
            msg:"error while signing in"
        })
    }
}) 



//login

const loginValidator = zod.object({
   email: zod.string().email(),
   password: zod.string().min(6)
})

userRouter.post("/login",async(req,res)=>{
    const body = req.body
    const success =loginValidator.safeParse(body)
    if(!success){
        return res.status(400).json( {msg:' invaild inputs '})

    }
    try{
        const emailCheck = await user.findOne({
            email: body.email,
            // password:body.password
        })
        if(!emailCheck){
            return res.status(403).json({msg:"email does not exist"})
        }
    //      if(req.body.password !== emailCheck.password){
    //     res.status(403).json({error:"enter correct password"});
    //   }
     
        const passwordMatch = await bcrypt.compare(body.password, emailCheck.password);
        
        if (!passwordMatch) {
            return res.status(403).json({ msg: "Incorrect password" });
        }
       

        const token = jwt.sign(emailCheck._id.toHexString(),process.env.SECRET)
        return res.json({
            token:token
        })
    }
    catch(err){
        console.log(err) 
         res.status(500).json({ msg: "Error while logging in", error: err.message });
    }
})


//otp

userRouter.post ("/otp",async(req,res)=>{
    const body = req.body;
    try {
        const check = await user.findOne({
            email:body.email
        })
        
      if(!check){
    return res.status(403).json({msg:"email does not exist"})
}else{
  sendEmail(body)
  .then((response)=>{return res.send(check.email)})
  .catch((response)=>{return res.send(response.msg)})

}
 
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ msg:'error' });
    }
})

//update password

userRouter.put('/update',async(req,res)=>{
    const body = req.body
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password,salt)
    
    try {
    
    const response = await user.updateOne({email:body.email},{password:securePass})
    return res.json({msg:"password updated"})
    } 
    catch (error) {
        return res.status(500).json({ msg:'error' });
        
    }
})


//api for user show

userRouter.get('/userdata',Auth,async(req,res)=>{
    try {
        const response = await user.findById(req.userId)
        const blogs = await Blog.find({
            userId:req.userId
        })
        return res.json({
            username:response.username,
            email:response.email,
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg:' user error' });
    }

})





module.exports = userRouter;
