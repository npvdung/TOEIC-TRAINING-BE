const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        categoryName: { type: DataTypes.STRING, allowNull: false },
        questionRequest: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.BOOLEAN, allowNull: true }
    };

    return sequelize.define('category', attributes);
}