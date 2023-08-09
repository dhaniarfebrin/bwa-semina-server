const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const {
    create,
    index,
    find,
    update,
    destroy,
    changeStatus,
} = require("./controller");

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

// change status event
router.put(
    "/events/:id/status",
    authenticateUser,
    authorizeRoles("organizer", "admin"),
    changeStatus
);

module.exports = router;
