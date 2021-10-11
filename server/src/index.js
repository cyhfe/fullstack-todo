// 环境变量
const NODE_ENV = process.env.NODE_ENV || "development"
require('dotenv').config({ path: `.env.${NODE_ENV}` })

const http = require('http')
const app = require('./app')

const server = http.createServer(app)


