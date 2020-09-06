const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
	comment: { type: String },
	username: { type: String },
	user: { type: String },
	date: { type: Date, default: Date.now() }
},
	{
		timestamps: true
	});
module.exports = mongoose.model('Comment', CommentSchema);