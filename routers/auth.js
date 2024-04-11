const express = require("express");
const { login, register, logout } = require("../Build/auth");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;