const DeviceRepositories = require("../repositories/deviceRepositories");
const { v4: uuidv4 } = require("uuid");

class DeviceServices {
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
    try {
      if (
        !samId ||
        !deviceIP ||
        !deviceUsername ||
        !deviceRootFolder ||
        !cameraIP ||
        !cameraUsername ||
        !cameraPassword ||
        !cameraRootFolder ||
        !cameraType ||
        !location
      ) {
        return {
          status: false,
          status_code: 400,
          message: "Fields are required",
          data: { device: null },
        };
      }
      const existingDevice = await DeviceRepositories.existingDevice({
        samId,
      });
      if (existingDevice) {
        return {
          status: false,
          status_code: 400,
          message: "Device has been added",
          data: { device: null },
        };
      }
      const addDevice = await DeviceRepositories.addDevice({
        deviceId: uuidv4(),
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
      return {
        status: true,
        status_code: 201,
        message: "device successfully added",
        data: { device: addDevice },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
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
    try {
      const getDevice = await DeviceRepositories.findOneDevice({ id });
      if (!getDevice) {
        return {
          status: false,
          status_code: 401,
          message: "Can't find device",
          data: { device: null },
        };
      }
      const updateDevice = await DeviceRepositories.updateDevice({
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
      });
      return {
        status: true,
        status_code: 200,
        message: "Succesfully updated device",
        data: { device: updateDevice },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
  }
  static async deleteDevice({ id }) {
    try {
      const getDevice = await DeviceRepositories.findOneDevice({ id });
      console.log("getDevice", getDevice);
      if (!getDevice) {
        return {
          status: false,
          status_code: 401,
          message: "Can't find device to delete",
          data: { device: null },
        };
      }
      const deletedDevice = await DeviceRepositories.deleteDevice({ id });
      return {
        status: true,
        status_code: 200,
        message: "Successfully deleted device",
        data: { device: deletedDevice },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
  }
  static async getAllDevice() {
    try {
      const getAllDevice = await DeviceRepositories.getAllDevice();
      if (getAllDevice) {
        return {
          status: true,
          status_code: 201,
          message: "Succesfully get all device",
          data: { user: getAllDevice },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
  }
  static async addDeviceTolist({ samId }) {
    try {
      if (!samId) {
        return {
          status: false,
          status_code: 400,
          message: "SAMID not in the list",
          data: { device: null },
        };
      }
      const addDeviceToList = await DeviceRepositories.addDeviceToList({
        samId,
      });
      if (addDeviceToList) {
        return {
          status: true,
          status_code: 201,
          message: "Succesfully added device to list",
          data: { device: addDeviceToList },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
  }
}
module.exports = DeviceServices;
