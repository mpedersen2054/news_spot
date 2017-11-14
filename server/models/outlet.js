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
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }
    })

    Outlet.associate = (models) => {
        Outlet.hasMany(models.Story, {
            foreignKey: 'outletId',
            as: 'outletStories'
        })
        Outlet.hasMany(models.Headline, {
            foreignKey: 'outletId',
            as: 'outletHeadlines'
        })
    }

    return Outlet
}
