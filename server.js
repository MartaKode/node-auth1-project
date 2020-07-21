const express = require('express')
const helmet = require('helmet')
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session) //you get a function out of that, thus uppercase name
const cors = require('cors') // -> for React App

const dbConnection = require('./data/connection')

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const authenticate = require('./auth/auth-middleware')

const server = express()


const sessionConfiguration = {
    name: 'cookie', //default value is sid --> session id
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe', //key for encryption
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false,//send the cookie only over https (secure connections)
        htttpOnly: true,// prevent JS code on client from accessing this cookie; ALWAYS true
        userId: 3
    },
    resave: false, //if there are no changes, should I still save it?
    saveUninitialized: true, //read docs, its related to GDPR compliance
    store: new KnexSessionStore({
        knex: dbConnection, //how can I connect to the database to save things there?
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true, //if table doesnt exist, create it
        clearInterval: 1000 * 60 * 30,// time to check and remove expired sessions from database --> every 30 mins in this case
    }),
}

server.use(helmet())
server.use(session(sessionConfiguration))
server.use(express.json())
server.use(cors({origin: ["http://localhost:3000", "http://localhost:8000"], credentials: true})) // -> for React App

server.use('/api/users', authenticate, usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ api: 'is up and running!' })
})

module.exports = server
