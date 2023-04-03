const express=require("express")
const {HotelModel}=require("../model/hotel.model")

const hotelRouter=express.Router()

hotelRouter.get("/",async(req,res)=>{
    let {page}=req.query
    let limit=10
    let skip=(+page-1)*limit
    const hotels=await HotelModel.find().skip(skip).limit(limit)
    res.send(hotels)
})
hotelRouter.get("/search",async(req,res)=>{
    let {q}=req.query
    const hotels=await HotelModel.find({city:{$regex:q,$options:'i'}})
    res.send(hotels)
})

hotelRouter.get("/bed",async(req,res)=>{
    let {q}=req.query
    const hotels=await HotelModel.find({bed:q})
    res.send(hotels)
})

hotelRouter.get("/rating",async(req,res)=>{
    let {q}=req.query
    const hotels=await HotelModel.find({rating:q})
    res.send(hotels)
})

hotelRouter.get("/sort",async(req,res)=>{
    let {q,page}=req.query
    let limit=10;
    let skip=(+page-1)*limit
    let val=q=="l2h"?1:-1
    const hotels=await HotelModel.find().sort({price:val}).skip(skip).limit(limit)
    res.send(hotels)
})



module.exports={hotelRouter}