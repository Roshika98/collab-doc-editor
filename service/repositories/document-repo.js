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

const getDocuments = async () => {
	const docs = await Document.find();
	return docs;
};

const getDocumentById = async (id) => {
	const doc = await Document.findById(id);
	return doc;
};

module.exports = {
	createNewDocument,
	getDocuments,
	getDocumentById,
};
