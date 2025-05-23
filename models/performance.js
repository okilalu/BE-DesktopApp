"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      performance.belongsTo(models.device, {
        foreignKey: "deviceId",
      });
    }
  }
  performance.init(
    {
      speed: DataTypes.FLOAT,
      totalRecord: DataTypes.FLOAT,
      averageSpeed: DataTypes.FLOAT,
      overSpeed: DataTypes.FLOAT,
      deviceId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "performance",
    }
  );
  return performance;
};
