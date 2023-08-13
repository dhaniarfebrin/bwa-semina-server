const express = require("express");
const router = express();

const {
    signin,
    signup,
    activeParticipant,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard,
} = require("./controller");

const { authenticateParticipant } = require("../../../middleware/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/auth/active", activeParticipant);

router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/orders", authenticateParticipant, getDashboard);

module.exports = router;
