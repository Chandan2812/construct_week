const mongoose=require("mongoose")

const hotelSchema=mongoose.Schema({
   name:String,
   address:String,
   city:String,
   bed:Number,
   rating:String,
   image:String,
   price:Number
})

const HotelModel=mongoose.model("hotel",hotelSchema)

module.exports={HotelModel}