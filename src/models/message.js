import { Schema, model } from 'mongoose';

const schema = Schema({
    name: String,
    email: String,
    sms: String
});
export default model("Message",schema)