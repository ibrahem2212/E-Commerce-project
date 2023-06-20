const express = require("express");

const { getLoggedUserData } = require("../services/userService");

const { getRecommend } = require("../services/recommendService");
const authService = require("../services/authService");

const router = express.Router();

router.route("/").get(getRecommend);

module.exports = router;
