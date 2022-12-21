import { Router } from "express";
import {messageController} from "../controllers/smsController";
const router=Router();


router.post('/sendSms', messageController.sendSms);
router.get('/admin/allMessage',messageController.allSms)
export default router;