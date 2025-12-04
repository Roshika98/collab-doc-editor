const express = require("express");
const {
	createDocumentController,
	getDocument,
	deleteDocument,
} = require("../controllers/document-controller");
const router = express.Router();

router.route("/").post(createDocumentController).get(getDocument).delete(deleteDocument);

module.exports = router;
