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
    getDetailLandingPage,
} = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/auth/active", activeParticipant);

router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);

module.exports = router;
