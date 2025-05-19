const UserServices = require("../services/userServices");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const { status, status_code, message, data } = await UserServices.register({
    username,
    password,
  });
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};
const getAllUser = async (req, res) => {
  const { status, status_code, message, data } = await UserServices.listUser();
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};
module.exports = { createUser, getAllUser };
