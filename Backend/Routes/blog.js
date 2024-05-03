const { storage } = require("../db");
const express = require("express");
const zod = require("zod");

const { Blog } = require("../db")
const multer = require("multer");
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const Auth = require("../middleware/auth");

require("dotenv").config();
const blogRouter = express.Router();

const zodvalidation = zod.object({
    title: zod.string(),
    description: zod.string(),

})
const upload = multer({ storage: multer.memoryStorage() })
const multiple =[Auth, upload.single('filename')]
blogRouter.post('/create', multiple, async (req, resp) => {
    const body = req.body
    console.log(body)
    if(!req.file){
        console.log("file not uploaded")
    }
    const success = zodvalidation.safeParse(body);
    if (!success) {
        return resp.status(403).json({ msg: "Data invalid" })
    }
    try {
        const dataTime = Date.now()
        const storageRef = ref(storage, `${req.file.original + " " + dataTime}`)
        const metadata = {
            contentType: req.file.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        const DownloadURL = await getDownloadURL(snapshot.ref)
        const blog = await Blog.create({
            title: body.title,
            description: body.description,
            img: DownloadURL,
            date:Date.now(),
            userId:req.userId,
            
        })
        return resp.json({ msg: "upload successfully" })
    } catch (error) {
        console.log(error);
        resp.status(403).json({msg:'uploading error'})
    }
})



blogRouter.get("/allblogs",async(req,res)=>{
    try {
        const response = await Blog.find({})
        return res.json({blog:response})
    } catch (error) {
        return res.status(403).json({msg:"error while fetching blogs"})
    }
})






module.exports = blogRouter;