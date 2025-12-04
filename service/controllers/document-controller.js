const catchAsync = require("../utility/catchAsync");
const { createDocument } = require("../services/document-service");

const createDocumentController = catchAsync(async (req, res) => {
	const result = await createDocument();
	res.status(201).json({
		status: "success",
		data: {
			document: result,
		},
	});
});

const getDocument = catchAsync(async (req, res) => {});

const deleteDocument = catchAsync(async (req, res) => {});

module.exports = {
	createDocumentController,
	getDocument,
	deleteDocument,
};
