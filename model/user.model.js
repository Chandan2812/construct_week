const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    pass:{type:String,required:true},
    phone:{type:String,required:true}
})

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}