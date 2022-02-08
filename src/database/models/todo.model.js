module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define('todos', {
        headline: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
    });

    return todo;
};
