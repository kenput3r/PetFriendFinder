module.exports = {
    signup: function(req, res) {
        res.render('signup');
    },
    signin: function(req, res) {
        res.render('signin');
    },
    dashboard: function(req, res) {
        res.render('dashboard', {
            ownername: req.user.name,
            owneremail: req.user.email,
            ownerid: req.user.id
        });
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    },
    home: function(req, res) {
        res.render('index');
    }
}
