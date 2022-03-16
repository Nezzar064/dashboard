module.exports = (sequelize, DataTypes) => {
    const todoList = sequelize.define('todo_lists', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
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

    return todoList;
};
