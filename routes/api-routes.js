const db = require('../models');

module.exports = function(app) {

    //Get all pets
    app.get('/api/pets', function(req,res) {
        db.Pets.findAll({}).then(function(dbPets) {
            res.json(dbPets);
        });
    });

    //Get all owners
    app.get('/api/owners', function(req, res) {
        db.Owners.findAll({}).then(function(dbOwners) {
            res.json(dbPets);
        });
    });

    //Post New Pet
    app.post('/api/pets', function(req, res) {
        db.Pets.create({
            name: req.body.name,
            ownerId: req.body.ownerId,
            picture: req.body.picture,
            type: req.body.type,
            breed: req.body.breed,
            gender: req.body.gender,
            age: req.body.age,
            bio: req.body.bio
        }).then(function(dbPets) {
            res.json(dbPets);
        });
    });

    app.post('/api/owners', function(req, res) {
        db.Owners.create({
            name: req.body.name,
            picture: req.body.picture,
            location: req.body.location,
            gender: req.body.gender,
            age: req.body.age,
            bio: req.body.bio
        }).then(function(dbOwners) {
            res.json(dbOwners);
        });
    });
}