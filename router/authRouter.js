const express = require("express");
const router = express.Router();

const authHandler = require("../middleware/authHandler");

router.post("/register", authHandler.registerHandeler);

router.post("/login", authHandler.loginHandeler);

module.exports = router;
