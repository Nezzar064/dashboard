const db = require('../database/models');
const logger = require('loglevel');
const TodoList = db.todoList;
const Todo = db.todo;

const moduleName = 'orders.repository.js -';

exports.create = async (todoList) => {
    return await TodoList.create({
        name: todoList.name,
        category: todoList.category,
        description: todoList.description,
        estimatedHrs: todoList.estimatedHrs,
        language: todoList.language,
        technologies: todoList.technologies
    })
    .then((todoList) => {
        if (!todoList) {
            logger.error(`${moduleName} create todoList resulted in error, maybe wrong input?`);
            return JSON.stringify({message: 'todoList creation failed!'});
        }
        logger.info(`${moduleName} created todoList: ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create todoList error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'todoList creation failed!'});
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
        logger.info(`${moduleName} retrieved todoLists: ${JSON.stringify(todoLists)}`);
        const converted = todoLists.map(todoList => todoList.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll todoLists: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Find all todoLists failed!'});
    });
};

exports.update = async (id, todoList) => {
    return await TodoList.update({
        name: todoList.name,
        category: todoList.category,
        description: todoList.description,
        estimatedHrs: todoList.estimatedHrs,
        language: todoList.language,
        technologies: todoList.technologies
    }, {
        where: {
            id: id
        }
    })
    .then((todoList) => {
        if (!todoList) {
            logger.error(`${moduleName} todoList to update not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'todoList not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} updated todoList: ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} todoList update error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update todoList failed!'});
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
            logger.error(`${moduleName} todoList to find not found, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'todoList not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} retrieved todoLists by id (${id}): ${JSON.stringify(todoList)}`);
        return todoList.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find todoList: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update todoList failed!'});
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
            logger.error(`${moduleName} todoList to delete not found, id: ${JSON.stringify(id)}`);
        } else {
            logger.error(`${moduleName} todoList to delete not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: `Delete todoList failed, perhaps id doesnt match!`});
        }
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete todoList: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Delete todoList failed!'});
    });
};
