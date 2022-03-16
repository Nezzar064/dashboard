const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.item = require('../models/item.model')(sequelize, Sequelize);
db.project = require('../models/project.model')(sequelize, Sequelize);
db.todo = require('../models/todo.model')(sequelize, Sequelize);
db.todoList = require('../models/todoList.model')(sequelize, Sequelize);


db.todoList.hasMany(db.todo, {
    as: 'todos',
});

db.todo.belongsTo(db.todoList, {
    foreignKey: 'todoListId',
    as: 'todos',
});


module.exports = db;
