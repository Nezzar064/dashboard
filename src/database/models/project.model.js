module.exports = (sequelize, DataTypes) => {
    const project = sequelize.define('projects', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
          },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        estimatedHrs: {
          type: DataTypes.STRING,
          allowNull: false
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
          }
    });

    return project;
};
