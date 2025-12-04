const express = require("express");
const router = express.Router();
const documentRoutes = require("./document-routes");

router.use("/docs", documentRoutes);

module.exports = router;
