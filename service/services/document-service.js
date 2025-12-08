const {
	createNewDocument,
	getDocuments,
	getDocumentById,
} = require("../repositories/document-repo");

const createDocument = async () => {
	const result = await createNewDocument();
	console.log("New document created with ID:", result.id);
	return result;
};

const getAllDocuments = async () => {
	const docs = await getDocuments();
	return docs;
};

const getDocumentByIdService = async (id) => {
	const doc = await getDocumentById(id);
	return doc;
};

module.exports = { createDocument, getAllDocuments, getDocumentByIdService };
