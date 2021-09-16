const express = require('express')
const router = express.Router()
const { registerSchema } = require('../modules/users/validations/AuthValidations')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')
const isadminMiddleware = require('../middleware/isadminMiddleware')
const services = require('../modules/users/service/render');
const usercontroller = require('../controller/usercontroller')
const productscontroller = require('../controller/productscontroller')
const topupcontroller = require('../controller/topupcontroller')

/**
 * Shows page for user registration
 */
router.get('/register', guestMiddleware, flasherMiddleware, (req, res) => {
    return res.render('register')
})

/**
 * Handles user registration
 */
router.post('/register', guestMiddleware, async(req, res) => {
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
router.get('/profile', authMiddleware, (req, res) => {
    return res.render('profile', {
        profile: {
            username: req.user.username,
            email: req.user.email,
            point: req.user.point
        }
    })

})

// product page
router.get('/products', services.products)

// user page
router.get('/user', services.users)

// router crud api user
router.get('/adduser', services.adduser)

router.get('/updateuser', services.updateuser)

// router crud api product
router.get('/checkproduct', services.checkproduct)
router.get('/addproduct', authMiddleware, services.addproduct)
router.get('/updateproduct', services.updateproduct)

// router crud api topup 
router.get('/checktopup', services.checktopup)
router.get('/topup', services.addtopup)
router.get('/updatetopup', services.updatetopup)

// API User
router.post('/api/users', usercontroller.usercreate);
router.get('/api/users', usercontroller.userfind);
router.put('/api/users/:id', usercontroller.userupdate);
router.delete('/api/users/:id', usercontroller.userdelete);

// API Products
router.post('/api/product', productscontroller.productscreate);
router.get('/api/product', productscontroller.productfind);
router.put('/api/product/:id', productscontroller.productupdate);
router.delete('/api/product/:id', productscontroller.productdelete);

// Api topup 
router.post('/api/topup', topupcontroller.topupcreate);
router.get('/api/topup', topupcontroller.topupfind);
router.put('/api/topup/:id', topupcontroller.topupupdate);
router.delete('/api/topup/:id', topupcontroller.topupdelete);

module.exports = router