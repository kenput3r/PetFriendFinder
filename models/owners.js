module.exports = function(sequelize, DataTypes) {
    let Owners = sequelize.define('Owners', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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

    Owners.associate = function(models) {
        Owners.hasMany(models.Pets, {
          onDelete: "cascade"
        });
    };
    // Owners.associate = function(models) {
    //     Owners.hasMany(models.Posts, {
    //       onDelete: "cascade"
    //     });
    // };
    return Owners;
};