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
  static async updateDevice({
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
    const getDevice = await device.findOne({ where: { deviceId: deviceId } });
    const updateDevice = await getDevice.update({
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
    return updateDevice;
  }
  static async existingDevice({ samId }) {
    const existingDevice = await device.findOne({ where: { samId: samId } });
    return existingDevice;
  }
  static async getAllDevice() {
    const getAllDevice = await device.findAll();
    return getAllDevice;
  }
  static async addDeviceToList({ samId }) {
    const addDeviceToList = await device.findOne({ where: { samId: samId } });
    return addDeviceToList;
  }
}
module.exports = DeviceRepositories;
