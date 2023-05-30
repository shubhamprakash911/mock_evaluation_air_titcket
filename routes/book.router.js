const express = require('express');
const {bookModel} = require("../model/book.model")
const { authantication } = require('../middleware/authantication.middleware');
const bookingRouter = express.Router();

bookingRouter.get('/api/dashboard',authantication, async (req, res) => {
    try {
        const data = await bookModel.find({ userId : req.body.userId });
        res.send(data)
    } catch {
        res.send('Error')
    }
})


bookingRouter.post('/api/booking',authantication ,async (req, res) => {
    try {
        const { userId, flightId } = req.body;
        const newBooking =await new bookModel({ userId, flightId }).save()
        res.status(200).send({
            'msg': 'Your flight has been booked.',
            "data":newBooking
        })
    } catch {
        res.status(404).send({
            'msg': 'error in booking a new flight.'
        })
    }
})



module.exports = { bookingRouter };