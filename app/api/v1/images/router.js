const express = require("express");
const router = express();

const { create } = require("./controller");

router.post("/images", create);

module.exports = router;
