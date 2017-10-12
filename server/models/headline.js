module.exports = (sequelize, DataTypes) => {
    var Headline = sequelize.define('Headline', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        category: {
            type: DataTypes.STRING(55),
            allowNull: false,
            defaultValue: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }
    })

    Headline.associate = (models) => {
        Headline.hasMany(models.Story, {
            foreignKey: 'headlineId',
            as: 'headlineStories'
        })
        Headline.belongsTo(models.Outlet, {
            foreignKey: 'outletId',
            onDelete: 'CASCADE'
        })
    }

    return Headline
}
