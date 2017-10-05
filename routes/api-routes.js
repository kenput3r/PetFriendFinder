const models = require('../models');
const path = require('path');

module.exports = function(app) {

    //Get all pets
    app.get('/api/pets', function(req, res) {
        models.Pets.findAll().then(function(data) {
            res.json(data);
            console.log(data);
        });
    });

    //Get all owners
    app.get('/api/owners', function(req, res) {
        models.Owners.findAll().then(function(data) {
            res.json(data);
            console.log(data);
        });
    });

    app.post('/api/owners', function(req, res) {
        models.Owners.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            picture: req.body.picture,
            location: req.body.location,
            gender: req.body.gender,
            age: req.body.age,
            bio: req.body.bio
        }).then(function(dbOwners) {
            res.json(dbOwners);
        });
    });

    //Upload Owner picture
    app.post("/api/upload", function(req, res){
        
        if (!req.files.ownerPicture)
        return res.status(400).send('No files were uploaded.');
        let ownerPicture = req.files.ownerPicture;
        let ownerId = req.body.id;
        let imgPath = "/OwnerImages/"+ownerId+"_"+req.body.name+".jpg";
        
        // Use the mv() method to place the file somewhere on your server
        ownerPicture.mv(path.join(__dirname,"../public"+imgPath), function(err) {
            
            if(err) {
                return res.status(500).send(err);
            }

            models.Owners.update(
                {
                    picture: imgPath
                },
                {
                    where: { id: ownerId }
                }
            );
        
            res.redirect('/owners/' + ownerId);
        });
   
    });


}