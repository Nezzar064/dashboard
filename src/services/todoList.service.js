const repository = require('../repository/todoList.repository');

const create = async (todoList) => {
    return await repository.create(todoList);
};

const findAll = async () => {
    return await repository.findAll();
};

const update = async (id, todoList) => {
    return await repository.update(id, todoList);
};

const findById = async (id) => {
    return await repository.findById(id);
};

const delete_ = async (id) => {
    return await repository.delete(id);
};