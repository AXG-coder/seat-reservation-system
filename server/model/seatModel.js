const mongoose = require('mongoose');

const Schema = mongoose.Schema

const seatSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Seat', seatSchema)