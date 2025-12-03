const { Schema, model } = require("mongoose");

const opIdSchema = new Schema(
	{
		client: { type: String, required: true },
		clock: { type: Number, required: true },
	},
	{ _id: false }
);

const insertOpSchema = new Schema(
	{
		type: { type: String, enum: ["insert"], required: true },
		id: { type: opIdSchema, required: true },
		parent: { type: opIdSchema, default: null },
		text: { type: String, default: "" },
		attributes: { type: Object, default: {} },
	},
	{ _id: false }
);

const deleteOpSchema = new Schema(
	{
		type: { type: String, enum: ["delete"], required: true },
		target: { type: opIdSchema, required: true },
	},
	{ _id: false }
);

const updateSchema = new Schema({
	docId: { type: String, required: true, index: true },

	// CRDT op (insert or delete)
	op: {
		type: Schema.Types.Mixed, // holds InsertOpSchema or DeleteOpSchema
		required: true,
	},

	vectorClock: {
		type: Map,
		of: Number,
		default: {},
	},

	timestamp: {
		type: Date,
		default: Date.now,
	},
});

updateSchema.index({ docId: 1, timestamp: 1 });

const DocumentUpdate = model("DocumentUpdate", updateSchema);

module.exports = DocumentUpdate;
