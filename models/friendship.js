module.exports = function(sequelize, DataTypes){
    let Friendships = sequelize.define('Friendships',{
        myPetId: DataTypes.INTEGER,
        friendPetId: DataTypes.INTEGER
    });

    Friendships.associate = function(models){

            Friendships.belongsTo(models.Pets, {
                as: 'myPet',
                foreignKey: 'myPetId'
            });
            
            Friendships.belongsTo(models.Pets, {
                as: 'friendPet',
                foreignKey: 'friendPetId'
            },
            {
                onDelete: "cascade"
            });
        
    };
    return Friendships;
}