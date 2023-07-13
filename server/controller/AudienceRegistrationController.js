const audienceModel = require('../model/audienceModel');
const bwipjs = require('bwip-js');
const fs = require('fs');

const NameRegistration = (req, res) => {
    const { name } = req.body;
    const barcode = String(Math.floor(Math.random() * 10000000000));

    const newRegist = new audienceModel({
        name: name,
        seatLocation: `N/A ${barcode.slice(0, 3)}`,
        size: 0,
        barcode: barcode,
    });

    newRegist
        .save()
        .then(() => {
            generateBarcode(barcode, (err, filename) => {
                if (err) {
                    console.log('Error generating barcode:', err);
                    return res.sendStatus(500);
                }

                res.sendStatus(200);
            });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

function generateBarcode(ticketData, callback) {
    const opts = {
        bcid: 'code128',
        text: ticketData,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
    };

    const folderName = 'barcode';

    // Create the "barcode" folder if it doesn't exist
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    bwipjs.toBuffer(opts, (err, png) => {
        if (err) {
            console.log('Error generating barcode:', err);
            return callback(err);
        }

        // Save the barcode image to the "barcode" folder
        const filename = `${folderName}/${ticketData}.png`;
        fs.writeFileSync(filename, png);

        // Return the barcode image filename in the callback
        callback(null, filename);
    });
}

module.exports = {
    NameRegistration,
};