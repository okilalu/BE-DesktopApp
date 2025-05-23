const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 2090;
// require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const UserController = require("./controllers/userController");
const DeviceController = require("./controllers/deviceController");
const PerformanceController = require("./controllers/performanceController");
const middleware = require("./middleware/auth");
const { device } = require("./models");
const { performance } = require("./models");

app.get("/seed", async (req, res) => {
  await device.bulkCreate([
    // { samId: "SAM01", speed: 38 },
    // { samId: "SAM01", speed: 38 },
    // { samId: "SAM02", speed: 20 },
    // { samId: "SAM02", speed: 99 },
    // { samId: "SAM03", speed: 38 },
    // { samId: "SAM03", speed: 99 },
    {
      samId: "SAM01",
      deviceIP: "192.121.22.1",
      deviceUsername: "admin",
      devicePassword: "Admin1234",
      deviceRootFolder: "/A",
      cameraIP: "192.121.22.1",
      cameraUsername: "root",
      cameraPassword: "Admin1234",
      cameraRootFolder: "/A/a",
      cameraType: "sony",
      location: "amman",
      speed: 40,
    },
    {
      samId: "SAM02",
      deviceIP: "192.121.22.1",
      deviceUsername: "admin",
      devicePassword: "Admin1234",
      deviceRootFolder: "/A",
      cameraIP: "192.121.22.1",
      cameraUsername: "root",
      cameraPassword: "Admin1234",
      cameraRootFolder: "/A/a",
      cameraType: "sony",
      location: "amman",
      speed: 99,
    },
    {
      samId: "SAM03",
      deviceIP: "192.121.22.1",
      deviceUsername: "admin",
      devicePassword: "Admin1234",
      deviceRootFolder: "/A",
      cameraIP: "192.121.22.1",
      cameraUsername: "root",
      cameraPassword: "Admin1234",
      cameraRootFolder: "/A/a",
      cameraType: "sony",
      location: "amman",
      speed: 99,
    },
  ]);
  res.status(200).send({
    message: "Successfully",
  });
});
app.get("/speed", async (req, res) => {
  await performance.bulkCreate([{ speed: 38 }, { speed: 38 }, { speed: 38 }]);
  res.status(200).send({
    message: "Successfully",
  });
});
// User
app.post("/api/v1/register/user", UserController.createUser);
app.post(
  "/api/v1/login/user",
  UserController.login,
  middleware.authentication,
  middleware.isAdmin
);
app.get(
  "/api/v1/getAll/user",
  UserController.getAllUser,
  middleware.authentication,
  middleware.isAdmin
);
app.put(
  "/api/v1/update/user/:id",
  UserController.updateUser,
  middleware.authentication
);
app.delete(
  "/api/v1/delete/user/:id",
  UserController.deleteUser,
  middleware.authentication,
  middleware.isAdmin
);

// Device
app.post("/api/v2/register/device", DeviceController.addDevice);
app.put("/api/v2/update/device/:id", DeviceController.updateDevice);
app.get("/api/v2/getAll/device", DeviceController.getAllDevice);
app.delete("/api/v2/delete/device/:id", DeviceController.deletedDevice);
app.post("/api/v2/add/device/list", DeviceController.addDeviceToList);
app.get("/api/v2/get/device/performance", DeviceController.getPerformance);
app.get("/api/v2/get/device/overspeed/:id", DeviceController.getOverSpeed);

// Performance
app.get("/api/v3/get/perfor", PerformanceController.getPerformance);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on http://localhost:${PORT}`);
});
