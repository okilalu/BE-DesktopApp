const DeviceServices = require("../services/deviceServices");

module.exports = {
  async addDevice(req, res) {
    const {
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
    } = req.body;
    const { status, status_code, message, data } =
      await DeviceServices.addDevice({
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
    res.status(status_code).send({
      status,
      status_code,
      message,
      data,
    });
  },
};
