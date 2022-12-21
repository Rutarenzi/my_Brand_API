import Message from "../models/message";
import messageSchema from "../validations/smsValidation";

export class messageController{
    static async sendSms(req,res){
       try{
        const {name,email, sms} =req.body;
        const result = await messageSchema.validateAsync(req.body);
        const message = new Message({name,email,sms});
        await  message.save();
        res.send(message)
       }catch(error){
        res.send(error.message)
       }
    }
    static async allSms(req,res){
        const messages = await Message.find();   
        res.send(messages);
    }
}