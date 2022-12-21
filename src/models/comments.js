import { Schema, model } from 'mongoose';

const schema = Schema({
    name: String,
    content: String,
});
export default model("Comment",schema)