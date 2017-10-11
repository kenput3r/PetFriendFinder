const models = require('../models');
let loggedIn;

module.exports = function (app) {

    //Get profile
    app.get('/profile', function(req, res) {
        if(req.isAuthenticated()) {
            models.Owners.findOne({
                where: {
                    id: req.user.id
                }
            }).then(data => {
                models.Posts.findAll({
                    where: {
                        OwnerId: req.user.id
                    },
                    order: [['createdAt', 'DESC']]
                }).then(posts => {
                    let Posts = [];
                    for(post in posts) {
                        Posts.push(posts[post].dataValues);
                    }
                    console.log('requested');
                    res.render('profile', {
                        ownerPicture: data.picture,
                        ownerName: data.name,
                        ownerEmail: data.email,
                        ownerId: data.id,
                        ownerBio: data.bio,
                        posts: Posts,
                        isUser: req.isAuthenticated()
                    });
                });
            });
        }else{
            res.redirect('/');
        }
    });

    //Get owner's pet to view-my-pets
    app.get('/profile/view-pets', function (req, res) {
        if(req.isAuthenticated()) {
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
        }else{
            res.redirect('/');
        }
    });

    //Get owner's friends (no data)
    app.get('/profile/view-friends', function (req, res) {
        if(req.isAuthenticated()) {
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
        }else{
            res.redirect('/');
        }
    });

    //Get owner's info
    app.get('/profile/edit-profile', function (req, res) {
        if(req.isAuthenticated()) {
            models.Owners.findOne({
                where: {
                    id: req.user.id
                }
            }).then(data => {
                let isMale = false;
                if(data.gender === 'male') {
                    isMale = true;
                }
                res.render('profile/edit-profile', {
                    ownerPicture: data.picture,
                    ownerName: data.name,
                    ownerEmail: data.email,
                    ownerAge: data.age,
                    ownerLocation: data.location,
                    ownerId: data.id,
                    ownerBio: data.bio,
                    isMale: isMale,
                    isUser: req.isAuthenticated()
                });
            });
        }else{
            res.redirect('/');
        }
    });


}