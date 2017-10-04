const db = require('../models');
const fileUpload = require('express-fileupload');
const path = require("path");

module.exports = function(app) {

    app.use(fileUpload());

    //Get all pets
    app.get('/api/pets', function(req, res) {
        db.Pets.findAll().then(function(data) {
            res.json(data);
            console.log(data);
        });
    });

    //Get all owners
    app.get('/api/owners', function(req, res) {
        db.Owners.findAll().then(function(data) {
            res.json(data);
            console.log(data);
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

    app.post("/api/upload", function(req, res){
        
        if (!req.files)
        return res.status(400).send('No files were uploaded.');
        let sampleFile = req.files.sampleFile;
    
        var imgPath = "/OwnerImages/"+req.body.id+"_"+req.body.name+".jpg";
        // Use the mv() method to place the file somewhere on your server
        console.log(imgPath);
        sampleFile.mv(path.join(__dirname,"../public"+imgPath), function(err) {
            if (err)
                return res.status(500).send(err);

            db.Owners.update({
            picture: imgPath
            },{
            where: { id: req.body.id}
            });
        
            res.send('File uploaded!');
        });
   
    });
}