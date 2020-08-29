const helpers = {};


helpers.isAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'No Autorizado');
	res.redirect('/users/signIn');
};





module.exports = helpers;