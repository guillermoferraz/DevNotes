const router = require('express').Router();
const Note = require('../models/Note');
const NoteDanger = require('../models/NoteDanger');
const { isAuthenticated } = require('../helpers/auth')


router.get('/main/newNote', (req, res) => {
	res.render('menu/notes/newNote');
		
});
router.post('/menu/notes/newNote', isAuthenticated, async (req,res) => {
	const { title, description } = req.body;
	//console.log(req.body);

	const newNote = new Note({title, description});
	newNote.user = req.user.id;
	console.log(newNote);
	await newNote.save();
	req.flash('success_msg', 'Nota agregada con exito.');


	res.redirect('/main/start');

})
router.get('/main/start', isAuthenticated, async (req, res) => {
	const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
	res.render('menu/notes/allNotes', { notes });
});
router.delete('/menu/notes/delete/:id', isAuthenticated, async(req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Nota eliminada con exito');
	res.redirect('/main/start');
});
router.get('/main/editNote/:id', isAuthenticated, async (req, res) => {
	const note = await Note.findById(req.params.id);
	res.render('menu/notes/editNote', { note });
})

router.put('/main/editNote/:id', isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Nota actualizada con exito.');
	res.redirect('/main/start');

});
//Notes Color danger



module.exports = router;