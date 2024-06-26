const nodemailer = require("nodemailer")
require("dotenv").config(); 

function sendEmail({email,OTP}){
  console.log(email)
return new Promise((reslove,reject)=>{
    var transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      }
    });
    console.log(transporter)

    var mail_configs ={
      from:process.env.EMAIL,
      to:email,
      subject:"OTP for reset password",
      html:`<h1>Hello,${email}</h1>
      <h4> your OTP ${OTP}</h4>`
    }
    transporter.sendMail(mail_configs,function(error,info){
      if(error){
        return reject({msg:"OTP error"})
      }
      else{
        return reslove({msg:"OTP send"})
      }
})
  })
}


module.exports = sendEmail