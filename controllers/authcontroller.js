module.exports = {
    signup: function(req, res) {
        res.render('signup');
    },
    signin: function(req, res) {
        res.render('signin');
    },
    dashboard: function(req, res) {
        res.render('dashboard');
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    },
    home: function(req, res) {
        res.render('home');
    }
}