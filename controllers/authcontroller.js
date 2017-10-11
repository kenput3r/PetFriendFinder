module.exports = {
    signup: function (req, res) {
        res.render('signup');
    },
    signin: function (req, res) {
        res.redirect('/profile');
    },
    logout: function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    },
    home: function (req, res) {
        res.render('index');
    }
}