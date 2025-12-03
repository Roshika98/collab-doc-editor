const catchAsync = (fn) => async (req, res, next) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.log(error);
		// next(error);
	}
};

module.exports = catchAsync;
