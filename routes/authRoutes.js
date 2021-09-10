const express = require("express");
const router = express.Router();
const { addUser } = require("../modules/users/service/userService");
const {
  registerSchema,
} = require("../modules/users/validations/AuthValidations");
const {
  joiErrorFormatter,
  mongooseErrorFormatter,
} = require("../utils/validationFormatter");

const m1 = (req, res, next) => {
  req.user = "Guest";
  next();
};

const m2 = (req,res,next)=>{
  console.log(req.url)
  next();
};

/**
 * Show page for user registration
 */
router.get("/register", (req, res) => {
  return res.render("register", { message: {}, formData: {}, errors: {} });
});
/**
 * Handles user registration
 */
router.post("/register", async (req, res) => {
  try {
    //check validationResult
    const validationsResult = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationsResult.error) {
      return res.render("register", {
        message: {
          type: "danger",
          body: "Validation Errors",
        },
        errors: joiErrorFormatter(validationsResult.error),
        formData: req.body,
      });
    }

    const user = await addUser(req.body);
    return res.render("register", {
      message: {
        type: "success",
        body: "Registration Success",
      },
      errors: {},
      formData: req.body,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).render("register", {
      message: {
        type: "danger",
        body: "Validation Errors",
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body,
    });
  }
});

/**
 * Show page for user login
 */
router.get("/login", (req, res) => {
  return res.render("login", { message: {}, formData: {}, errors: {} });
});

/**
 * login a user
 */
router.post("/login", m1,m2, (req, res) => {
  console.log(req.user);

  return res.render("login", {
    message: {
      type: "success",
      body: "Login Successfully",
    },
    formData: {},
    errors: {},
  });
});

// login middleware
const logMid = (req, res, next) => {};
module.exports = router;
