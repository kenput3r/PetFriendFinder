const db = require('../models');

module.exports = function(app) {
    app.get('/owners/:id', function(req, res) {
        db.Owners.findOne( {where: {id: req.params.id}}).then(data => {
            res.render('owner', {name: data.name});
        });
    });
}