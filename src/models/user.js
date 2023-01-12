import { Schema, model} from "mongoose";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const  userSchema = new Schema({
email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// function to encrypt password
userSchema.pre('save', async function(next){
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    }
  );
  
//function to Check the credentials
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
const User = mongoose.model("User",userSchema)
export default User;