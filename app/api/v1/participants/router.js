const express = require("express");
const router = express();

// const {
//     authenticateUser,
//     authorizeRoles,
// } = require("../../../middleware/auth");
const { signin, signup, activeParticipant } = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/auth/active", activeParticipant);

module.exports = router;
