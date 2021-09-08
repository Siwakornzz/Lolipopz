const express = require("express");
const router = express.Router();
const { addUser } = require("../modules/users/service/userService");
const {registerSchema } = require("../modules/users/validations/AuthValidations")
/**
 * Show page for user registration
 */
router.get("/register", (req, res) => {
  return res.render("register", { message: null });
});
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
      return res.render('register',{message: 'Validation Errors'})
    }

    const user = await addUser(req.body);
    return res.render('register', { message: "Registration Success" });
  } catch (e) {
    console.error(e);
    return res.status(400).render('register', { message: "Registration Failure" });
  }
});

module.exports = router;
