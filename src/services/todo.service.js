const repository = require('../repository/todo.repository');

const create = async (todo) => {
    return await repository.create(todo);
};

const findAll = async () => {
    return await repository.findAll();
};

const update = async (id, todo) => {
    return await repository.update(id, todo);
};

const findById = async (id) => {
    return await repository.findById(id);
};

const delete_ = async (id) => {
    return await repository.delete(id);
};