const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');


//Initializations

const app = express();


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

//

//Global variables

//

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));

//

//Static files

//

//Starting server
app.listen(app.get('port'), () => {
	console.log('Server start on port', app.get('port'));
});

//