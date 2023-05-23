const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('./dbs/init.mongodb')
const {countConnect, checkOverload} = require("./helpers/check.connect")
const app = express()
app.use(morgan("common"))
app.use(helmet())
app.use(compression())
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message:  'welcome to thanbinhshop'
    })
})


module.exports = app