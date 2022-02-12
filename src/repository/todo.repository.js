const db = require('../database/models');
const logger = require('loglevel');
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
            logger.error(`${moduleName} create todo resulted in error, maybe wrong input?`);
            return JSON.stringify({message: 'todo creation failed!'});
        }
        logger.info(`${moduleName} created todo: ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create todo error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'todo creation failed!'});
    });
};

exports.findAll = async () => {
    return await Todo.findAll({
    })
    .then((todos) => {
        logger.info(`${moduleName} retrieved todos: ${JSON.stringify(todos)}`);
        const converted = todos.map(todo => todo.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll todos: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Find all todos failed!'});
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
            logger.error(`${moduleName} todo to update not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'todo not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} updated todo: ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} todo update error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update todo failed!'});
    });
};

exports.findById = async (id) => {
    return await Todo.findByPk(id)
    .then((todo) => {
        if (!todo) {
            logger.error(`${moduleName} todo to find not found, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'todo not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} retrieved todos by id (${id}): ${JSON.stringify(todo)}`);
        return todo.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find todo: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update todo failed!'});
    });
};

exports.delete = async (id) => {
    return await Todo.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num === 1) {
            logger.error(`${moduleName} todo to delete not found, id: ${JSON.stringify(id)}`);
        } else {
            logger.error(`${moduleName} todo to delete not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: `Delete todo failed, perhaps id doesnt match!`});
        }
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete todo: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Delete todo failed!'});
    });
};
