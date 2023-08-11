const express = require("express");
const router = express();

// const {
//     authenticateUser,
//     authorizeRoles,
// } = require("../../../middleware/auth");
const { signup } = require("./controller");

router.post("/auth/signup", signup);

module.exports = router;
