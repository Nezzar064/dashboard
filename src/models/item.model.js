module.exports = (sequelize, DataTypes) => {
    const item = sequelize.define('items', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        link: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isUrl: true,
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isInt: true,
            notEmpty: true,
          },
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
    });

    return item;
};


