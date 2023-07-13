const audienceModel = require("../model/audienceModel")
const sessionTypeModel = require("../model/sessionTypeModel")
const seatModel = require("../model/seatModel")
const seatMapData = require('../plane/seatMapData')
const fs = require('fs')

const sessionRegistration = (req, res) => {
    try {
        const { sessionType, date, planeType } = req.body

        const newSession = new sessionTypeModel({
            sessionType,
            date,
            planeType
        })

        newSession.save()
            .then(() => {
                seatRegistration()
                res.sendStatus(200)
            })
            .catch((error) => { res.sendStatus(400).json(error) })
    } catch (error) {
        res.sendStatus(400).json(error)
    }
}

const seatRegistration = () => {
    seatMapData.map((iteam) => {
        const seat = new seatModel({
            location: iteam
        })
        seat.save()
            .catch((error) => { console.error(error) })
    })
}

const IsThereASession = async (req, res) => {
    const session = await sessionTypeModel.findOne()
    if (!session) {
        res.sendStatus(404)
        return;
    }
    res.status(200).json(session)
}

const deleteSessionAndAudience = async (req, res) => {
    try {
        await sessionTypeModel.deleteMany()
        await audienceModel.deleteMany()
        await seatModel.deleteMany()
        if (fs.existsSync('barcode')) {
            fs.rmSync('barcode', { recursive: true });
        }
        res.sendStatus(200)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    sessionRegistration,
    IsThereASession,
    deleteSessionAndAudience
}