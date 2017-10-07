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
            let petOwnerId = 0 ;
            if(req.isAuthenticated()) {
                if((data.OwnerId * 1) === (req.user.id * 1)) {
                    ///Prepare owner Id to be sent
                    petOwnerId = req.user.id * 1;
                    canEdit = true;
                }
            }

            res.render('pet', {
                name: data.name,
                picture: data.picture,
                petOwnerId: petOwnerId,/////sending the owner Id
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

    app.post('/pets/filter', function(req, res) {
        console.log("=========" + req.body.type + "========" + req.body.breed + "========" + req.body.age + "======" + req.body.gender);

        var age = 0;
        if(req.body.age === "0-3") {
            age = {
                lt: 3
            }
        } else if (req.body.age === "4-7") {
            age = {
                between: [4, 7]
            }
        } else {
            age = {
                gte: 8
            }
        };

        //create form validation so that users HAVE to select a type

        if(req.body.type != "") {
            models.Pets.findAll({
                where: {type: req.body.type
                        // breed: req.body.breed,
                        // age: req.body.age,
                        // gender: req.body.gender
                    }
            }).then(data => {
    
                let Pets = [];
                //push pet data to Pets
                for(pet in data) {
                    Pets.push(data[pet]);
                }

                res.render('pets', {
                    pets: Pets,
                    isUser: req.isAuthenticated()
                });
            });
        }
        else{
            console.log("Type is not selected");
        }
    });
    //Get owner's pet to view-my-pets
    app.get('/profile/view-pets', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.user.id
            },
            include: [models.Pets]
        }).then(data => {
            res.render('profile/view-pets', {
                ownerPicture: data.picture,
                ownerName: data.name,
                ownerEmail: data.email,
                ownerId: data.id,
                ownerBio: data.bio,
                pets: data.Pets,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get owner's info
    app.get('/profile/edit-profile', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.user.id
            }
        }).then(data => {
            res.render('profile/edit-profile', {
                ownerPicture: data.picture,
                ownerName: data.name,
                ownerEmail: data.email,
                ownerAge: data.age,
                ownerLocation: data.location,
                ownerId: data.id,
                ownerBio: data.bio,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get owner's friends (no data)
    app.get('/profile/view-friends', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.user.id
            }
        }).then(data => {
            res.render('profile/view-friends', {
                ownerPicture: data.picture,
                ownerName: data.name,
                ownerEmail: data.email,
                ownerAge: data.age,
                ownerLocation: data.location,
                ownerId: data.id,
                ownerBio: data.bio,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get owner's friends (no data)
    app.get('/home', function (req, res) {
        models.Owners.findOne({
            where: {
                id: req.user.id
            }
        }).then(data => {
            res.render('home', {
                ownerPicture: data.picture,
                ownerName: data.name,
                isUser: req.isAuthenticated()
            });
        });

    });
}