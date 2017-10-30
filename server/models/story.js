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
            type: DataTypes.STRING(510), // sometimes the url is long...
            allowNull: false,
            defaultValue: false,
        },
        description: {
            type: DataTypes.STRING(510),
            allowNull: false,
            defaultValue: false,
        }
    })

    Story.associate = (models) => {
        Story.belongsTo(models.Outlet, {
            foreignKey: 'outletId',
            onDelete: 'CASCADE',
            as: 'storyOutlet'
        })
        Story.belongsTo(models.Headline, {
            foreignKey: 'headlineId',
            onDelete: 'CASCADE',
            as: 'storyHeadline'
        })
    }

    return Story
}
