const router = require('express').Router();
const Table = require('../models/Table');
const { isAuthenticated } = require('../helpers/auth');




router.get('/main/myTables', isAuthenticated, async (req, res) => {
	const tables = await Table.find({user: req.user.id}).sort({date: 'desc'});
	res.render('menu/tables/createTable', { tables });
});
router.get('/main/newTable', isAuthenticated, (req, res) => {
	res.render('menu/tables/newTable');
});

router.post('/menu/tables/newTable', isAuthenticated, async (req, res) => {
	const { title, object, description } = req.body;
	const errors = [];
	if(!title) {
		errors.push({text: 'Debes poner un titulo a tu tabla.'});
	}
	if(!object) {
		errors.push({text: 'Deber asignar un objeto.'})
	}
	if(!description) {
		errors.push({text: 'Debes describir el objeto de la tabla.'});
	} else {
		const titleTable = await Table.findOne({title: title});
		if(titleTable) {
			req.flash('error_msg', 'El titlo ingrasado ya esta en uso');
		res.redirect('/main/newTable');

		}
		const newTable = new Table({ title, object, description });
		newTable.user = req.user.id;
		console.log(newTable)
		await newTable.save();
		req.flash('success_msg', 'Nueva tabla creada con exito.')
		res.redirect('/main/myTables');
	} 
	
});


router.get('/main/newContent/:id', isAuthenticated, async (req, res) => {
	const table = await Table.findById(req.params.id);
	res.render('menu/tables/newContent', { table });
});

router.put('/main/newContent/:id', isAuthenticated, async (req, res) => {
	const {title, object, description} = req.body;
	await Table.findByIdAndUpdate(req.params.id, {title, object, description});
	req.flash('success_msg', 'Datos agregados con exito.');
	res.redirect('/main/myTables');	
});
router.delete('/main/deleteContent/:id', isAuthenticated, async (req, res) => {
	await Table.findByIdAndDelete(req.params.id);
	console.log(req.params.id);
	req.flash('success_msg', 'Datos eliminados con exito.');
	res.redirect('/main/myTables');
});

module.exports = router;