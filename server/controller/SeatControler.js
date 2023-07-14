const seatModel = require("../model/seatModel");
const { planeType } = require("../plane/seatMapData");

const getSeatState = async (req, res) => {
    try {
        const seat = await seatModel.find().sort({ createdAt: -1 })
        res.status(200).json(seat)
    } catch (error) {
        res.status(400).json(error);
    }
}

const getPlanesTypes = (req, res) => {
    try {
        res.status(200).json(planeType)
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getSeatState, getPlanesTypes }