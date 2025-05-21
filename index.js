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
const middleware = require("./middleware/auth");

app.get("/", (req, res) => {
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
app.delete(
  "/api/v1/delete/user/:id",
  UserController.deleteUser,
  middleware.authentication,
  middleware.isAdmin
);

// Device
app.post("/api/v2/register/device", DeviceController.addDevice);
app.put("/api/v2/update/device/:id", DeviceController.updateDevice);
app.delete("/api/v2/delete/device/:id", DeviceController.deletedDevice);
app.get("/api/v2/getAll/device", DeviceController.getAllDevice);
app.post("/api/v2/add/device/list", DeviceController.addDeviceToList);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on http://localhost:${PORT}`);
});
