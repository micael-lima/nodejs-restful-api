'use strict'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes'
import database from './config/database'

const app = express()

const configureExpress = () => {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use('/', routes)

  return app
}

export default () => database.connect().then(configureExpress)
