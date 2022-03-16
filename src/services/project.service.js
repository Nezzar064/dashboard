const repository = require('../repository/project.repository');

const create = async (project) => {
    return await repository.create(project);
};

const findAll = async () => {
    return await repository.findAll();
};

const update = async (id, project) => {
    return await repository.update(id, project);
};

const findById = async (id) => {
    return await repository.findById(id);
};

const delete_ = async (id) => {
    return await repository.delete(id);
};