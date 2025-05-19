"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  device.init(
    {
      deviceId: DataTypes.STRING,
      samId: DataTypes.STRING,
      deviceIP: DataTypes.STRING,
      deviceUsername: DataTypes.STRING,
      deviceRootFolder: DataTypes.STRING,
      cameraIP: DataTypes.STRING,
      cameraUsername: DataTypes.STRING,
      cameraPassword: DataTypes.STRING,
      cameraRootFolder: DataTypes.STRING,
      cameraType: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "device",
    }
  );
  return device;
};
