const path = require('path');
const models = require('../models');

module.exports = function(app) {

    //Post new pet with picture
    app.post('/api/pets', function(req, res) {
        let imgPath;
        let ownerId = req.body.ownerId;

        if(req.files.petPicture) {
            let petPicture = req.files.petPicture;
            imgPath = '/PetImages/' + ownerId + '_' + req.body.name + '.jpg';

            petPicture.mv(path.join(__dirname, '../public' + imgPath), function(err) {
                if(err) {
                    return res.status(500).send(err);
                }
            });
        }else{
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
        }).then(function() {
            res.redirect('/owners/' + ownerId);
        });

    });

    //Upload pet picture
    app.post('/api/newpets/upload', function(req, res) {
        if(!req.files) {
            return res.status(400).send('No files were uploaded');
        }

        let petPicture = req.files.petPicture;
        let petId = req.body.id;
        let imgPath = '/PetImages/' + ownerId + '_' + req.body.name + '.jpg';

        petPicture.mv(path.join(__dirname, '../public' + imgPath), function(err) {
            if(err) {
                return res.status(500).send(err);
            }

            models.Pets.update(
                {
                    picture: imgPath
                },
                {
                    where: { id: petId }
                }
            );

            res.redirect('/pets/' + petId);
        });
    });

    //Update pet
    app.put('/api/update-pet', function(req, res) {
        models.Pets.update(
            req.body,
            {
                where: { id: req.body.id }
            }
        ).then(function(dbPets) {
            res.json(dbPets);
            }
        );
    });

    //Delete pet
    app.delete('/api/pets/:id', function(req, res){
        models.Pets.destroy({
            where: {id: req.params.id}
        }).then(function(dbPets){
            res.json(dbPets);
        });
    });
}