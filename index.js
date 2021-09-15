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
const flasherMiddleware = require('./middleware/flasherMiddleware')
const isloginMiddleware = require('./middleware/isloginMiddleware')
const isadminMiddleware = require('./middleware/isadminMiddleware')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static("public"));
// app.set('trust proxy', 1)
app.use(session({
  secret: '4ad8e54c95800e9668650ce54b99829e4a5b5d53',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
  store: new MongoStore({ mongooseConnection: mongoDbConnection })
}))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', isloginMiddleware,flasherMiddleware, (req, res) => {
  console.log(req.method)
  console.log('User:', req.user)
  return res.render('index')
})

app.get('/topup',(req, res) => {
  return res.render('topup')
})

app.get('/home',authMiddleware, (req, res) => {
  if (req.user.admin == true){
    return res.render('admin')
  }
  else{
    return res.render('home')
  }
})

app.get('/admin', isadminMiddleware , (req, res) => {
 res.render('admin')
})

app.get('/test', (req, res) => {
  return res.render('test')
})

app.get('/admingetuser',isadminMiddleware,(req,res) => {
  const username = req.user.username;
  const email = req.user.email;
  const point = req.user.point;
  const status = req.user.admin;
  let statuss = ""
  if (status == 1){
    statuss = "Admin"
  }
  else if (status == 0){
    statuss = "Member"
  }
  else {
    statuss = "Guest"
  }
  res.send("Username : "  + username + "Email : " +  email + "Point : " + point + "Status : " + statuss)

})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
