const db = require('../models');
const logger = require('../helpers/logger.js');
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
            logger.info(`${moduleName} create project no response from db`);
            return;
        }
        logger.info(`${moduleName} created project | ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected create project error: ${JSON.stringify(err)}`);
        return;
    });
};

exports.findAll = async () => {
    return await Project.findAll({
    })
    .then((projects) => {
        if (!projects) {
            logger.info(`${moduleName} no projects present in db`);
            return;
        }
        logger.info(`${moduleName} retrieved projects | ${JSON.stringify(projects)}`);
        const converted = projects.map(project => project.get({ plain: true}));
        return converted;
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on findAll projects | ${JSON.stringify(err)}`);
        return;
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
            logger.info(`${moduleName} project to update not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} updated project: ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} project update error: ${JSON.stringify(err)}`);
        return;
    });
};

exports.findById = async (id) => {
    return await Project.findByPk(id)
    .then((project) => {
        if (!project) {
            logger.info(`${moduleName} project to find not found | id: ${id}`);
            return;
        }
        logger.info(`${moduleName} retrieved projects by id: ${id} | ${JSON.stringify(project)}`);
        return project.get({ plain: true });
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on find project | ${JSON.stringify(err)}`);
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
        if (num !== 1) {
            logger.info(`${moduleName} project to delete not found | id: ${id}`);
            return;
        } 
        logger.info(`${moduleName} delete project success | id: ${id}`);
        return JSON.stringify({message: 'Project deleted successfully'}); 
    })
    .catch((err) => {
        logger.error(`${moduleName} unexpected error on delete project | ${JSON.stringify(err)}`);
        return;
    });
};
