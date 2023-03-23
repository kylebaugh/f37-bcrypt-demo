// Require packages
const express = require('express')
const cors = require('cors')

// Start my app instance
const app = express()

// Setup my middleware
app.use(express.json())
app.use(cors())

// Endpoints

const {createMessage} = require('./controller')

app.post('/api/messages', createMessage)


// Open door/port to server
app.listen(4004, () => console.log('Avengers assemble on port 4004!'))