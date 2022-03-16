const db = require('../database/models');
const logger = require('../helpers/logger.js');
const Item = db.item;

const moduleName = 'orders.repository.js -';

exports.create = async (item) => {
    return await Item.create({
        name: item.name,
        brand: item.link,
        description: item.description,
        price: item.price,
        category: item.category,
    })
    .then((item) => {
        if (!item) {
            logger.info(`${moduleName} create item no response from db`);
            return;
        }
        logger.info(`${moduleName} created item | ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on create item | ${JSON.stringify(err)}`);
        return;
    });
};

exports.findAll = async () => {
    return await Item.findAll({
    })
    .then((items) => {
        if (!items) {
            logger.info(`${moduleName} no items present in db`);
            return;
        }
        logger.info(`${moduleName} retrieved items | ${JSON.stringify(items)}`);
        const converted = items.map(item => item.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll items | ${JSON.stringify(err)}`);
        return;
    });
};

exports.update = async (id, item) => {
    return await Item.update({
        name: item.name,
        brand: item.link,
        description: item.description,
        price: item.price,
        category: item.category,
    }, {
        where: {
            id: id
        }
    })
    .then((item) => {
        if (!item) {
            logger.info(`${moduleName} item to update not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} updated item: ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} item update error: ${JSON.stringify(err)}`);
        return;
    });
};

exports.findById = async (id) => {
    return await Item.findByPk(id)
    .then((item) => {
        if (!item) {
            logger.info(`${moduleName} item not present in db | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} retrieved item by id: ${id} | ${JSON.stringify(item)}`);
        return item.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find item | ${JSON.stringify(err)}`);
        return;
    });
};

exports.delete = async (id) => {
    return await Item.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num !== 1) {
            logger.info(`${moduleName} item to delete not found | id: ${id}`);
            return;
        } 
        logger.info(`${moduleName} delete item success, id: ${id}`);
        return JSON.stringify({message: 'Item deleted successfully'});
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete item: ${JSON.stringify(err)}`);
        return;
    });
};
