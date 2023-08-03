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
    gender: {
        type: String,
        required: true
    },
    PCS: {
        type: Number,
        required: true
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
        default: 'NO SHOW ON THE COUNTER',
        required: true
    },
    Seq: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Audience', audienceSchema)