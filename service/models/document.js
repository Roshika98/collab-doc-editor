const { Schema, model } = require("mongoose");

const documentSchema = new Schema({
	title: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
	content: { type: String, default: "" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Document = model("Document", documentSchema);

module.exports = Document;
