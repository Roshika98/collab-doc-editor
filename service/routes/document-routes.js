const express = require("express");
const router = express.Router();

router.route("/docs").post().get().delete();

module.exports = router;
