import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true
    },
    credits:{
        type:Number,
        default:100
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default UserSchema