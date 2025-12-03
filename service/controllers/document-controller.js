const catchAsync = require("../utility/catchAsync");

const createDocument = catchAsync(async (req, res) => {});

const getDocument = catchAsync(async (req, res) => {});

const deleteDocument = catchAsync(async (req, res) => {});

module.exports = {
	createDocument,
	getDocument,
	deleteDocument,
};
