const { DataTypes } = require('sequelize')

module.exports = model

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
        isActivated: { type: DataTypes.BOOLEAN, allowNull: true },
        ownerId: { type: DataTypes.INTEGER, allowNull: false }
    }

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] },
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {} },
        },
    }

    return sequelize.define('group', attributes, options)
}
