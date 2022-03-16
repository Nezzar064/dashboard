const router = require('express').Router();
const service = require('../services/item.service');
const logger = require('../helpers/logger');

const moduleName = 'item.controller.js - ';

router.use('/api/items');

router.get('/', async (req, res) => {
    logger.debug(`${moduleName} GET /items`);

    await service.findAll()
    .then(items => {
        if (!items) {
            logger.info(`${moduleName} GET /items returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /items response | ${JSON.stringify(items)}`);
        res.status(200).send(items);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /items unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.post('/', async (req, res) => {
    logger.info(`${moduleName} POST /items body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(item => {
        if (!item) {
            logger.info(`${moduleName} POST /items returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /items response | ${JSON.stringify(item)}`);
        res.status(200).send(item);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /items unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.get('/:id', async (req, res) => {
    logger.info(`${moduleName} POST /items body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(item => {
        if (!item) {
            logger.info(`${moduleName} GET /items/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /items/:id response | ${JSON.stringify(item)}`);
        res.status(200).send(item);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /items/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.put('/:id', async (req, res) => {
    logger.info(`${moduleName} PUT /items/:id | id, body | ${req.params.id} | ${JSON.stringify(req.body)}`);

    await service.update(id, req.body)
    .then(item => {
        if (!item) {
            logger.info(`${moduleName} PUT /items/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} PUT /items/:id response | ${JSON.stringify(item)}`);
        res.status(200).send(item);
    })
    .catch((err) => {
        logger.error(`${moduleName} PUT /items/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.delete('/:id', async (req, res) => {
    logger.info(`${moduleName} DELETE /items/:id | id: ${req.params.id}`);

    await service.create(req.body)
    .then(item => {
        if (!item) {
            logger.info(`${moduleName} DELETE /items/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} DELETE /item/:id response | ${JSON.stringify(item)}`);
        res.status(200).send(item);
    })
    .catch((err) => {
        logger.error(`${moduleName} DELETE /items unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});