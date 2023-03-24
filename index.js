require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 5050
const db_URL = process.env.DATABASE_URL

mongoose.connect(db_URL).then(() => {
    console.log('connected to DB')
    app.listen(port, () => { console.log(`server is live at port :: ${port}`) })
})