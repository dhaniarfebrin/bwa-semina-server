const express = require("express");
const router = express();

// const {
//     authenticateUser,
//     authorizeRoles,
// } = require("../../../middleware/auth");
const { signup, activeParticipant } = require("./controller");

router.post("/auth/signup", signup);
router.put("/auth/active", activeParticipant);

module.exports = router;
