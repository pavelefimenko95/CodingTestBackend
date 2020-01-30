'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('Owners', 'addedColumn2', {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'default',
            allowNull: false,
            notEmpty: true,
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.removeColumn('Owners', 'addedColumn2'),
};
