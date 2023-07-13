const mongoose = require('mongoose')

const Schema = mongoose.Schema

const audienceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seatLocation: {
        type: String,
        required: true,
        unique: true,
    },
    size: {
        type: Number,
        required: true
    },
    barcode: {
        type: Number,
        required: true,
        unique: true

    },
    state: {
        type: String,
        default: 'No show',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Audience', audienceSchema)