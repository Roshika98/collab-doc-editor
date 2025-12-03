const express = require("express");
const {
	createDocument,
	getDocument,
	deleteDocument,
} = require("../controllers/document-controller");
const router = express.Router();

router.route("/docs").post(createDocument).get(getDocument).delete(deleteDocument);

module.exports = router;
