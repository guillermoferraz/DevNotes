const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth')


router.get('/main/notes', (req, res) => {
	res.render('menu/notes/notes');
});

module.exports = router;