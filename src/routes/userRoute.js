import { Router } from "express";
import passport from "passport";
import  jwt  from "jsonwebtoken";


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
 *          name:
 *            type: string
 *            example: Rugarama axcel
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

router.post('/signup',passport.authenticate('signup', { session: false }),
    async (req, res, done) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
);
/**
 * @swagger
 * /signup:
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
 *                   example: ngsol@gmail.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: andela
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: Success
 *       '401':
 *         description: Unauthorized
 *       "409":
 *           description: Conflict
 *       '500':
 *         description: Internal server error
 */



router.post('/login',async (req, res, next) =>{
      passport.authenticate('login',async (err, user, info) =>{
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(user,{ session: false }, async (error) => {

                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
);
/**
 * @swagger
 *   /login:
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
 *           description: Success
 *       '500':
 *           description: Internal server error
 */

export default router

