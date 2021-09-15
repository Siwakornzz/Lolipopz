const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/AuthValidations')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')
const isadminMiddleware = require('../middleware/isadminMiddleware')
/**
 * Shows page for user registration
 */
 router.get('/register', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('register')
})

/**
 * Handles user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'danger',
          body: 'Validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration success'
      }
    }
    return res.redirect('/register')
  } catch (e) {
    req.session.flashData = {
      message: {
        type: 'danger',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/register')
  }
})

/**
 * Shows page for user login
 */
router.get('/login', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('login')
})

/**
 * Logs in a user
 */
router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Err:', err)
      req.session.flashData = {
        message: {
          type: 'danger',
          body: 'Login failed'
        }
      }
      return res.redirect('/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'danger',
          body: info.error
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'danger',
            body: 'Login failed'
          }
        }
      }
      return res.redirect('/home')
    })
  })(req, res, next)
})

/**
 * Logs out a user
 */
router.get('/logout', authMiddleware, (req, res) => {
  req.logout()
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Logout success'
    }
  }
  return res.redirect('/')
})

// profile page
router.get('/profile',authMiddleware,(req,res) => {
  return res.render('profile',  
  {profile: {
    username: req.user.username,
    email: req.user.email,
    point : req.user.point
  }})

})

module.exports = router