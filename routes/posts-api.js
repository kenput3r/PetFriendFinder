const models = require('../models');

module.exports = function(app){
    // Get all posts
    app.get('/api/posts', function(req, res){
        models.Posts.findAll({
            include: [models.Owners]
        }).then(function(data){
            res.json(data);
        });
    });

    // Get posts of a certain user
    app.get('/api/posts/:ownerId', function(req, res){
        models.Posts.findAll({
            where: {OwnerId: req.params.ownerId},
            include: [models.Owners]
        }).then(function(data){
            res.json(data);
        });
    });

    //create new post
    app.post('/api/posts', function(req, res){
        models.Posts.create({
            body: req.body.body,
            OwnerId: req.user.id
        }).then(function(data){
            res.json(data);
        })
    });

    //delete current user's post
    app.delete('/api/posts', function(req, res){
        models.Posts.destroy({
            where: {
                OwnerId: req.user.id
            }
        }).then(function(data){
            res.json(data);
        });    
    });
}