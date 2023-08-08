const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const { create, index, find, update, destroy } = require("./controller");

router.get("/events", authenticateUser, authorizeRoles("organizer"), index);
router.get("/events/:id", authenticateUser, authorizeRoles("organizer"), find);
router.post("/events", authenticateUser, authorizeRoles("organizer"), create);
router.put(
    "/events/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    update
);
router.delete(
    "/events/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    destroy
);

module.exports = router;
