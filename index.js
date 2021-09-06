const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')
require('./utils/db')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/register', (req, res) => {
  return res.render('register')
})

app.post('/register', async(req, res) => {
  const user = new User(req.body)
  await user.save()
  return res.render('register',{message:"Register Success"})
})
app.listen(3000, () => {
  console.log('Server Running at port 3000')
})

module.exports = app
