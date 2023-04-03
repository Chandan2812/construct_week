const express=require("express")
const {UserModel}=require('../model/User.model')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {fname,lname,email,pass,phone}=req.body
    if(fname!==""&& lname!=""&& email!=""&& pass!="" && phone!="")
    {
        try {
            bcrypt.hash(pass,5, async (err,pass)=>{
                const user=new UserModel({fname,lname,email,pass,phone})
                await user.save()
            } )
            
            res.send({msg:"new user has been registered"})
            
        } catch (error) {
            res.send(error.message)
        }
    }
    else{
        res.send("all fields are required")
    }
    
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    
    try {
        const user=await UserModel.find({email})
        
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    console.log(user[0].fname)
                    res.send({msg:"logged in",token:token,fname:user[0].fname,lname:user[0].lname})
                } 
                else{
                    res.send({msg:"Wrong credentials"})
                }
            })
            
        }
        else{
            res.send({msg:"Wrong credentials"})
        }
    } catch (error) {
        res.send(error.message)
    }   
})

module.exports={userRouter}