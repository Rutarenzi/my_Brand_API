import { Router } from "express";
import { BlogController } from "../controllers/blogController";
const router = Router();
import passport from "passport";
import passporter from "../middleware/passport";

passporter()
// const Visitor = require("../models/visitors")
// all blogs

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *      type: object
 *      properties:
 *       _id:
 *         type: string
 *         format: objectId
 *         example: 63bd50b3b9565d6f1040b9eb
 *       title:
 *         type: string
 *         # format: int64
 *         example: ruta first blog
 *       content:
 *         type: string
 *         # format: int32
 *         example: Lorem ipsum first Rutagarama Blog first Rutagarama Blog
 *       comments:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *              id:
 *               type: string
 *               format: objectId
 *               example: 63a567bc2a672df0a5192bb8
 *              name:
 *               type: string
 *               example:   Ruta axcel
 *              content:
 *               type: string
 *               example: Hello this writing
 *       likes:
 *        type: array
 *        items:
 *           type: object
 *           properties:
 *              id:
 *              type: string
 *              format: objectId
 *              example: 63a567bc2a672df0a5192bb8
 *            
 *               
 */


router.get('/Blogs',BlogController.allBlogs);
/**
 * @swagger
 * /Blogs:
 *   get: 
 *     tags:
 *       - Blogs
 *     summary: Retrieve all blogs
 *     description: Retrieve all Blogs .
 *     operationId: get blogs
 *     responses: 
 *       "200": 
 *         description: successfully operation
 *       "500": 
 *         description: internal server error
*/

router.post("/blog/add",
passport.authenticate("jwt", { session: false }),
BlogController.createBlog);

/**
 * @swagger
 * /blog/add:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Add a blog
 *     description: to add a blog
 *     operationId: add blog
 *     requestBody:
 *       description: adding a  blog
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: ruta first blog
 *                content:
 *                  type: string
 *                  example: Lorem ipsum first Rutagarama Blog first Rutagarama Blog 
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '409':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
// fetch single blog

 
router.get("/blogs/:id",BlogController.readBlog );

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: fetxh single blog
 *     description: get a single blog
 *     operationId: getaBlog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: return a blog id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     responses:
 *       '200':
 *         description: successful operation
 *       '500':
 *         description: Internal server error
 */

// update a single blog
 router.patch("/blogs/:id",passport.authenticate("jwt", { session: false }),BlogController.updateBlog);

 /**
 * @swagger
 * /blogs/{Id}}:
 *   patch:
 *     tags:
 *       - Blogs
 *     summary: to update the a blog
 *     description: To update blog blog
 *     operationId: UpdateBlog
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: Blog Id to update
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     requestBody:
 *       description: Update blog
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: Blog title 1
 *                content:
 *                  type: string
 *                  example: Blog content should be string of any size
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '409':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */


//  delete a single blog
// this how my delete route is protected
router.delete("/blogs/:id",
passport.authenticate("jwt",{ session: false }),
BlogController.deleteBlog);
/**
 * @swagger
 * /blogs/{Id}:
 *  delete:
 *     tags:
 *       - Blogs
 *     summary: deletes a blog 
 *     description: delete a blog
 *     operationId: blogDelete
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: Blog  deleted
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     responses:
 *       '200':
 *         description: Successfull operation
 *       '404':
 *         description: Blog with that Id not found
 *       '401':
 *         description: Not Authorized
 */

    // add comment to a blog
router.patch("/blogs/:id/comment/add",BlogController.commentBlog);

// add like ??? problem of no unlike
router.patch('/blogs/:id/like',BlogController.blogLiker)
/**
 * @swagger
 * /blogs/{Id}/like:
 *   patch:
 *     tags:
 *       - Blogs
 *     summary: Addinga like to a blog
 *     description: Adding like to a blog
 *     operationId: Likes
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: like by id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     responses:
 *       '200':
 *         description: successful operation
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */
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
