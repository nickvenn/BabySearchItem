module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postCode: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    typeOfPost: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT(6, 2),
      allowNull: true
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    languageOfPost: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNum: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactMedium: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      // type: DataTypes.BLOB("long")
      type: DataTypes.STRING,
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cityArea: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Post.associate = function (models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Post;
};
