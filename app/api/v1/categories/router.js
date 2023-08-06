const express = require("express");
const router = express();

const { authenticateUser, authorizeRoles } = require('../../../middleware/auth')
const { create, index, find, update, destroy } = require("./controller");

router.get("/categories", authenticateUser, index);
router.get("/categories/:id", find);
router.post("/categories", authenticateUser, create);
router.put("/categories/:id", update);
router.delete("/categories/:id", destroy);

module.exports = router;
