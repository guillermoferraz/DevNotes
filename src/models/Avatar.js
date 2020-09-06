const { Schema, model } = require('mongoose');
const avatarSchema = new Schema({
	filename: { type: String },
	originalname: { type: String },
	path: { type: String },
	mimetype: { type: String },
	size: { type: Number },
	user: { type: String },
	created_at: { type: Date, default: Date.now() }
}, 
	{

	timestamps: true
	});

module.exports = model('Avatar', avatarSchema)