const repository = require('../repository/item.repository');

const create = async (item) => {

    return await repository.create(item);
};

