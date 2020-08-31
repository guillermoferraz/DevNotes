const mongoose = require('mongoose');
const { Schema } = mongoose;

const TableSchema = new Schema({
	group: { type: String, required: true },
	object: { type: String, required: true },
	description: { type: String, required: true },
	date:{ type: Date, default: Date.now },
	user: { type: String, required: true }
});

module.exports = mongoose.model('Table', TableSchema);