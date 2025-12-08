const catchAsync = require("../utility/catchAsync");
const {
	createDocument,
	getAllDocuments,
	getDocumentByIdService,
} = require("../services/document-service");

const createDocumentController = catchAsync(async (req, res) => {
	const result = await createDocument();
	res.status(201).json({
		status: "success",
		data: {
			document: result,
		},
	});
});

const getDocument = catchAsync(async (req, res) => {
	const { id } = req.params;
	const doc = await getDocumentByIdService(id);
	res.status(200).json({
		status: "success",
		data: {
			document: doc,
		},
	});
});

const getAllDocumentsController = catchAsync(async (req, res) => {
	const docs = await getAllDocuments();
	res.status(200).json({
		status: "success",
		data: {
			documents: docs,
		},
	});
});

const deleteDocument = catchAsync(async (req, res) => {});

module.exports = {
	createDocumentController,
	getDocument,
	deleteDocument,
	getAllDocumentsController,
};
