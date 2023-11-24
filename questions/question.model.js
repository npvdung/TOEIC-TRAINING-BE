const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    questionName: { type: DataTypes.STRING, allowNull: true },
    questionType: { type: DataTypes.NUMBER, allowNull: false },
    questionTitle: { type: DataTypes.STRING, allowNull: true },
    questionContent: { type: DataTypes.STRING, allowNull: true },
    questionDescription: { type: DataTypes.STRING, allowNull: true },
    questionLevel: { type: DataTypes.NUMBER, allowNull: false },
    questionCategory: { type: DataTypes.NUMBER, allowNull: true },
    questionAnswer: { type: DataTypes.STRING, allowNull: false },
    questionPoint: { type: DataTypes.NUMBER, allowNull: false },
    readingId: { type: DataTypes.NUMBER, allowNull: true },
    explanation: { type: DataTypes.STRING, allowNull: true },
    createdBy: { type: DataTypes.NUMBER, allowNull: false },
  };

  return sequelize.define("question", attributes);
}
