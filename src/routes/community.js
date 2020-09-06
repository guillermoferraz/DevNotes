const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const { unlink } = require('fs-extra');
const Image = require('../models/Image');
const User = require('../models/User');
const Avatar = require('../models/Avatar');
const Comment = require('../models/Comment');


router.get('/main/community', isAuthenticated,  async (req, res) => {
	const images = await Image.find();
	const avatar = await Avatar.find({user: req.user.id}).sort({created_at: 'desc'});
	const comment = await Comment.find();
	
	res.render('menu/community/community', { images, avatar, comment});

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
	image.user = req.user.id;

	await image.save();  
	console.log(image);
	res.redirect('/main/community');
});
router.get('/main/community/myProfile', isAuthenticated, async (req, res) => {
	const avatar = await Avatar.find({user: req.user.id}).sort({created_at: 'desc'});
	const image = await Image.find({user: req.user.id}).sort({created_at: 'desc'});
	const comment = await Comment.find({user: req.user.id}).sort({created_at: 'desc'});
	res.render('menu/community/myProfile', {image, avatar, comment});
});
router.delete('/main/community/deleteMyProfile/:id', isAuthenticated, async (req, res) => {
	await Image.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Publicacion Eliminada.');
	res.redirect('/main/community/myProfile');
});
router.get('/main/community/editMyProfile/:id', isAuthenticated, async (req, res) => {
	const image = await Image.findById(req.params.id);
	res.render('menu/community/editMyProfile', { image });
});
router.put('/main/community/editMyProfile/:id', isAuthenticated, async (req, res) => {
	const { state } = req.body;
	await Image.findByIdAndUpdate(req.params.id, { state });
	req.flash('success_msg', 'Estado modificado.');
	res.redirect('/main/community/myProfile');
});;
router.get('/main/myProfile/selectAvatar', isAuthenticated, async (req, res) => {
	console.log('Selected Avatar');
});
router.post('/main/myProfile/selectAvatar', isAuthenticated, async (req, res) => {
	const image = new Avatar();
	image.filename = req.body.filename;
	image.path = '/img/uploadState/' + req.file.filename;
	image.originalname = req.file.originalname;
	image.mimetype = req.file.mimetype;
	image.size = req.file.size;
	image.user = req.user.id;

	await image.save();
	console.log(image);
	res.redirect('/main/community/myProfile');

});
router.get('/main/myProfile/selectAvatar/form', isAuthenticated, async (req, res) => {

	res.render('menu/community/avatarForm');
});
router.get('/main/myProfile/Myimage', isAuthenticated, async (req, res) => {
	const avatar = await Avatar.find({user: req.user.id}).sort({created_at: 'desc'});
	res.render('menu/community/avatarChange', { avatar });
});
router.delete('/main/myProfile/myImage/:id', isAuthenticated, async (req, res) => {
	await Avatar.findByIdAndDelete(req.params.id);
	res.redirect('/main/community/myProfile');
});
router.post('/main/community/comments', isAuthenticated, async (req, res) => {
	const { comment, username } = req.body;

	const newComment = new Comment({ comment, username });
	newComment.user = req.user.id;
	console.log(newComment);
	await newComment.save();
	req.flash('success_msg', 'Comentario publicado con exito');
	res.redirect('/main/community');
});
router.delete('/main/community/comments/:id', isAuthenticated, async (req, res) => {
	await Comment.findByIdAndDelete(req.params.id);
	res.redirect('/main/community/myProfile');
});
router.get('/main/community/commentsEdit/:id', isAuthenticated, async (req, res) => {
	const comment = await Comment.findById(req.params.id);
	res.render('menu/community/commentsEdit', { comment });
});
router.put('/main/community/commentsEdit/:id', isAuthenticated, async (req, res) => {
	const { comment } = req.body;
	await Comment.findByIdAndUpdate(req.params.id, { comment });
	req.flash('success_msg', 'Comentario modificado con exito.');
	res.redirect('/main/community/myProfile');
});

module.exports = router;