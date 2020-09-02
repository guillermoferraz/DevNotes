const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteDangerSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	user: { type: String },

},
	
	{
		timestamps:true
	});



module.exports = mongoose.model('NoteDanger', NoteDangerSchema);