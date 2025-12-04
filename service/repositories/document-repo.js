const Document = require("../models/document");

const createNewDocument = async () => {
	const newDoc = new Document({
		title: "Untitled Document",
		content: "",
		collaborators: [],
	});
	await newDoc.save();
	return { id: newDoc.id };
};

module.exports = {
	createNewDocument,
};
