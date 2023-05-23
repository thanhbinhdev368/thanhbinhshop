const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('./dbs/init.mongodb')
const indexRouter = require("./routes")
const {countConnect, checkOverload} = require("./helpers/check.connect")
const app = express()
app.use(express.json())
app.use(express.urlencoded, {
    extended: true
})
app.use(morgan("common"))
app.use(helmet())
app.use(compression())
app.use('/', indexRouter)
module.exports = app