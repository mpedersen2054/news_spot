module.exports = (sequelize, DataTypes) => {
    var Outlet = sequelize.define('Outlet', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        leaning: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }
    })

    Outlet.associate = (models) => {
        Outlet.hasMany(models.Story, {
            foreignKey: 'storyId',
            as: 'outletStories'
        })
    }

    return Outlet
}
