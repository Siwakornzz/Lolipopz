const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1) 
app.use(session({
  secret: '4ad8e54c95800e9668650ce54b99829e4a5b5d53',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/',authRoutes)

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Server Running at port 3000')
})

module.exports = app
