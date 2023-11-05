const {DataTypes} = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        paragraph: {type: DataTypes.STRING, allowNull: false},
        title: {type: DataTypes.STRING, allowNull: false},
        translate: {type: DataTypes.STRING, allowNull: true},
        categoryId: {type: DataTypes.NUMBER, allowNull: true},
        level: {type: DataTypes.NUMBER, allowNull: true}
    };

    return sequelize.define("reading", attributes);
}
