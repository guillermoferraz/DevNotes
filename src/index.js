const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations

const app = express();
require('./database');
require('./config/passport');

//

//Settings

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');


//

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
	secret: 'h19',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//

//Global variables

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	res.locals.email = req.email || null;

	next();
});

//

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/menu'));
app.use(require('./routes/notes'))

//

//Static files
app.use(express.static(path.join(__dirname, 'public')));
//

//Starting server
app.listen(app.get('port'), () => {
	console.log('Server start on port', app.get('port'));
});

//