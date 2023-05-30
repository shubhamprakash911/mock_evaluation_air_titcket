const express = require("express");
const { flighModel } = require("../model/flight.model");
const flightRouter= express.Router();

//add flight
flightRouter.post("/",async (req,res)=>{
  try {
      await new flighModel(req.body).save();
      res.status(200).send({"msg":"flight added successfully"})
  } catch (error) {
    res.status(400).send({ error: error.message })
    console.log(error)
  }
})

//get all flight
flightRouter.get("/",async (req,res)=>{
    try {
        const flightData=await flighModel.find()
        res.status(200).send(flightData)
    } catch (error) {
      res.status(400).send({ error: error.message })
      console.log(error)
    }
  })



  //get flight by id
flightRouter.get("/:id",async (req,res)=>{
    try {
        const flightData=await flighModel.findById({_id:req.params.id})
        res.status(200).send(flightData)
    } catch (error) {
      res.status(400).send({ error: error.message })
      console.log(error)
    }
  })




//update flight by id
flightRouter.patch("/:id",async (req,res)=>{
    try {
        const flightData=await flighModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).send({"msg":"flight updatated successfully"})
    } catch (error) {
      res.status(400).send({ error: error.message })
      console.log(error)
    }
  })



  //delete flight by id
flightRouter.delete("/:id",async (req,res)=>{
    try {
        const flightData=await flighModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({"msg":"flight deleted successfully"})
    } catch (error) {
      res.status(400).send({ error: error.message })
      console.log(error)
    }
  })


module.exports={flightRouter}