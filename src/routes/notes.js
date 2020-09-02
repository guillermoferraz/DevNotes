const router = require('express').Router();
const Note = require('../models/Note');
const NoteDanger = require('../models/NoteDanger');
const NoteWarning = require('../models/NoteWarning');
const NoteInfo = require('../models/NoteInfo');
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

});
//Notes Color selector
router.get('/main/newNoteC', (req, res) => {
	res.render('menu/notes/selectColorNote');
});
//notes color danger
router.get('/main/newNoteDanger', (req, res) => {
	res.render('menu/notes/newNoteDanger');
});
//notes color warning
router.get('/main/newNoteWarning', (req, res) => {
	res.render('menu/notes/newNoteWarning');
});
//notes color info
router.get('/main/newNoteInfo', (req, res) => {
	res.render('menu/notes/newNoteInfo');
});	

//post note danger
router.post('/main/newNoteDanger', isAuthenticated, async (req,res) => {
	const { title, description } = req.body;
	//console.log(req.body);

	const newNoteDanger = new NoteDanger({title, description});
	newNoteDanger.user = req.user.id;
	console.log(newNoteDanger);
	await newNoteDanger.save();
	req.flash('success_msg', 'Nota agregada con exito.');


	res.redirect('/main/start');
});
//post note warning
router.post('/main/newNoteWarning', isAuthenticated, async (req,res) => {
	const { title, description } = req.body;
	//console.log(req.body);

	const newNoteWarning = new NoteWarning({title, description});
	newNoteWarning.user = req.user.id;
	console.log(newNoteWarning);
	await newNoteWarning.save();
	req.flash('success_msg', 'Nota agregada con exito.');


	res.redirect('/main/start');
});
//post note info
router.post('/main/newNoteInfo', isAuthenticated, async (req,res) => {
	const { title, description } = req.body;
	//console.log(req.body);

	const newNoteInfo = new NoteInfo({title, description});
	newNoteInfo.user = req.user.id;
	console.log(newNoteInfo);
	await newNoteInfo.save();
	req.flash('success_msg', 'Nota agregada con exito.');


	res.redirect('/main/start');
});		
//
router.get('/main/start', isAuthenticated, async (req, res) => {
	const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
	const notesDanger = await NoteDanger.find({user: req.user.id}).sort({date: 'desc'});
	const notesWarning = await NoteWarning.find({user: req.user.id}).sort({date: 'desc'});
	const notesInfo = await NoteInfo.find({user: req.user.id}).sort({date: 'desc'});
	res.render('menu/notes/allNotes', { notes, notesDanger, notesWarning, notesInfo });
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
//Edit note Danger.
router.get('/main/editNoteDanger/:id', isAuthenticated, async (req, res) => {
	const noteDanger = await NoteDanger.findById(req.params.id);
	res.render('menu/notes/editNoteDanger', { noteDanger });
});

router.put('/main/editNoteDanger/:id', isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	await NoteDanger.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Nota actualizada con exito.');
	res.redirect('/main/start');

});
//delete note Danger

router.delete('/menu/notes/deleteDanger/:id', isAuthenticated, async(req, res) => {
	await NoteDanger.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Nota eliminada con exito');
	res.redirect('/main/start');
});
//edit note warning
router.get('/main/editNoteWarning/:id', isAuthenticated, async (req, res) => {
	const noteWarning = await NoteWarning.findById(req.params.id);
	res.render('menu/notes/editNoteWarning', { noteWarning });
});

router.put('/main/editNoteWarning/:id', isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	await NoteWarning.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Nota actualizada con exito.');
	res.redirect('/main/start');

});
//delete note warning

router.delete('/menu/notes/deleteWarning/:id', isAuthenticated, async(req, res) => {
	await NoteWarning.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Nota eliminada con exito');
	res.redirect('/main/start');
});

//Edit note info.
router.get('/main/editNoteInfo/:id', isAuthenticated, async (req, res) => {
	const noteInfo = await NoteInfo.findById(req.params.id);
	res.render('menu/notes/editNoteInfo', { noteInfo });
});

router.put('/main/editNoteInfo/:id', isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	await NoteInfo.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Nota actualizada con exito.');
	res.redirect('/main/start');
});
//delete note info

router.delete('/menu/notes/deleteInfo/:id', isAuthenticated, async(req, res) => {
	await NoteInfo.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Nota eliminada con exito');
	res.redirect('/main/start');
});

module.exports = router;