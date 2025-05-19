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

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Successfully",
  });
});
// User
app.post("/api/v1/register/user", UserController.createUser);
app.get("/api/v1/getAll/user", UserController.getAllUser);

// Device
app.post("/api/v2/register/device", DeviceController.addDevice);
app.get("/api/v2/getAll/device", DeviceController.getAllDevice);
app.post("/api/v2/add/device/list", DeviceController.addDeviceToList);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on http://localhost:${PORT}`);
});
