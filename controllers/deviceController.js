const DeviceServices = require("../services/deviceServices");

const addDevice = async (req, res) => {
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
  const { status, status_code, message, data } = await DeviceServices.addDevice(
    {
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
    }
  );
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};
const getAllDevice = async (req, res) => {
  const { status, status_code, message, data } =
    await DeviceServices.getAllDevice();
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};

const addDeviceToList = async (req, res) => {
  const { samId } = req.body;
  const { status, status_code, message, data } =
    await DeviceServices.addDeviceTolist({ samId });
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};
module.exports = { addDevice, getAllDevice, addDeviceToList };
