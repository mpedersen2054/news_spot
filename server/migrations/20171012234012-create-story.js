
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
                type: Sequelize.STRING(510)
            },
            description: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING(510)
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
            },
            headlineId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Headlines',
                    key: 'id',
                    as: 'headlineId'
                }
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Stories')
    }
}
