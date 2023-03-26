const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const { signup, login, forgotPassword } = require("../services/authService");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
