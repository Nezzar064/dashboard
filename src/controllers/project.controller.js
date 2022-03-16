const router = require('express').Router();
const service = require('../services/project.service');
const logger = require('../helpers/logger');

const moduleName = 'project.controller.js - ';

router.use('/api/projects');

router.get('/', async (req, res) => {
    logger.debug(`${moduleName} GET /projects`);

    await service.findAll()
    .then(projects => {
        if (!projects) {
            logger.info(`${moduleName} GET /projects returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /projects response | ${JSON.stringify(projects)}`);
        res.status(200).send(projects);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /projects unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.post('/', async (req, res) => {
    logger.info(`${moduleName} POST /projects body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(project => {
        if (!project) {
            logger.info(`${moduleName} POST /projects returned empty response`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /projects response | ${JSON.stringify(project)}`);
        res.status(200).send(project);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /projects unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.get('/:id', async (req, res) => {
    logger.info(`${moduleName} POST /projects body | ${JSON.stringify(req.body)}`);

    await service.create(req.body)
    .then(project => {
        if (!project) {
            logger.info(`${moduleName} GET /projects/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} GET /projects/:id response | ${JSON.stringify(project)}`);
        res.status(200).send(project);
    })
    .catch((err) => {
        logger.error(`${moduleName} GET /projects/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.put('/:id', async (req, res) => {
    logger.info(`${moduleName} PUT /projects/:id | id, body | ${req.params.id} | ${JSON.stringify(req.body)}`);

    await service.update(id, req.body)
    .then(project => {
        if (!project) {
            logger.info(`${moduleName} PUT /projects/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} PUT /projects/:id response | ${JSON.stringify(project)}`);
        res.status(200).send(project);
    })
    .catch((err) => {
        logger.error(`${moduleName} PUT /projects/:id unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});

router.delete('/:id', async (req, res) => {
    logger.info(`${moduleName} DELETE /projects/:id | id: ${req.params.id}`);

    await service.create(req.body)
    .then(project => {
        if (!project) {
            logger.info(`${moduleName} DELETE /projects/:id returned empty response | id: ${req.params.id}`);
            res.status(400).send('Empty response from server');
        }
        logger.info(`${moduleName} DELETE /project/:id response | ${JSON.stringify(project)}`);
        res.status(200).send(project);
    })
    .catch((err) => {
        logger.error(`${moduleName} DELETE /projects unexpected error | ${JSON.stringify(err)}`);
        res.status(500).send('Internal Error');
    });
});