module.exports = (sequelize, DataTypes) => {
    const todoList = sequelize.define('todo_lists', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
    });

    return item;
};
