const authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard', authController.dashboard);
    app.get('/logout', authController.logout);
    app.get('/', authController.home);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));
}