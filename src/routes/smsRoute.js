import { Router } from "express";
import {messageController} from "../controllers/smsController";
import passport from "passport";
const router=Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    Message:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: rutagarama axcel
 *         email:
 *           type: string
 *           format: email
 *           example: rutagarama@gmail.com
 *         message:
 *           type: string
 *           example: my message
 *         _id:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8  
 */

router.post('/sendSms', messageController.sendSms);
/**
 * @swagger
 * /sendSms:
 *   post:
 *     tags:
 *       - Messages
 *     summary: send message from contact us
 *     description: posting messages from contact page
 *     requestBody:
 *       description: send a message 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: ruta
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ruta@gmail.com
 *               message:
 *                 type: string
 *                 example: how are you
 *             required:
 *               - name
 *               - email
 *               - message
 *       required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                    $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error
 */

router.get('/admin/allMessage',passport.authenticate("jwt", { session: false }),messageController.allSms)

/**
 * @swagger
 * /admin/allmessages:
 *    get:
 *       tags:
 *         - Messages
 *       summary: Get all messages
 *       description: Get all messages sent
 *       operationId: getMessages
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messages:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Message'
 *         '404':
 *           description: No messages found
 *         '500':
 *           description: Internal server error
 *       security:
 *         - {}
 *         - bearerAuth: []
 */
export default router;