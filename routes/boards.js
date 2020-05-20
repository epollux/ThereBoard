const express = require("express");

const { getUpdate } = require("../controllers/boards");

const router = express.Router();

router.route("/:id").post(getUpdate); // consider adding protect to verify the user ID (or API key)

module.exports = router;
