const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
    sessionType: {
        type: String,
        required: true
    },
    fromTo: {
        type: String,
        required: true
    },
    planeType: {
        type: String,
        required: true
    },
    date: {
        // we have as string bec want the time to be like this 2023/7/9
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('session', sessionSchema)