const models = require('../models');

module.exports = function(app){
    // Get all posts
    app.get('/api/posts', function(req, res){
        models.Posts.findAll().then(function(data){
            res.json(dbPosts);
        });
    });

    // Get posts of a certain user
    app.get('/api/posts/:ownerId', function(req, res){
        models.Posts.findAll({
            where: {OwnerId: req.params.ownerId},
            include: [models.Owners]
        }).then(function(dbOwnerPosts){
            res.json(dbOwnerPosts);
        });
    });

    app.post('/api/posts', function(req, res){
        models.Posts.create({
            body: req.body.body,
            OwnerId: req.user.id
        }).then(function(data){
            res.json(data);
        })
    });

    app.delete('/api/posts', function(req, res){
        models.Posts.destroy({
            where: {
                OwnerId: req.body.id //or req.user.id
            }
        }).then(function(data){
            res.json(data);
        });    
    });
}