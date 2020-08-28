const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DevNotes', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
	.then(db => console.log('Data base mongo is connected'))
	.catch(err =>console.log('err'));