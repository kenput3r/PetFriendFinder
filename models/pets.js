module.exports = function(sequelize, DataTypes) {
    let Pets = sequelize.define('Pets', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // ownerId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    Pets.associate = function(models) {
        Pets.belongsTo(models.Owners, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Pets;
};