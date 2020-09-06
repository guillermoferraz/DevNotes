const router = require('express').Router();
const Table = require('../models/Table');
const Avatar = require('../models/Avatar');
const { isAuthenticated } = require('../helpers/auth');




router.get('/main/myTables', isAuthenticated, async (req, res) => {
	const tables = await Table.find({user: req.user.id}).sort('group');
	const avatar = await Avatar.find({user: req.user.id}).sort({created_at: 'desc'});
	res.render('menu/tables/createTable', { tables, avatar });
});
router.get('/main/newTable', isAuthenticated, (req, res) => {
	res.render('menu/tables/newTable');
});

router.post('/menu/tables/newTable', isAuthenticated, async (req, res) => {
	const { group, object, description } = req.body;
	const errors = [];
	if(!group) {
		errors.push({text: 'Debes asignar un grupo a tu tabla.'});
	}
	if(!object) {
		errors.push({text: 'Deber asignar un objeto.'})
	}
	if(!description) {
		errors.push({text: 'Debes describir el objeto de la tabla.'});
	} else {/*
		const groupTable = await Table.findOne({group: title});
		if(titleTable) {
			req.flash('error_msg', 'El titulo ingrasado ya existe');
		res.redirect('/main/newTable');

		}*/
		const newTable = new Table({ group, object, description });
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
	const {group, object, description} = req.body;
	await Table.findByIdAndUpdate(req.params.id, {group, object, description});
	req.flash('success_msg', 'Datos agregados con exito.');
	res.redirect('/main/myTables');	
});
router.delete('/main/deleteContent/:id', isAuthenticated, async (req, res) => {
	await Table.findByIdAndDelete(req.params.id);
	console.log(req.params.id);
	req.flash('success_msg', 'Datos eliminados con exito.');
	res.redirect('/main/myTables');
});

// router.get('/main/search', isAuthenticated, function (req, res, next) {
// 	const table = Table.find({user: req.user.id}).sort('group');
	
// 	var q = req.query.q;

// 	Table.find({
// 		group: {
// 			$regex: new RegExp(q)
// 		}
// 	}, {

// 		_id: 0,
// 		__v: 0
// 	}, function (err, data) {
// 		res.json(data);
// 	}).limit(10);
// });


module.exports = router;