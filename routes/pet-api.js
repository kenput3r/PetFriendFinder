const path = require('path');
const models = require('../models');

module.exports = function (app) {

    //Post new pet with picture
    app.post('/api/pets', function (req, res) {
        let imgPath;
        let ownerId = req.body.ownerId;

        if (req.files.petPicture) {
            let petPicture = req.files.petPicture;
            imgPath = '/PetImages/' + ownerId + '_' + req.body.name + '.jpg';

            petPicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } else {
            imgPath = 'https://api.adorable.io/avatars/285/' + req.body.name + '.png'
        }

        models.Pets.create({
            name: req.body.name,
            OwnerId: ownerId,
            picture: imgPath,
            type: req.body.type,
            gender: req.body.gender,
            breed: req.body.breed,
            age: req.body.age,
            bio: req.body.bio
        }).then(function () {
            res.redirect('/profile/view-pets');
        });

    });

    //Upload pet picture
    app.post('/api/newpetimg/upload', function (req, res) {
        if (!req.files.petPicture) {
            return res.status(400).send('No files were uploaded');
        }

        let petPicture = req.files.petPicture;
        let petId = req.body.id;
        console.log(petId);
        let imgPath = '/PetImages/' + req.user.id + '_' + req.body.name + '.jpg';

        petPicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            models.Pets.update({
                picture: imgPath
            }, {
                where: {
                    id: petId
                }
            });
            res.redirect('/profile/view-pets');
        });
    });

    //Updating pet's info
    app.post('/api/update-pet', function (req, res) {
        models.Pets.update({
            name: req.body.name,
            type: req.body.type,
            breed: req.body.breed,
            age: req.body.age,
            bio: req.body.bio
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbOwners) {
            res.redirect('/profile/view-pets');
        });
    });

    //Delete pet
    app.delete('/api/delete-pet/:id', function (req, res) {
        models.Pets.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPets) {
            res.send('deleted');
        });
    });

    //Get pet
    app.get('/api/pet/:id', function (req, res) {
        models.Pets.findOne({
            where: {
                id: req.params.id * 1
            }
        }).then(data => {
            res.json(data);
        });
    });
}