const router = require('express').Router();
const service = require('../services/todoList.service');
const logger = require('../helpers/logger');

const moduleName = 'todoList.controller.js - ';

router.use('/api/todoLists');

router.get('/', async (req, res) => {
    logger.debug(`${moduleName} GET /todoLists`);

    await service.findAll()
    .then(todoLists => {
        if (!todoLists) {
            logger.info(`${moduleName} GET /todoLists returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /todoLists response | ${JSON.stringify(todoLists)}`);
        res.status(200).send(todoLists);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /todoLists unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.post('/', async (req, res) => {
    logger.info(`${moduleName} POST /todoLists body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(todoList => {
        if (!todoList) {
            logger.info(`${moduleName} POST /todoList returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} POST /todoList response | ${JSON.stringify(todoList)}`);
        res.status(200).send(todoList);
    })
    .catch((err) => {
        logger.error(`${moduleName} POST /todoList unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.get('/:id', async (req, res) => {
    logger.info(`${moduleName} GET /todoLists body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(todoList => {
        if (!todoList) {
            logger.info(`${moduleName} GET /todoList/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /todoList/:id response | ${JSON.stringify(todoList)}`);
        res.status(200).send(todoList);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /todoList/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.put('/:id', async (req, res) => {
    logger.info(`${moduleName} PUT /todoList/:id | id, body | ${req.params.id} | ${JSON.stringify(req.body)}`);

    await service.update(id, req.body)
    .then(todoList => {
        if (!todoList) {
            logger.info(`${moduleName} PUT /todoList/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} PUT /todoList/:id response | ${JSON.stringify(todoList)}`);
        res.status(200).send(todoList);
    })
    .catch((err) => {
        logger.error(`${moduleName} PUT /todoList/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.delete('/:id', async (req, res) => {
    logger.info(`${moduleName} DELETE /todoList/:id | id: ${req.params.id}`);

    await service.create(req.body)
    .then(todoList => {
        if (!todoList) {
            logger.info(`${moduleName} DELETE /todoList/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} DELETE /todoList/:id response | ${JSON.stringify(todoList)}`);
        res.status(200).send(todoList);
    })
    .catch((err) => {
        logger.error(`${moduleName} DELETE /todoList unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});