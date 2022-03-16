module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define('todos', {
        headline: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
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
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notEmpty: true,
            isDate: true,
          },
        },
        completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
    });

    return todo;
};
