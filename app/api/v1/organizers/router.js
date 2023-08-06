const express = require("express");
const router = express();

const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const { createCMSOrganizer, createCMSUser } = require("./controller");

// router.get("/categories", index);
// router.get("/categories/:id", find);
router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUser);
// router.put("/categories/:id", update);
// router.delete("/categories/:id", destroy);

module.exports = router;
