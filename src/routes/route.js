import { Router } from "express";
import { BlogController } from "../controllers/blogController";
const router = Router();
import passport from "passport";
// const Visitor = require("../models/visitors")
// all blogs 
router.get('/Blogs',BlogController.allBlogs);
// add a blog
router.post("/blog/add",BlogController.createBlog);

// fetch single blog
router.get("/blogs/:id",BlogController.readBlog );

// update a single blog
 router.patch("/blogs/:id",passport.authenticate("jwt", { session: false }),BlogController.updateBlog);

//  delete a single blog
router.delete("/blogs/:id",passport.authenticate("jwt", { session: false }),BlogController.deleteBlog);

    // add comment to a blog
router.patch("/blogs/:id/comment/add",BlogController.commentBlog);
// add like ??? problem of no unlike
router.patch('/blogs/:id/like',BlogController.blogLiker)
export default router


























// // like and unlike a comment of a blog
// router.patch('/blogs/:id/like',async(req,res)=>{
//     try{
//     const blog = await Blog.findOne({_id: req.params.id})
//    var  ipAddress = req.socket.remoteAddress;
//     if(blog.likes.includes(ipAddress)){
         
//         // blog.likes=[]
//         res.send(blog.likes)
        
//     }
//     else{
//         const like = Visitor({
//             visitorIp:ipAddress
//         })
//         blog.likes.push(like.visitorIp)
//         await blog.save()
//         res.send(blog.likes.includes(ipAddress))
        
//     }
// }  
// catch{
//     res.status(404)
//     res.send({error: "no post to like"})
//    }
    
// })
