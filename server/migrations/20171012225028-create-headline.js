module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Headlines', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING
            },
            category: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING(55)
            },
            url: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            outletId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Outlets',
                    key: 'id',
                    as: 'outletId'
                }
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Headlines')
    }
}
