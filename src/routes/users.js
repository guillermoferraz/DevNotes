const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signUp', (req, res) => {
	res.render('users/signUp');
});
router.post('/users/signIn', passport.authenticate('local', {
	successRedirect: '/main/start',
	failureRedirect: '/users/signIn',
	failureFlash: true
}));


router.post('/users/signUp', async (req, res) => {
	const { name, username, email, password, confirm_password } = req.body;
	const expNumb = /[0-9]/;
	const expEmail = /\w+@\w+\.+[a-z]/;

	const errors = [];
	if(name === '' || username === '' || email === '' || password === '' || confirm_password === '') {
		errors.push({text: 'Debes completar todos los campos.'});
	}
	if(name.length>20) {
		errors.push({text: 'El nombre no debe superar los 20 caracteres.'});
	}
	if(name.length<2){
		errors.push({text: 'El nombre debe tener como minimo 3 caracteres.'});
	}
	if(!expEmail.test(email)){
		errors.push({text: 'El email ingresado no es valido.'});
	}
	if(expNumb.test(name)){
		errors.push({text: 'El nombre no puede tener numeros.'});
	}
	if(username.length>15){
		errors.push({text: 'El nombre de usuario no debe superar los 15 caracteres.'});
	}
	if(username.length<=2){
		errors.push({text: 'El nombre de ursuario debe tener 3 caracteres como minimo.'})
	}
	if(password.length>15){
		errors.push({text: 'El password no debe superar los 15 caracteres.'});

	}
	if(password.length<=7){
		errors.push({text: 'El password no debe tener menos de 8 caracteres.'})
	}
	
	if(password != confirm_password) {
		errors.push({text: 'El Password no coincide con la confirmacion.'});
	}
	if(errors.length > 0) {
		res.render('users/signUp', {errors, name, username, password, confirm_password});
	} else {
		const emailUser = await User.findOne({email: email});
		if(emailUser) {
			req.flash('error_msg', 'El email ingrasado ya esta en uso');
			res.redirect('/users/signUp');
		}


		const newUser = new User({name, username, email, password});
		newUser.password = await newUser.encryptPassword(password);
	
		console.log(newUser);	
		await newUser.save();
		req.flash('success_msg', 'Te has registrado exitosamente.')
		res.redirect('/users/signIn');	
	}
	
	
});
router.get('/users/signIn', (req, res) => {
	res.render('users/signIn');
});
router.post('/users/signIn', (req, res) => {
	cnst
	console.log(req.body);
	res.redirect('/users/signIn');
});
router.get('/users/logOut', (req, res) => {
	req.logout();
	res.redirect('/');
})

module.exports = router;