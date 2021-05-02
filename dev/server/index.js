const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  },
  serveClient: false,
  perMessageDeflate: false,
  transports: ['websocket'],
})
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")


// DEFAULTS

dotenv.config()

const 
  root = path.resolve(__dirname, '../front/dist'),
  port = process.env.PORT || 3090,
  room = 'obfuscation',
  maxLiveCount = 250,
  getCount = () => (
    io.sockets.adapter.rooms.get(room) ?
    Array.from(io.sockets.adapter.rooms.get(room)).length : 0
  )

let count = getCount()


// EXPRESS CONFIGURATION

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', express.static(root))


// MONGOOSE CONFIGURATION & FUNCTIONS

const
  mURL = "mongodb://localhost",
  mPort = process.env.MONGOPORT || 27018,
  mOptions = { useNewUrlParser: true, useUnifiedTopology: true },
  User = require("./models/User"),
  Message = require("./models/Message"),
  
  findUserAndUpdate = (user, status) => {
    const 
      filter = { uid: user.uid },
      update = user,
      options = { upsert: true, new: true }
    User.findOneAndUpdate(filter, update, options, (err, res) => {
      if (err) console.log(err)
      console.log(`${res.uid} | (${res.name}) | ${status}`) 
    })
  },

  findMessageAndUpdate = message => {
    const 
      filter = { uid: message.uid },
      update = message,
      options = { upsert: true, new: true }
    Message.findOneAndUpdate(filter, update, options, (err, res) => {
      if (err) console.log(err)
      console.log(`${res.uid} | ${res.author}: ${res.content} | sent`) 
    })
  },

  findUserAndDelete = user => {
    const conditions = { uid: user.uid }
    User.findOneAndDelete(conditions, (err, res) => {
      if (err) console.log(err)
      console.log(`${user.uid} | (${user.name}) | deleted`) 
    })
  },

  findMessageAndDelete = message => {
    const conditions = { uid: message.uid }
    Message.findOneAndDelete(conditions, (err, res) => {
      if (err) console.log(err)
      console.log(`${message.uid} | ${message.author}: ${message.content} | deleted`) 
    })
  }


mongoose.connect(`${mURL}:${mPort}`, mOptions)
mongoose.connection.on('error', () => { 
  console.log('Failed to connect to MongoDB') 
})
mongoose.connection.once('open', () => {
  console.log('')
  console.log('**************************************')
  console.log('* Connected to MongoDB on port ' + mPort + ' *')


  // REQUESTS

  app.get('/users', async (req, res) => {
    User
      .find({})
      .then(users  =>  {
        res.json(users)
      })
  })

  app.get('/messages', async (req, res) => {
    Message
      .find({})
      .then(messages  =>  {
        res.json(messages)
      })
  })


  // IMPORTANT TO SET THE FALLBACK AFTER THE REQUESTS

  app.use(fallback('index.html', { root }))


  // SOCKETS

  io.on('connection', socket => {

    socket.join(room)

    count = getCount()
    console.log(socket.id, 'connected, total:', count)

    if (count < maxLiveCount + 10) {
      io.sockets.emit('count', count)
    }
    
    socket.on('user', user => {
      io.sockets.emit('user', user)
      user.deleted == true ?
        findUserAndDelete(user) :
        findUserAndUpdate(user, 'connected')
    })

    socket.on('appearance', user => {
      io.sockets.emit('appearance', user)
      const status = user.connected == false ? 'disconnected' : 'appearance'
      findUserAndUpdate(user, status)
    })

    socket.on('block', user => {
      io.sockets.emit('block', user)
      findUserAndUpdate(user, 'blocked')
    })

    socket.on('moderator', user => {
      io.sockets.emit('moderator', user)
      findUserAndUpdate(user, 'moderator')
    })
    
    socket.on('position', position => {
      if (getCount() < maxLiveCount) {
        io.sockets.emit('position', position)
      }
    })
    socket.on('typing', text => {
      if (getCount() < maxLiveCount) {
        io.sockets.emit('typing', text)
      }
    })
    socket.on('color', color => {
      if (getCount() < maxLiveCount) {
        io.sockets.emit('color', color)
      }
    })

    socket.on('message', message => {
      io.sockets.emit('message', message)
      message.deleted == true ?
        findMessageAndDelete(message) :
        findMessageAndUpdate(message)
    })

    socket.on('disconnect', reason => {
      count = getCount()
      console.log(socket.id, 'disconnect:', reason, 'total:', count)
      io.sockets.emit('count', count)

    })


  })



  // HTTP SERVER

  http.listen(port, () => {
    console.log('**************************************')
    console.log('* Your app is listening on port ' + port + ' *')
    console.log('**************************************')
    console.log('')
  })

})
