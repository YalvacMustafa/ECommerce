const express = require("express");
const { login, register, logout, getUser } = require("../Build/auth");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, getUser);

module.exports = router;