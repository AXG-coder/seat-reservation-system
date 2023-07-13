const { set } = require("mongoose")
const audienceModel = require("../model/audienceModel")

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
    try {
        const { _id, seatLocation, size } = req.body;

        await audienceModel.findByIdAndUpdate(_id, {
            seatLocation: seatLocation,
            size: size,
            state: 'Missing'
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getOneOfAudience, getOneOfAudienceByBarcode, editInfo, getAllAudience }