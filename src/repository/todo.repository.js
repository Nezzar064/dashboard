const db = require('../database/models');
const logger = require('../helpers/logger.js');
const Todo = db.todo;

const moduleName = 'orders.repository.js -';

exports.create = async (todo, todoListId) => {
    return await Todo.create({
        headline: todo.headline,
        description: todo.description,
        date: todo.date,
        completed: todo.completed,
        todoListId: todoListId,
    })
    .then((todo) => {
        if (!todo) {
            logger.info(`${moduleName} create todo no response from db`);
            return;
        }
        logger.info(`${moduleName} created todo | ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create todo error | ${JSON.stringify(err)}`);
        return;
    });
};

exports.findAll = async () => {
    return await Todo.findAll({
    })
    .then((todos) => {
        if (!todos) {
            logger.info(`${moduleName} no todos present in db`);
            return;
        }
        logger.info(`${moduleName} retrieved todos | ${JSON.stringify(todos)}`);
        const converted = todos.map(todo => todo.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll todos | ${JSON.stringify(err)}`);
        return;
    });
};

exports.update = async (id, todo) => {
    return await Todo.update({
        headline: todo.headline,
        description: todo.description,
        date: todo.date,
        completed: todo.completed,
    }, {
        where: {
            id: id
        }
    })
    .then((todo) => {
        if (!todo) {
            logger.info(`${moduleName} todo to update not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} updated todo | ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on todo update | ${JSON.stringify(err)}`);
        return;
    });
};

exports.findById = async (id) => {
    return await Todo.findByPk(id, { include: ["todoList"] })
    .then((todo) => {
        if (!todo) {
            logger.info(`${moduleName} todo not present in db | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} retrieved todo by id: ${id} | ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find todo | ${JSON.stringify(err)}`);
        return;
    });
};

exports.delete = async (id) => {
    return await Todo.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num !== 1) {
            logger.error(`${moduleName} todo to delete not found | id: ${id}`);
            return;
        } 
        logger.info(`${moduleName} delete todo success | id: ${id}`);
        return JSON.stringify({message: 'Todo deleted successfully'});   
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete todo | ${JSON.stringify(err)}`);
        return;
    });
};
