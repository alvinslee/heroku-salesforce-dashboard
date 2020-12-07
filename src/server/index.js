const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3001'
  }
})
 
const jsforce = require('jsforce')

const PORT = 3002;
const CHANNEL = '/data/ChangeEvents'

require('dotenv').config()
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env

const exitOnError = (err) => {
  console.error(err)
  process.exit(-1)
}

if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
  exitOnError('Missing credentials for jsforce connection. Check .env file.')
}

const connection = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL
})

connection.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err) => {
  if (err) {
    exitOnError(err)
  }

  console.log(`subscribing to channel: ${CHANNEL}`)
  connection.streaming.topic(CHANNEL).subscribe(data => {
    const { event, payload } = data
    const { entityName, changeType } = payload.ChangeEventHeader
    console.log(`cdc message received [${event.replayId}]: ${entityName}:${changeType}`)
    io.emit('cdc', payload)
  })
})

io.on('connection', (socket) => {
  console.log(`client connected: ${socket.id}`)
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
