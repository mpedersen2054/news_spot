module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Outlets', {
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
            leaning: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.STRING(1)
            },
            website: {
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
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Outlets')
    }
}
