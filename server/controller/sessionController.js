const audienceModel = require("../model/audienceModel")
const sessionTypeModel = require("../model/sessionTypeModel")
const seatModel = require("../model/seatModel")
const { seat } = require('../plane/seatMapData')
const fs = require('fs')

const sessionRegistration = async (req, res) => {
    try {
        const { sessionType, date, planeType } = req.body;

        const newSession = new sessionTypeModel({
            sessionType,
            date,
            planeType
        });

        await newSession.save();

        seatRegistration();

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const seatRegistration = async () => {
    for (let i = 0; i < seat.length; i++) {
        const item = seat[i];
        try {
            await new Promise((resolve) => {
                setTimeout(async () => {
                    try {
                        await seatModel.create({
                            location: item
                        });
                        resolve();
                    } catch (error) {
                        console.error(error);
                        resolve();
                    }
                }, 60); // Delay each seat registration by i seconds (1000 milliseconds = 1 second)
            });
        } catch (error) {
            console.error(error);
        }
    }
};

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