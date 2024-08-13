import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    name:{
        type:String,
        
    },
    userName:{
        type:String,
       
    },
    password:{
        type:String,
       
    },
    email:
    {
        type:String,
    }
})
export default mongoose.model('registers',userSchma);