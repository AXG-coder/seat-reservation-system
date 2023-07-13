const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const mainAppRoutes = require('./Routes/mainAppRoutes')

const app = express();

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

app.use('/api', mainAppRoutes)

app.use('/barcode', express.static('barcode'))
app.use('/plane', express.static('plane'))

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log('connected to mongoDB');
            console.log('app is running');
        })
    })
    .catch((error) => { console.log(error) })