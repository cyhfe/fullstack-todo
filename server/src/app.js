const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')


const {login, signup, protect, logout} = require('./utils/auth')
const userRouter = require('./resource/user/user.router')


const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/todo'
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())


app.post('/login', login)
app.post('/signup', signup)
app.post('/logout', logout)


app.use('/api', protect)
app.use('/api/user', userRouter)


async function start(){
  await mongoose.connect(MONGO_URL);
  console.log('connected to database')
  app.listen(PORT, () => console.log('server running in port: ' + PORT))
}

start()

