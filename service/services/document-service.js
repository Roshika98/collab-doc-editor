const { createNewDocument } = require("../repositories/document-repo");

const createDocument = async () => {
	const result = await createNewDocument();
	console.log("New document created with ID:", result.id);
	return result;
};
module.exports = { createDocument };
