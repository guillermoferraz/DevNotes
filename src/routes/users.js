const router = require('express').Router();



router.get('/users/signUp', (req, res) => {
	res.render('users/signUp');
});
router.post('/users/signUp', (req, res) => {
	const { name, username, email, password, confirm_password } = req.body;
	console.log(req.body);
});
router.get('/users/signIn', (req, res) => {
	res.render('users/signIn');
});



module.exports = router;