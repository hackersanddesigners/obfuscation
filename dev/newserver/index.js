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
  serveClient: false
})
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")


// DEFAULTS

dotenv.config()

const 
  root = path.resolve(__dirname, '../front/dist'),
  port = process.env.PORT || 3090


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
      console.log(`${res.uid} | (${res.name}) | deleted`) 
    })
  },

  findMessageAndDelete = message => {
    const conditions = { uid: message.uid }
    Message.findOneAndDelete(conditions, (err, res) => {
      if (err) console.log(err)
      console.log(`${res.uid} | ${res.author}: ${res.content} | deleted`) 
    })
  }


mongoose.connect(`${mURL}:${mPort}`, mOptions)

mongoose.connection.on('error', () => {
  console.log('Connection to MongoDB failed.')
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')


  // REQUESTS

  app.get('/users', async (req, res) => {
    User
      .find({})
      .then(users  =>  {
        // console.log(users)
        res.json(users)
      })
  })

  app.get('/messages', async (req, res) => {
    Message
      .find({})
      .then(messages  =>  {
        // console.log(messages)
        res.json(messages)
      })
  })


  // IMPORTANT TO SET THE FALLBACK AFTER THE REQUESTS

  app.use(fallback('index.html', { root }))


  // SOCKETS

  io.on('connection', socket => {
    
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
      io.sockets.emit('position', position)
    })

    socket.on('typing', text => {
      io.sockets.emit('typing', text)
    })

    socket.on('color', color => {
      io.sockets.emit('color', color)
    })

    socket.on('message', message => {
      io.sockets.emit('message', message)
      message.deleted == true ?
        findMessageAndDelete(message) :
        findMessageAndUpdate(message)
    })


  })





  //   const 
  //   axios = require('axios'),
  //   importURL = process.env.IMPORTURL,
  //   oldUsersCollection = 'users',
  //   oldMessagesCollection = 'messages'

  // if (importURL) {
  //   importOldUsers(importURL, oldUsersCollection)
  //   importOldMessages(importURL, oldMessagesCollection)
  // }
  
  // function importOldUsers( oldURL, oldCollection ) {
  //   axios
  //     .get(importURL + oldCollection)
  //     .then(result => {
  //       const users = result.data
  //       for (let uid in users) {
  //         const user = users[uid]
  //         if (
  //           (user.uid) && 
  //           !(user.deleted == true) &&
  //           !(user.name.includes(user.uid))
  //         ) {
  //           findUserAndUpdate(user, 'imported')
  //         } else {
  //           findUserAndDelete(user)
  //         }
  //       }
  //     })
  //     .catch(error => console.log(error))
  // }

  // function importOldMessages( oldURL, oldCollection ) {
  //   axios
  //     .get(importURL + oldCollection)
  //     .then(result => {
  //       const messages = result.data
  //       for (let uid in messages) {
  //         const message = messages[uid]
  //         if (
  //           (message.uid) && 
  //           !(message.deleted == true)
  //         ) {
  //           findMessageAndUpdate(message)
  //         } else {
  //           findMessageAndDelete(message)
  //         }
  //       }
  //     })
  //     .catch(error => console.log(error))
  // }




  // HTTP SERVER

  http.listen(port, () => {
    console.log('')
    console.log('**********************************************************')
    console.log('Your app is listening on port ' + port)
    console.log('**********************************************************')
    console.log('')
  })

})
