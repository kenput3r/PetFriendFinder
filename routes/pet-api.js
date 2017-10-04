module.exports = function(app) {

    //Get all pets
    app.get('/api/pets', function(req, res) {
        let query = {};
        if(req.query.owner_id) {
            query.OwnerId = req.query.owner_id;
        }

        models.Pets.findAll({
            where: query,
            include: [models.Owner]
        }).then(function(dbPets) {
            res.json(dbPets);
        });
    });

    //Get single pet
    app.get('/api/pets/:id', function(req, res) {
        models.Pets.findOne({
            where: {
                id: req.params.id
            },
            include: [models.Owner]
        }).then(function(dbPets) {
            res.josn(dbPets);
        });
    });

    //Post new pet
    app.post('api/pets', function(req, res) {
        models.Pets.create(req.body).then(function(dbPets) {
            res.json(dbPets);
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
}