module.exports = (sequelize, DataTypes) => {
    const item = sequelize.define('items', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        link: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        }
    });

    return item;
};


