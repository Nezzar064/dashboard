const db = require('../models');
const logger = require('../helpers/logger.js');
const TodoList = db.todoList;
const Todo = db.todo;

const moduleName = 'orders.repository.js -';

exports.create = async (todoList) => {
    return await TodoList.create({
        name: todoList.name,
        completed: todoList.completed,
    })
    .then((todoList) => {
        if (!todoList) {
            logger.info(`${moduleName} create todoList no response from db`);
            return;
        }
        logger.info(`${moduleName} created todoList | ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create todoList error | ${JSON.stringify(err)}`);
        return;
    });
};

exports.findAll = async () => {
    return await TodoList.findAll({
        include: [
            {
                model: Todo,
                as: 'todos',
                attributes: ["id", "headline", "description", "date", "completed"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
    .then((todoLists) => {
        if (!todoLists) {
            logger.info(`${moduleName} no todolists present in db`);
            return;
        }
        logger.info(`${moduleName} retrieved todoLists | ${JSON.stringify(todoLists)}`);
        const converted = todoLists.map(todoList => todoList.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll todoLists | ${JSON.stringify(err)}`);
        return;
    });
};

exports.update = async (id, todoList) => {
    return await TodoList.update({
        name: todoList.name,
        completed: todoList.completed,
    }, {
        where: {
            id: id
        }
    })
    .then((todoList) => {
        if (!todoList) {
            logger.info(`${moduleName} todoList to update not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} updated todoList: ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on todoList update | ${JSON.stringify(err)}`);
        return;
    });
};

exports.findById = async (id) => {
    return await TodoList.findByPk(id, {
        include: [
            {
                model: Todo,
                as: 'todos',
                attributes: ["id", "headline", "description", "date", "completed"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
    .then((todoList) => {
        if (!todoList) {
            logger.info(`${moduleName} todoList not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} retrieved todoList by id: ${id} | ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find todoList | ${JSON.stringify(err)}`);
        return;
    });
};

exports.delete = async (id) => {
    return await TodoList.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num === 1) {
            logger.info(`${moduleName} delete todolist success | id: ${id}`);
            return JSON.stringify({message: 'Todolist deleted successfully'});
        } else {
            logger.info(`${moduleName} todoList to delete not found | id: ${id}`);
            return;
        }
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete todoList | ${JSON.stringify(err)}`);
        return;
    });
};
