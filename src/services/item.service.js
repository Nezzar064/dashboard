const repository = require('../repository/item.repository');

const create = async (item) => {
    return await repository.create(item);
};

const findAll = async () => {
    return await repository.findAll();
};

const update = async (id, item) => {
    return await repository.update(id, item);
};

const findById = async (id) => {
    return await repository.findById(id);
};

const delete_ = async (id) => {
    return await repository.delete(id);
};
