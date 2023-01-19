import Message from "../models/message";
import messageSchema from "../validations/smsValidation";

export class messageController{
    static async sendSms(req,res){
       try{
        const {name,email, sms} =req.body;
        const result = await messageSchema.validateAsync(req.body);
        const message = new Message({name,email,sms});
        await  message.save();
        res.status(200).send(message)
       }catch(error){
        res.send(error.message)
       }
    }
    static async allSms(req,res){
        try{
        const messages = await Message.find();   
        res.status(200).send(messages);
        } catch(error){
                 res.status(404).send(error);
        }
    }
    static async singleSms(req,res){
        try{
            const message = await Message.findOne({_id:req.params.id});
            res.status(200).send(message);
        }
        catch(error){
            res.status(204).send(error)
        }
    }
    static async deletesms(req,res){
        try{
            await Message.deleteOne({_id:req.params.id})
            res.status(204).send({error:"Blog deleted!!!!"})
        } catch{
            res.status(500).send({error:"Blog doesn't exist"})
        }
    }
}