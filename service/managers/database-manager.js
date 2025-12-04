const mongoose = require("mongoose");
const Document = require("../models/document.js");
const User = require("../models/user.js");
const DocumentUpdate = require("../models/document-updates.js");

class DatabaseManager {
	/**
	 * @type {DatabaseManager}
	 */
	static instance = null;

	static getInstance() {
		if (!DatabaseManager.instance) {
			DatabaseManager.instance = new DatabaseManager();
		}
		return DatabaseManager.instance;
	}

	async connect() {
		const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/collab-editing";
		try {
			await mongoose.connect(mongoURI, {
				autoCreate: true,
			});
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
		}
	}
}

module.exports = DatabaseManager;
