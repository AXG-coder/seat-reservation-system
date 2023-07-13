const express = require("express");
const { sessionRegistration, IsThereASession, deleteSessionAndAudience } = require("../controller/sessionController");
const { NameRegistration } = require("../controller/AudienceRegistrationController");
const { getOneOfAudience, editInfo, getOneOfAudienceByBarcode, getAllAudience } = require("../controller/audienceControler");
const { authKey } = require("../auth/apiKey");
const { validKey } = require("../controller/apiKeyControler");
const { getSeatState } = require("../controller/SeatControler");

const router = express.Router()

router.get('/IsThereASession', authKey(process.env.EMPLOYEE_KEY), IsThereASession)

router.delete('/deleteSessionAndAudience', authKey(process.env.ADMIN_KEY), deleteSessionAndAudience) // admin

router.post('/sessionRegistration', authKey(process.env.ADMIN_KEY), sessionRegistration) // admin

router.post('/NameRegistration', authKey(process.env.ADMIN_KEY), NameRegistration) // admin

router.post("/getOneOfAudience", authKey(process.env.EMPLOYEE_KEY), getOneOfAudience)

router.get("/getAllAudience", authKey(process.env.EMPLOYEE_KEY), getAllAudience)

router.post("/getOneOfAudienceByBarcode", authKey(process.env.ADMIN_KEY), getOneOfAudienceByBarcode)

router.post("/editInfo", authKey(process.env.EMPLOYEE_KEY), editInfo)

router.get("/validKey", authKey(process.env.EMPLOYEE_KEY), validKey)

router.get("/getSeatState", authKey(process.env.EMPLOYEE_KEY), getSeatState)

module.exports = router