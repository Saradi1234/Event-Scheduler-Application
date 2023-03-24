const express = require('express')

const eventRoutes=require("./routes/eventRoutes")


const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(eventRoutes)


app.get('/', (req, res) => {
    res.send("All Ok.")
})

module.exports = app