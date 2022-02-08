const db = require('../database/models');
const logger = require('loglevel');
const Item = db.item;

const moduleName = 'orders.repository.js -';

exports.create = async (item) => {
    return await Item.create({
        name: item.name,
        SKU: item.SKU,
        brand: item.brand,
        description: item.description,
        price: item.price,
        stock: item.stock,
        category: item.category,
    })
    .then((item) => {
        if (!item) {
            logger.error(`${moduleName} create item resulted in error, maybe wrong input?`);
            return JSON.stringify({message: 'Item creation failed!'});
        }
        logger.info(`${moduleName} created item: ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create item error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Item creation failed!'});
    });
};

exports.findAll = async () => {
    return await Item.findAll({
    })
    .then((items) => {
        logger.info(`${moduleName} retrieved items: ${JSON.stringify(items)}`);
        const converted = items.map(item => item.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll items: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Find all items failed!'});
    });
};

exports.update = async (id, item) => {
    return await Item.update({
        name: item.name,
        SKU: item.SKU,
        brand: item.brand,
        description: item.description,
        price: item.price,
        stock: item.stock,
        category: item.category,
    }, {
        where: {
            id: id
        }
    })
    .then((item) => {
        if (!item) {
            logger.error(`${moduleName} item to update not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'Item not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} updated item: ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} item update error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update item failed!'});
    });
};

exports.findById = async (id) => {
    return await Item.findByPk(id)
    .then((item) => {
        if (!item) {
            logger.error(`${moduleName} item to find not found, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'Item not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} retrieved items by id (${id}): ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find item: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update item failed!'});
    });
};

exports.delete = async (id) => {
    return await Item.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num === 1) {
            logger.error(`${moduleName} item to delete not found, id: ${JSON.stringify(id)}`);
        } else {
            logger.error(`${moduleName} item to delete not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: `Delete item failed, perhaps id doesnt match!`});
        }
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete item: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Delete item failed!'});
    });
};
