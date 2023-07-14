const { set } = require("mongoose")
const audienceModel = require("../model/audienceModel")
const seatModel = require("../model/seatModel")

const getOneOfAudienceForEditInfo = async (req, res) => {
    const { name } = req.body

    const oneOfAudience = await audienceModel.findOne({ name })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}
const getOneOfAudience = async (req, res) => {
    const { name } = req.body

    const oneOfAudience = await audienceModel.findOneAndUpdate({ name }, { state: 'Accept' })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}

const getOneOfAudienceByBarcode = async (req, res) => {
    const { barcode } = req.body

    const oneOfAudience = await audienceModel.findOneAndUpdate({ barcode }, { state: 'Accept' })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}


const getAllAudience = async (req, res) => {
    const Audience = await audienceModel.find()

    AudienceStateGroup = Audience.reduce((acc, curr) => {
        if (!acc[curr.state]) {
            acc[curr.state] = []
        }
        acc[curr.state].push(curr)
        return acc
    }, {})

    res.status(200).json(Object.entries(AudienceStateGroup))
}



const editInfo = async (req, res) => {
    const { _id } = req.body;
    const removeOldSeat = await audienceModel.findById({ _id })
    if (!removeOldSeat.seatLocation.includes("N/A")) {
        await seatModel.findOneAndUpdate({ location: removeOldSeat.seatLocation }, {
            reserved: false
        });
    }
    try {
        const { _id, seatLocation, size } = req.body;


        await audienceModel.findByIdAndUpdate(_id, {
            seatLocation: seatLocation,
            size: size,
            state: 'Missing'
        });

        await seatModel.findOneAndUpdate({ location: seatLocation }, {
            reserved: true
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getOneOfAudience, getOneOfAudienceForEditInfo, getOneOfAudienceByBarcode, editInfo, getAllAudience }