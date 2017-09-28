module.exports = (sequelize, DataTypes) => {
    var Story = sequelize.define('Story', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        description: {
            type: DataTypes.STRING(510),
            allowNull: false,
            defaultValue: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        headline: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        }
    })

    Story.associate = (models) => {
        Story.belongsTo(models.Outlet, {
            foreignKey: 'outletId',
            onDelete: 'CASCADE'
        })
    }

    return Story
}
