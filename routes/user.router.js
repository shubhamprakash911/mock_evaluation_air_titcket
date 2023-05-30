const express = require("express")
const { userModel } = require("../model/user.model")
const userRouter = express.Router()
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



//register user
userRouter.post("/register", async (req, res) => {
    try {
      const { name,email, password } = req.body
      const user= await userModel.find({email});
      if(user.length==0){
        const hashPass = await bcrypt.hash(password, +process.env.saltRound);
        await new userModel({ name,email, password: hashPass }).save()
        res.status(201).send({ "msg": "new user has been register" })
      }else{
        res.status(409).send({"msg":"User already exist, please login"})

      }

    } catch (error) {
      res.status(400).send({ error: error.message })
      console.log(error)
    }
  })


//login user
userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await userModel.findOne({ email })
      if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
          const token = await jwt.sign({ userId: user._id }, process.env.secretKey)
          res.status(200).send({ "msg": "login successfull", "token": token })
        } else {
          res.status(400).send({ "msg": "wrong credential" })
        }
      }else {
        res.status(401).send({"msg":"user not found"})
      }
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  })

  module.exports={userRouter}