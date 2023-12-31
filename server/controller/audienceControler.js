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

const getOneOfAudienceForEditInfobySeq = async (req, res) => {
    const { Seq } = req.body

    const oneOfAudience = await audienceModel.findOne({ Seq })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}

const getOneOfAudience = async (req, res) => {
    const { name } = req.body

    const oneOfAudience = await audienceModel.findOneAndUpdate({ name }, { state: 'ACCEPTED' })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}

const getOneOfAudienceByBarcode = async (req, res) => {
    const { barcode } = req.body

    const oneOfAudience = await audienceModel.findOneAndUpdate({ barcode }, { state: 'ACCEPTED' })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);

}

const getOneOfAudienceBySeq = async (req, res) => {
    const { Seq } = req.body

    const oneOfAudience = await audienceModel.findOneAndUpdate({ Seq }, { state: 'ACCEPTED' })

    if (!oneOfAudience) {
        res.sendStatus(404)
        return;
    }

    res.send(oneOfAudience);
}


const getAllAudience = async (req, res) => {
    try {
        const Audience = await audienceModel.find();

        const AudienceStateGroup = Audience.reduce((acc, curr) => {
            if (!acc[curr.state]) {
                acc[curr.state] = [];
            }
            acc[curr.state].push(curr);
            return acc;
        }, {});

        const sortedData = Object.entries(AudienceStateGroup);

        const acceptGroup = sortedData.find(([state]) => state === "ACCEPTED");
        if (acceptGroup) {
            sortedData.splice(sortedData.indexOf(acceptGroup), 1);
            sortedData.unshift(acceptGroup);
        }

        res.status(200).json(sortedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAllAudienceForSearchEngine = async (req, res) => {
    const Audience = await audienceModel.find().select('name barcode')

    res.status(200).json(Audience)
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
        const { _id, seatLocation, size, PCS, Seq } = req.body;


        await audienceModel.findByIdAndUpdate(_id, {
            seatLocation: seatLocation,
            size: size,
            PCS: PCS,
            state: 'NO SHOW ON THE GATE',
            Seq: Seq
        });

        await seatModel.findOneAndUpdate({ location: seatLocation }, {
            reserved: true
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAudience = async (req, res) => {

    try {
        const { _id } = req.headers
        await audienceModel.findByIdAndRemove({ _id })
        res.sendStatus(200)
    }
    catch (error) {
        res.status(404).json(error)
    }

}


module.exports = {
    getOneOfAudience, getOneOfAudienceForEditInfo,
    getOneOfAudienceForEditInfobySeq,
    getOneOfAudienceByBarcode, getOneOfAudienceBySeq,
    editInfo, getAllAudience,
    getAllAudienceForSearchEngine, deleteAudience
}