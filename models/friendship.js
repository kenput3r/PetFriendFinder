module.exports = function(sequelize, DataTypes){
    let Friendship = sequelize.define('Friendship',{
        myPetId: DataTypes.INTEGER,
        friendPetId: DataTypes.INTEGER
    });

    Friendship.associate = function(models){
        // Friendship.belongsTo(models.Pets,
        //      {foreignKey: 'myPetId', targetKey: "id"},
        //      {foreignKey: 'friendPetId', targetKey: "id"},
        //     {onDelete: "cascade"});

            Friendship.belongsTo(models.Pets, {
                as: 'myPet',
                foreignKey: 'myPetId'
            });
            
            Friendship.belongsTo(models.Pets, {
                as: 'friendPet',
                foreignKey: 'friendPetId'
            });
        
    };
    return Friendship;
}