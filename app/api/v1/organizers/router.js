const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const {
    createCMSOrganizer,
    createCMSUser,
    getCMSUser,
} = require("./controller");

// create organizer only owner allowed
router.post(
    "/organizers",
    authenticateUser,
    authorizeRoles("owner"),
    createCMSOrganizer
);

// create user(admin) only organizer can do
router.post(
    "/users",
    authenticateUser,
    authorizeRoles("organizer"),
    createCMSUser
);

// only owner can get all users
router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUser);

module.exports = router;
