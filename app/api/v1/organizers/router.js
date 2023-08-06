const express = require("express");
const router = express();

const { createCMSOrganizer } = require("./controller");

// router.get("/categories", index);
// router.get("/categories/:id", find);
router.post("/organizers", createCMSOrganizer);
// router.put("/categories/:id", update);
// router.delete("/categories/:id", destroy);

module.exports = router;
