const 
  mongoose = require('mongoose'),
  Schema   = mongoose.Schema,
  messages = mongoose.connection.useDb('messages'),

  Message = messages.model("Message", 
    new Schema({
      uid: String,
      author: String,
      authorUID: String,
      content: String,
      time: Number,
      color: String,
      x: Number,
      y: Number,
      location: String,
      censored: Boolean,
      deleted: Boolean,
      announcement: Boolean,
      navigation: Boolean,
      stream: Boolean
    })
  )

module.exports = Message

