const { device } = require("../models");

class DeviceRepositories {
  static async addDevice({
    deviceId,
    samId,
    deviceIP,
    deviceUsername,
    deviceRootFolder,
    cameraIP,
    cameraUsername,
    cameraPassword,
    cameraRootFolder,
    cameraType,
    location,
  }) {
    const addDevice = await device.create({
      deviceId,
      samId,
      deviceIP,
      deviceUsername,
      deviceRootFolder,
      cameraIP,
      cameraUsername,
      cameraPassword,
      cameraRootFolder,
      cameraType,
      location,
    });
    return addDevice;
  }
  static async existingDevice({ samId }) {
    const existingDevice = await device.findOne({ where: { samId: samId } });
    return existingDevice;
  }
  static async addDeviceToList() {
    const addDeviceToList = await device.findAll();
    return addDeviceToList;
  }
}
module.exports = DeviceRepositories;
