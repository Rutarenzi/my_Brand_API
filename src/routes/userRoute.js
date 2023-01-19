import { Router } from "express";
import passport from "passport";
import  jwt  from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            format: objectId
 *            example: 63a14e44f08ce9c0f90689fe
 *          email:
 *            type: string
 *            format: email
 *            example: ruta@gmail.com
 *          password:
 *            type: string
 *            format: password
 *            example: 12345678
 *          __v:
 *            type: integer
 *            example: 0
 */
router.post('/signup', async (req, res,)=>{
  const {email,password} = req.body;
  const exists = await User.findOne({email:email});
  if(exists){
    res.status(409).send("user already exist")
  } else {
    const salt = await bcrypt.genSalt(10);
    const hp = await bcrypt.hash(password, salt);
    const newUser = new User({email: email, password: hp});
    await newUser.save();
    res.status(200).send("user created successfully");
  }
})
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign up 
 *     description: Signing up
 *     operationId: Signup
 *     requestBody:
 *         description: you are required to provide email,password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: ruta2023@gmail.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: 12345678
 *               required:
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: Successfully
 *       '401':
 *         description: Unauthorized
 *       "409":
 *           description: Conflict
 *       '500':
 *         description: Internal server error
 */
router.post('/login', async (req, res)=>{
  const { email, password} = req.body;
  const user = await User.findOne({email:email});
  if(!user){
    res.status(500).send("user not found")
  } else {
    const pswd = await bcrypt.compare(password, user.password);

    if(!pswd){
      res.status(500).send("invalid password")
    } else{
      const token = jwt.sign({_id:user._id, email: user.email},'TOP_SECRET');
      res.status(200).json({token:token});
    }
  }

  
})

/**
 * @swagger
 *   /auth/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login in 
 *     description: Log in
 *     operationId: login
 *     requestBody:
 *         description: provide  email and password to login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: ruta@gmail.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: 12345678
 *               required:
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: Successfully
 *       '500':
 *           description: Internal server error
 */

export default router





