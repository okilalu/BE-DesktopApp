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
    speed,
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
      speed,
    });
    return addDevice;
  }
  static async updateDevice({
    id,
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
    const updateDevice = await device.update(
      {
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
      },
      { where: { id: id } }
    );
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
  static async deleteDevice({ id }) {
    const deletedDevice = await device.destroy({
      where: { id: id },
    });
    return deletedDevice;
  }
  static async addDeviceToList({ samId }) {
    const addDeviceToList = await device.findOne({ where: { samId: samId } });
    return addDeviceToList;
  }
  static async findOneDevice({ id }) {
    const getDevice = await device.findOne({ where: { id: id } });
    return getDevice;
  }
  static async getTotalRecord() {
    const getTotalRecord = await device.findAll();
    return getTotalRecord;
  }
  static async getAverageSpeed() {
    const getAverageSpeed = await device.findAll();
    return getAverageSpeed;
  }
  static async getOverSpeed({ samId }) {
    const getOverSpeed = await device.findOne({ where: { samId: samId } });
    return getOverSpeed;
  }
}
module.exports = DeviceRepositories;
