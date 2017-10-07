const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const models = require('./models');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use(fileUpload());

app.set('views', './views');
app.engine('hbs', exphbs(
    { 
        defaultLayout: "main", 
        extname: '.hbs',
        partialsDir: 'views/partials'
    }
));

app.set('view engine', '.hbs');

require('./config/passport/passport.js')(passport, models.Owners);
require('./routes/auth.js')(app, passport);
require('./routes/api-routes.js')(app, fileUpload);
require('./routes/pet-api.js')(app, fileUpload);
require('./routes/html-routes.js')(app);

models.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});
