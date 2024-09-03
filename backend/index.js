const connectToMongo = require('./db')
const express = require('express')

connectToMongo()

const app = express()
var cors = require('cors')
const port = 5000

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Parth Trivedi')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNoteBook Backend listening on port http://localhost:${port}`)
})
