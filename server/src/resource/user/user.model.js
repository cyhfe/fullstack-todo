const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = new model('User', UserSchema)