const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../modules/users/models/User')

passport.use(new LocalStrategy({
  usernameField: 'username'
},
async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) return done(null, false, {error : 'User not found'})
    if (await user.checkPassword(password)) return done(null, user)
    done(null, false,{error: 'Incorrect password'})
  } catch (e) {
    return done(e)
  }
}))

passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ _id })
    return done(null, user)
  } catch (e) {
    return done(e)
  }
})

