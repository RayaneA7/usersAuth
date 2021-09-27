const express = require("express");
const mongoose = require("mongoose");
const controller = require("../controllers/authController");

const router = express.Router();

router.get("/signup", controller.signup_get);

router.post("/signup", controller.signup_post);

router.get("/login", controller.login_get);

router.post("/login", controller.login_post);

module.exports = router;
