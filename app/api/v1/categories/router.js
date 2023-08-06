const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const { create, index, find, update, destroy } = require("./controller");

router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    find
);
router.post(
    "/categories",
    authenticateUser,
    authorizeRoles("organizer"),
    create
);
router.put(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    update
);
router.delete(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    destroy
);

module.exports = router;
