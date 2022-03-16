const router = require('express').Router();
const service = require('../services/todo.service');
const logger = require('../helpers/logger');

const moduleName = 'todo.controller.js - ';

router.use('/api/todos');

router.get('/', async (req, res) => {
    logger.debug(`${moduleName} GET /todos`);

    await service.findAll()
    .then(todos => {
        if (!todos) {
            logger.info(`${moduleName} GET /todos returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /todos response | ${JSON.stringify(todos)}`);
        res.status(200).send(todos);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /todos unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.post('/', async (req, res) => {
    logger.info(`${moduleName} POST /todos body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(todo => {
        if (!todo) {
            logger.info(`${moduleName} POST /todos returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /todos response | ${JSON.stringify(todo)}`);
        res.status(200).send(todo);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /todos unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.get('/:id', async (req, res) => {
    logger.info(`${moduleName} POST /todos body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(todo => {
        if (!todo) {
            logger.info(`${moduleName} GET /todos/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /todos/:id response | ${JSON.stringify(todo)}`);
        res.status(200).send(todo);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /todos/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.put('/:id', async (req, res) => {
    logger.info(`${moduleName} PUT /todos/:id | id, body | ${req.params.id} | ${JSON.stringify(req.body)}`);

    await service.update(id, req.body)
    .then(todo => {
        if (!todo) {
            logger.info(`${moduleName} PUT /todos/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} PUT /todos/:id response | ${JSON.stringify(todo)}`);
        res.status(200).send(todo);
    })
    .catch((err) => {
        logger.error(`${moduleName} PUT /todos/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.delete('/:id', async (req, res) => {
    logger.info(`${moduleName} DELETE /todos/:id | id: ${req.params.id}`);

    await service.create(req.body)
    .then(todo => {
        if (!todo) {
            logger.info(`${moduleName} DELETE /todos/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} DELETE /todo/:id response | ${JSON.stringify(todo)}`);
        res.status(200).send(todo);
    })
    .catch((err) => {
        logger.error(`${moduleName} DELETE /todos unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});