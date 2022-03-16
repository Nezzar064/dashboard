module.exports = (sequelize, DataTypes) => {
    const project = sequelize.define('projects', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        estimatedHrs: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isInt: true,
            notEmpty: true,
          },
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
    });

    return project;
};
