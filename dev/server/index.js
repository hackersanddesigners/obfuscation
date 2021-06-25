


const
  dotenv           = require('dotenv'),
  path             = require('path'),
  express          = require('express'),
  bodyParser       = require('body-parser'),
  fallback         = require('express-history-api-fallback'),
  app              = express(),

  http             = require('http').createServer(app),
  io               = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false
    },
    serveClient: false,
    perMessageDeflate: false,
    transports: ['websocket'],
  }),

  mongoose         = require("mongoose")
  mongoose.Promise = require("bluebird")


dotenv.config()


// DEFAULTS

const

  root             = path.resolve(__dirname, '../front/dist'),
  port             = process.env.PORT || 3090,
  room             = 'obfuscation',
  maxLiveCount     = 200,

  mURL             = "mongodb://localhost",
  mPort            = process.env.MONGOPORT || 27018,
  mOptions         = { useNewUrlParser: true, useUnifiedTopology: true },
  User             = require("./models/User"),
  Message          = require("./models/Message"),


// FUNCTIONS

  getCount = () => (
    io.sockets.adapter.rooms.get(room) ?
    Array.from(io.sockets.adapter.rooms.get(room)).length : 0
  ),

  findUserAndUpdate = (user, status) => {
    User
    .findOneAndUpdate(
      { uid: user.uid },
      user,
      { upsert: true, new: true },
      (err, res) => {
        if (err) console.log(err)
        console.log(`${user.uid} | (${user.name}) | ${status}`)
      }
    )
  },

  findMessageAndUpdate = message => {
    Message
    .findOneAndUpdate(
      { uid: message.uid },
      message,
      { upsert: true, new: true },
      (err, res) => {
        if (err) console.log(err)
        console.log(`${res.authorUID} | (${res.author}) | ${res.content} | sent`)
      }
    )
  },

  findUserAndDelete = user => {
    User
    .findOneAndDelete(
      { uid: user.uid },
      (err, res) => {
        if (err) console.log(err)
        console.log(`${user.uid} | (${user.name}) | deleted`)
      }
    )
  },

  findMessageAndDelete = message => {
    Message
    .findOneAndDelete(
      { uid: message.uid },
      (err, res) => {
        if (err) console.log(err)
        console.log(`${message.authorUID} | (${message.author}) | ${message.content} | deleted`)
      }
    )
  }

let count = getCount()


// EXPRESS CONFIGURATION

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin', '*'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use('/', express.static(root))


// MONGO CONFIGURTION

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
    .then(users => {
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

  app.use(
    fallback(
      'index.html', 
      { 
        root 
      }
    )
  )


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
      if (count < maxLiveCount + 10) {
        io.sockets.emit('count', count)
      }
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


