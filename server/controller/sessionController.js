const audienceModel = require("../model/audienceModel")
const sessionTypeModel = require("../model/sessionTypeModel")
const seatModel = require("../model/seatModel")
const { seat } = require('../plane/seatMapData')
const fs = require('fs')

const sessionRegistration = async (req, res) => {
    try {
        const { sessionType, fromTo, date, planeType } = req.body;

        const newSession = new sessionTypeModel({
            sessionType,
            fromTo,
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

const printCounter = async (req, res) => {
    try {
        const { sessionType } = req.body;

        // Find the document based on sessionType and update the printCounter field
        const updatedSessionType = await sessionTypeModel.findOneAndUpdate(
            { sessionType },
            { $inc: { printCounter: 1 } }, // Increment the printCounter field by 1
            { new: true } // Return the updated document
        );

        res.send(updatedSessionType);
    } catch (error) {
        console.error(error);
        // Handle error
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    sessionRegistration,
    IsThereASession,
    deleteSessionAndAudience,
    printCounter
}