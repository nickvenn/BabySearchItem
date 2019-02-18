module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   allowNull: false
      // },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.CHAR,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id", "username"]
        }
      ]
    }
  );
  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return User;
};
