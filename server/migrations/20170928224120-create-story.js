module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Stories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING
            },
            publishedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            thumbnail: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING(510)
            },
            category: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING
            },
            headline: {
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
        return queryInterface.dropTable('Stories')
    }
}
