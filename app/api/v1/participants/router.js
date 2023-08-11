const express = require("express");
const router = express();

// const {
//     authenticateUser,
//     authorizeRoles,
// } = require("../../../middleware/auth");
const {
    signin,
    signup,
    activeParticipant,
    getAllLandingPage,
} = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/auth/active", activeParticipant);

router.get("/events", getAllLandingPage);

module.exports = router;
