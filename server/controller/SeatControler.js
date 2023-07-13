const seatModel = require("../model/seatModel")

const getSeatState = async (req, res) => {
    try {
        const seat = await seatModel.find()
        res.status(200).json(seat)
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getSeatState }