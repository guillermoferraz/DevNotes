const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStartegy({
	usernameField: 'email'
}, async (email, password, done) => {
	const user = await User.findOne({email: email});
	if(!user) {
		return done(null, false, {message: 'email no econtrado'});
	} else {
		const match = await user.matchPassword(password);
		if(match) {
			return done(null, user);
		} else {
			return done(null, false, {message:'Password Incorrecto'})
		}
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id );
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});