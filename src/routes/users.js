const router = require('express').Router();
const User = require('../models/User');


router.get('/users/signUp', (req, res) => {
	res.render('users/signUp');
});
router.post('/users/signUp', async (req, res) => {
	const { name, username, email, password, confirm_password } = req.body;
	
	const newUser = new User({name, username, email, password});
	newUser.password = await newUser.encryptPassword(password);
	
	console.log(newUser);
	await newUser.save();
	res.redirect('/main/start');
});
router.get('/users/signIn', (req, res) => {
	res.render('users/signIn');
});
router.post('/users/signIn', (req, res) => {
	cnst
	console.log(req.body);
	res.redirect('/users/signIn');
});


module.exports = router;