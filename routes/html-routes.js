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

    //Get all pets
    app.get('/pets', function(req, res) {
        models.Pets.findAll({}).then(data => {
            let Pets = [];

            for(pet in data) {
                Pets.push(data[pet]);
            }

            res.render('pets', {
                pets: Pets
            });
        });
    });
}