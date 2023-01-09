import { Schema, model } from "mongoose";

const schema = Schema({
    title: String,
    content: String,
    image: {
        url: { type: String },
      },
    likes: [],
    comment:[],
});
export default model("Blog",schema)
