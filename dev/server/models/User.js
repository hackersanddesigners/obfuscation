const 
  mongoose = require("mongoose"),
  Schema   = mongoose.Schema,
  users    = mongoose.connection.useDb('users'),

  User = users.model("User", 
    new Schema({
      uid: String,
      name: String,
      color: String,
      x: Number,
      y: Number,
      typing: String,
      messageLifetime: Number,
      connected: Boolean,
      moderator: Boolean,
      deleted: Boolean,
      blocked: Boolean
    })
  )

module.exports = User

