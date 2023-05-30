const mongoose= require("mongoose")

const bookSchema= mongoose.Schema({
    userId:{type:String,require:true},
    flightId:{type:String,require:true}
},{versionKey:false})

const bookModel=mongoose.model("booking",bookSchema);

module.exports={bookModel}