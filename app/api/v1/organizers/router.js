const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const { createCMSOrganizer, createCMSUser } = require("./controller");

router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUser);

module.exports = router;
