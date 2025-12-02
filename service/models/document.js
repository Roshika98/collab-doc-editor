const { Schema, model } = require("mongoose");

const StructSchema = new Schema(
	{
		id: {
			client: { type: String, required: true },
			clock: { type: Number, required: true },
		},
		parent: {
			client: { type: String, default: null },
			clock: { type: Number, default: null },
		},
		text: { type: String, default: "" },
		attributes: { type: Object, default: {} },
	},
	{ _id: false }
);

const documentSchema = new Schema({
	title: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
	snapshot: {
		structs: { type: [StructSchema], default: [] },
	},
	vectorClock: {
		type: Map,
		of: Number,
		default: {},
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Document = model("Document", documentSchema);

module.exports = Document;
