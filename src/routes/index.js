const router = require('express').Router();


router.get('/', (req, res) => {
	res.render('index');
});
router.get('/signIn', (req, res) => {
	res.send('Sing In');
});



module.exports = router;