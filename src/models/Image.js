const { Schema, model } =require('mongoose');
const imageSchema = new Schema({
	username: { type: String },
	state: { type: String },
	filename: { type: String },
	originalname: { type: String },
	path: { type: String },
	mimetype: { type: String },
	size: { type: Number },
	created_at: { type: Date, default: Date.now() } 
});

module.exports = model('Image', imageSchema);