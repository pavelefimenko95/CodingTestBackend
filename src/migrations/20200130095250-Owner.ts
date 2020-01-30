'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('Owners', 'addedColumn', {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'default',
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.removeColumn('Owners', 'addedColumn'),
};
