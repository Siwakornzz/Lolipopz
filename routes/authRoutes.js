const express = require('express');
const router = express.Router();
const { addUser } = require('../modules/users/service/userService');
const { registerSchema } = require('../modules/users/validations/AuthValidations');
const { joiErrorFormatter , mongooseErrorFormatter } = require('../utils/validationFormatter');
/**
 * Show page for user registration
 */
 router.get('/register', (req, res) => {
  return res.render('register', { message: {},formData:{},erros:{} })
})
/**
 * Handles user registration
 */
router.post("/register", async (req, res) => {
  try {
    //check validationResult
    const validationsResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationsResult.error){
      return res.render('register',{
        message:{
          type:'error',
          body:'Validation Errors'
        },
        errors:joiErrorFormatter(validationsResult.error),
        formData : req.body
        })
    }

    const user = await addUser(req.body);
    return res.render('register', { message:{
      type: 'success',
      body: 'Registration Success'
    }, 
      errors: {}, 
      formData: req.body  
    });
  } catch (e) {
    console.error(e);
    return res.status(400).render('register',{
      message:{
        type:'error',
        body:'Validation Errors'
      },
        errors:mongooseErrorFormatter(e),
        formData : req.body
      })
  }
});

module.exports = router;
