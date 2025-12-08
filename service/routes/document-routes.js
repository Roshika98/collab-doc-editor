const express = require("express");
const {
	createDocumentController,
	getDocument,
	deleteDocument,
	getAllDocumentsController,
} = require("../controllers/document-controller");
const router = express.Router();

router.get("/:id", getDocument);
router
	.route("/")
	.post(createDocumentController)
	.get(getAllDocumentsController)
	.delete(deleteDocument);

module.exports = router;
