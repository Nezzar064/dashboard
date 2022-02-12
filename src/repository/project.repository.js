const db = require('../database/models');
const logger = require('loglevel');
const Project = db.project;

const moduleName = 'orders.repository.js -';

exports.create = async (project) => {
    return await Project.create({
        name: project.name,
        category: project.category,
        description: project.description,
        estimatedHrs: project.estimatedHrs,
        language: project.language,
        technologies: project.technologies
    })
    .then((project) => {
        if (!project) {
            logger.error(`${moduleName} create project resulted in error, maybe wrong input?`);
            return JSON.stringify({message: 'project creation failed!'});
        }
        logger.info(`${moduleName} created project: ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create project error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'project creation failed!'});
    });
};

exports.findAll = async () => {
    return await Project.findAll({
    })
    .then((projects) => {
        logger.info(`${moduleName} retrieved projects: ${JSON.stringify(projects)}`);
        const converted = projects.map(project => project.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll projects: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Find all projects failed!'});
    });
};

exports.update = async (id, project) => {
    return await Project.update({
        name: project.name,
        category: project.category,
        description: project.description,
        estimatedHrs: project.estimatedHrs,
        language: project.language,
        technologies: project.technologies
    }, {
        where: {
            id: id
        }
    })
    .then((project) => {
        if (!project) {
            logger.error(`${moduleName} project to update not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'project not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} updated project: ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} project update error: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update project failed!'});
    });
};

exports.findById = async (id) => {
    return await Project.findByPk(id)
    .then((project) => {
        if (!project) {
            logger.error(`${moduleName} project to find not found, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: 'project not found, perhaps id doesnt match!'});
        }
        logger.info(`${moduleName} retrieved projects by id (${id}): ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find project: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Update project failed!'});
    });
};

exports.delete = async (id) => {
    return await Project.destroy({
        where: {
            id: id
        }
    })
    .then((num) => {
        if (num === 1) {
            logger.error(`${moduleName} project to delete not found, id: ${JSON.stringify(id)}`);
        } else {
            logger.error(`${moduleName} project to delete not found / an error occured, id: ${JSON.stringify(id)}`);
            return JSON.stringify({message: `Delete project failed, perhaps id doesnt match!`});
        }
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete project: ${JSON.stringify(err)}`);
        return JSON.stringify({message: 'Delete project failed!'});
    });
};
