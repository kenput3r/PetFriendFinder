const models = require('../models');
let loggedIn;

module.exports = function (app) {
    //Get an owner by id
    app.get('/owners/:id', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.params.id
            },
            include: [models.Pets]
        }).then(data => {
            let canEdit = false;
            if (req.isAuthenticated()) {
                if ((req.user.id * 1) === (req.params.id * 1)) {
                    canEdit = true;
                }
            }
            res.render('owner', {
                name: data.name,
                picture: data.picture,
                pets: data.Pets,
                canEdit: canEdit,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get all owners
    app.get('/owners', function (req, res) {
        models.Owners.findAll({}).then(data => {
            let Owners = [];

            for (owner in data) {
                Owners.push(data[owner]);
            }

            res.render('owners', {
                owners: Owners,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get a pet by id
    app.get('/pets/:id', function (req, res) {
        models.Pets.findOne({
            where: {
                id: req.params.id
            }
        }).then(data => {
            let canEdit = false;
            if (req.isAuthenticated()) {
                if ((data.OwnerId * 1) === (req.user.id * 1)) {
                    canEdit = true;
                }
            }

            res.render('pet', {
                name: data.name,
                picture: data.picture,
                canEdit: canEdit,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get all pets
    app.get('/pets', function (req, res) {
        models.Pets.findAll({}).then(data => {
            let Pets = [];

            for (pet in data) {
                Pets.push(data[pet]);
            }

            res.render('pets', {
                pets: Pets,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get owner's pet to view-my-pets
    app.get('/dashboard/view-my-pets', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.user.id
            },
            include: [models.Pets]
        }).then(data => {
            res.render('dashboard/view-my-pets', {
                ownerPicture: data.picture,
                ownerName: data.name,
                ownerEmail: data.email,
                ownerId: data.id,
                ownerBio: data.bio,
                name: data.name,
                picture: data.picture,
                pets: data.Pets,
                isUser: req.isAuthenticated()
            });
        });
    });
}