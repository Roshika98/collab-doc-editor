const { Schema, model } = require("mongoose");

const OpIdSchema = new Schema(
	{
		client: { type: String, required: true },
		clock: { type: Number, required: true },
	},
	{ _id: false }
);

const InsertOpSchema = new Schema(
	{
		type: { type: String, enum: ["insert"], required: true },
		id: { type: OpIdSchema, required: true },
		parent: { type: OpIdSchema, default: null },
		text: { type: String, default: "" },
		attributes: { type: Object, default: {} },
	},
	{ _id: false }
);

const DeleteOpSchema = new Schema(
	{
		type: { type: String, enum: ["delete"], required: true },
		target: { type: OpIdSchema, required: true },
	},
	{ _id: false }
);

const UpdateSchema = new Schema({
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

UpdateSchema.index({ docId: 1, timestamp: 1 });

const DocumentUpdate = model("DocumentUpdate", UpdateSchema);

module.exports = DocumentUpdate;
