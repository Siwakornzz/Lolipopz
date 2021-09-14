const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('./utils/db')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnection = require('./utils/db')
const passport = require('passport')
require('./utils/authStategies/localStrategy')
const authMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static("public"));
// app.set('trust proxy', 1)
app.use(session({
  secret: '4ad8e54c95800e9668650ce54b99829e4a5b5d53',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new MongoStore({ mongooseConnection: mongoDbConnection })
}))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', (req, res) => {
  console.log('User:', req.user)
  return res.render('index')
})

app.get('/home', authMiddleware, (req, res) => {
  res.send(`welcome ${req.user.username}`)
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
