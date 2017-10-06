const models = require('../models');
let loggedIn;

module.exports = function(app) {
    //Get an owner by id
    app.get('/owners/:id', function(req, res) {
        models.Owners.findOne( {where: {id: req.params.id}}).then(data => {
            res.render('owner', {
                name: data.name,
                picture: data.picture,
                isUser: req.isAuthenticated()
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

            console.log('loggedIn:', req.isAuthenticated());

            res.render('owners', {
                owners: Owners,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get a pet by id
    app.get('/pets/:id', function(req, res) {
        models.Pets.findOne( {where: {id: req.params.id}}).then(data => {
            res.render('pet', {
                name: data.name,
                picture: data.picture,
                isUser: req.isAuthenticated()
            })
        })
    })

    //Get all pets
    app.get('/pets', function(req, res) {
        models.Pets.findAll({}).then(data => {
            let Pets = [];

            for(pet in data) {
                Pets.push(data[pet]);
            }

            res.render('pets', {
                pets: Pets,
                isUser: req.isAuthenticated()
            });
        });
    });
}