const router = require('express').Router();

router.get('/main/start', (req, res) => {
	res.send('Main start is here');
});


module.exports = router;