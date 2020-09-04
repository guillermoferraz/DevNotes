const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const { unlink } = require('fs-extra');
const Image = require('../models/Image');
const User = require('../models/User');


router.get('/main/community', isAuthenticated,  async (req, res) => {
	const images = await Image.find();
	
	
	res.render('menu/community/community', { images });

});
router.get('/main/community/uploadState', isAuthenticated, (req, res) => {
	console.log('Upload State require');
});
router.post('/main/community/uploadState', isAuthenticated, async (req, res) => {
	const image = new Image();
	image.username = req.body.username;
	image.state = req.body.state;
	image.filename = req.body.filename;
	image.path = '/img/uploadState/' + req.file.filename;
	image.originalname = req.file.originalname;
	image.mimetype = req.file.mimetype;
	image.size = req.file.size;

	await image.save();  
	console.log(image);
	res.redirect('/main/community');
});

module.exports = router;