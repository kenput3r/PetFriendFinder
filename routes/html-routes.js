const models = require('../models');

module.exports = function(app) {
    //Get an owner by id
    app.get('/owners/:id', function(req, res) {
        models.Owners.findOne( {where: {id: req.params.id}}).then(data => {
            res.render('owner', {
                name: data.name,
                picture: data.picture
            });
        });
    });

    //Get all owners
    app.get('/owners', function(req, res) {
        models.Owners.findAll({}).then(data => {
            let Owners = [];
            
            for(owner in data) {
                Owners.push(data[owner]);
            }

            res.render('owners', {
                owners: Owners
            });
        });
    });
}