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
            res.render('owner', {
                name: data.name,
                picture: data.picture,
                age: data.age,
                location: data.location,
                email: data.email,
                pets: data.Pets,
                bio: data.bio,
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

    app.get('/pets/:id', function (req, res) {
        
        models.Pets.findOne({
            where: {
                id: req.params.id
            },
            incldue: [models.Owners]
        }).then(data => {
            models.Owners.findOne({
                where: {
                    id: data.OwnerId
                }
            }).then(ownerData => {
                console.log(ownerData.name);
                res.render('pet', {
                    id: req.params.id,
                    name: data.name,
                    picture: data.picture,
                    age: data.age,
                    type: data.type,
                    breed: data.breed,
                    bio: data.bio,
                    location: ownerData.location,
                    ownerName: ownerData.name,
                    ownerAge: ownerData.age,
                    ownerPicture: ownerData.picture,
                    ownerId: ownerData.id,
                    isUser: req.isAuthenticated()
                });
            });
        });
    });

    app.post('/pets/:id', function (req, res) {
        
        models.Pets.findOne({
            where: {
                id: req.params.id
            },
            incldue: [models.Owners]
        }).then(data => {
            models.Owners.findOne({
                where: {
                    id: data.OwnerId
                }
            }).then(ownerData => {
                models.Pets.findAll({
                    where: {
                        OwnerId: req.user.id * 1
                    }
                }).then(friendChoices => {
                    let Pets = [];

                    for(pet in friendChoices) {
                        Pets.push(friendChoices[pet]);
                    }
                    res.render('pet', {
                        id: req.params.id,
                        name: data.name,
                        picture: data.picture,
                        age: data.age,
                        type: data.type,
                        breed: data.breed,
                        bio: data.bio,
                        location: ownerData.location,
                        ownerName: ownerData.name,
                        ownerAge: ownerData.age,
                        ownerPicture: ownerData.picture,
                        ownerId: ownerData.id,
                        friendPetId: req.body.friendPetId,
                        mypets: Pets,
                        isUser: req.isAuthenticated()
                    });
                });
            });
        });
    });

    //Get all pets
    app.get('/pets', function (req, res) {
        models.Pets.findAll({}).then(data => {
            let Pets = [];
            let Types = [];
            let Breeds = [];

            for (pet in data) {
                Pets.push(data[pet]);

                if(!Types.includes(data[pet].type)) {
                    Types.push(data[pet].type);
                }

                if(!Breeds.includes(data[pet].breed)) {
                    if(data[pet].breed !== '') {
                        Breeds.push(data[pet].breed);
                    }
                }
            }

            res.render('pets', {
                pets: Pets,
                types: Types,
                breeds: Breeds,
                isUser: req.isAuthenticated()
            });
        });
    });

    app.post('/pets', function(req, res) {
        console.log('\n======\n' + req.body.type + '\n======\n' + req.body.breed + '\n======\n' + req.body.age + '\n======\n' + req.body.gender);
    
        let query = {};
    
        var age = 0;

        if(req.body.type != '') {
            query.type = req.body.type
        }
    
        if(req.body.breed != '') {
            query.breed = req.body.breed
        }
    
        if(req.body.age != '') {
            query.age = req.body.age

            if(req.body.age === '0-3') {
                query.age = {
                    lte: 3
                }
            } else if(req.body.age === '4-7') {
                query.age = {
                    between: [4, 7]
                }
            } else {
                query.age = {
                    gte: 8
                }
            }
        }
    
        if(req.body.gender != '') {
            query.gender = req.body.gender

        }
    
        models.Pets.findAll({
            where: query
        }).then(data => {
            let Pets = [];
            let Types = [];
            let Breeds = [];

            for (pet in data) {
                Pets.push(data[pet]);

                if(!Types.includes(data[pet].type)) {
                    Types.push(data[pet].type);
                }

                if(!Breeds.includes(data[pet].breed)) {
                    if(data[pet].breed !== '') {
                        Breeds.push(data[pet].breed);
                    }
                }
            }
    
            res.render('pets', {
                pets: Pets,
                types: Types,
                breeds: Breeds,
                isUser: req.isAuthenticated()
            })
        })
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
        if(req.isAuthenticated()) {
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
        } else {
            res.redirect('/');
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

    //Get the current owner pets to choose from for the friendship
    app.post('/myPets', function(req, res){
        var friendPetId = req.body.friendPetId * 1;
        models.Pets.findAll({
            where: {
                OwnerId: req.user.id * 1
            },
        }).then(data => {
           
            let Pets = [];
            
            for (pet in data) {
                Pets.push(data[pet]);
            }

            res.render('pet', {
                friendPetId: friendPetId,
                mypets: Pets,
                isUser: req.isAuthenticated()
            });
        });
    });

    //Get all pets
    app.get('/find-pet-friend', function (req, res) {
        models.Pets.findAll({}).then(data => {
            let Pets = [];

            for (pet in data) {
                Pets.push(data[pet]);
            }

            res.render('find-pet-friend', {
                pets: Pets,
                isUser: req.isAuthenticated()
            });
        });
    });
}