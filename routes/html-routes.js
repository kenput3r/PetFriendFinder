const db = require('../models');

module.exports = function(app) {
    app.get('owner/:id', function(req, res) {
        db.Owners.findOne( {wehre: {id: req.params.id}}).then(data => {
            res.render('owner', {name: data.name});
        });
    });
}
