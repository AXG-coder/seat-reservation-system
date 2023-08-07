const express = require("express");
const { sessionRegistration, IsThereASession, deleteSessionAndAudience, printCounter } = require("../controller/sessionController");
const { NameRegistration, NameRegistrationUsingExcel } = require("../controller/AudienceRegistrationController");
const { getOneOfAudience, editInfo, getOneOfAudienceByBarcode,
    getAllAudience, getOneOfAudienceForEditInfo, getAllAudienceForSearchEngine,
    deleteAudience, getOneOfAudienceBySeq } = require("../controller/audienceControler");
const { authKey } = require("../auth/apiKey");
const { validKey } = require("../controller/apiKeyControler");
const { getSeatState, getPlanesTypes } = require("../controller/SeatControler");

const router = express.Router()

router.get('/IsThereASession', authKey(process.env.EMPLOYEE_KEY), IsThereASession)

router.delete('/deleteSessionAndAudience', authKey(process.env.ADMIN_KEY), deleteSessionAndAudience) // admin

router.post('/sessionRegistration', authKey(process.env.ADMIN_KEY), sessionRegistration) // admin

router.post('/NameRegistration', authKey(process.env.EMPLOYEE_KEY), NameRegistration)

router.post('/NameRegistrationUsingExcel', authKey(process.env.EMPLOYEE_KEY), NameRegistrationUsingExcel)

router.post("/getOneOfAudienceForEditInfo", authKey(process.env.EMPLOYEE_KEY), getOneOfAudienceForEditInfo)

router.post("/getOneOfAudience", authKey(process.env.EMPLOYEE_KEY), getOneOfAudience)

router.get("/getAllAudience", authKey(process.env.EMPLOYEE_KEY), getAllAudience)

router.get("/getAllAudienceForSearchEngine", authKey(process.env.EMPLOYEE_KEY), getAllAudienceForSearchEngine)

router.post("/getOneOfAudienceByBarcode", authKey(process.env.EMPLOYEE_KEY), getOneOfAudienceByBarcode)

router.post("/getOneOfAudienceBySeq", authKey(process.env.EMPLOYEE_KEY), getOneOfAudienceBySeq)

router.post("/editInfo", authKey(process.env.EMPLOYEE_KEY), editInfo)

router.get("/validKey", authKey(process.env.EMPLOYEE_KEY), validKey)

router.get("/getSeatState", authKey(process.env.EMPLOYEE_KEY), getSeatState)

router.get("/getPlanesTypes", authKey(process.env.EMPLOYEE_KEY), getPlanesTypes)

router.get("/printConter", authKey(process.env.EMPLOYEE_KEY), printCounter)

router.delete('/deleteAudience', authKey(process.env.EMPLOYEE_KEY), deleteAudience)

module.exports = router