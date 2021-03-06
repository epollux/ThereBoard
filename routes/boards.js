const express = require("express");

const { refresh } = require("../controllers/boards");

const router = express.Router({ mergeParams: true });

router.route("/:id").get(refresh); // consider adding protect to verify the user ID (or API key)

module.exports = router;
