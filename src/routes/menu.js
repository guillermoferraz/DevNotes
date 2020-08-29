const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth')

router.get('/main/start', isAuthenticated, (req, res) => {
	res.render('menu/menu');
});


module.exports = router;