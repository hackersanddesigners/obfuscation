const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
const bodyParser = require('body-parser')
const app = express()
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  },
  serveClient: false
})



// DEFAULTS

dotenv.config()

const root = path.resolve(__dirname, 'front/dist')
const port = process.env.PORT || 3090



// EXPRESS CONFIGURATION

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', express.static(root))



// DB CONFIGURATION

const adapter = new FileAsync('./.data/db.json')

low(adapter).then(db => {



  // REQUESTS

  app.get('/users', async (req, res) => {
    let users = db.get('users')
    users = users.filter(u => !u.deleted)
    res.send(users)
  })

  app.get('/messages', async (req, res) => {
    const messages = db.get('messages')
    // .filter(m => m.deleted === false)
    res.send(messages)
  })

  app.use(fallback('index.html', { root }))




  // SOCKETS

  io.on('connection', (socket) => {
    
    socket.on('user', (user) => {
      const ip = 
          socket.handshake.headers['x-forwarded-for'] || 
          socket.handshake.address.address
      console.log(`${user.uid} | (${user.name}) | ${ip} | ${user.deleted}`)
      io.sockets.emit('user', user)
      db.set(`users[${user.uid}]`, user)
        .write()
    })

    socket.on('message', (message) => {
      io.sockets.emit('message', message)
      db.set(`messages[${message.uid}]`, message)
        .write()
    })

    socket.on('position', (position) => {
      io.sockets.emit('position', position)
      // db.set(`users[${position.uid}].x`, position.x)
      //   .set(`users[${position.uid}].y`, position.y)
      //   .set(`users[${position.uid}].connected`, position.connected)
      //   .write()
    })

    socket.on('typing', (text) => {
      io.sockets.emit('typing', text)
      // db.set(`users[${user.uid}]`, user)
      //   .write()
    })

    socket.on('color', (color) => {
      io.sockets.emit('color', color)
    })

    socket.on('appearance', (user) => {
      io.sockets.emit('appearance', user)
      if (user.connected == false) {
        console.log(user.uid, 'disconnected')
      }
      db.set(`users[${user.uid}].name`, user.name)
        .set(`users[${user.uid}].color`, user.color)
        .set(`users[${user.uid}].x`, user.x)
        .set(`users[${user.uid}].y`, user.y)
        .set(`users[${user.uid}].connected`, user.connected ? user.connected : false)
        .set(`users[${user.uid}].messageLifetime`, user.messageLifetime)
        .write()
    })

    socket.on('block', (user) => {
      io.sockets.emit('block', user)
      db.set(`users[${user.uid}].blocked`, true)
        .write()
    })

    socket.on('moderator', (user) => {
      io.sockets.emit('moderator', user)
      db.set(`users[${user.uid}].moderator`, true)
        .write()
    })



  })



  return db.defaults({ 
    users: {}, 
    messages: {}, 
  }).write()

})


    
http.listen(port, () => {
  console.log('')
  console.log('**********************************************************')
  console.log('Your app is listening on port ' + port)
  console.log('**********************************************************')
  console.log('')
})
