const UserRepositories = require("../repositories/userRepositories");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { JWT } = require("../lib/const");

class UserServices {
  static async register({ username, password }) {
    try {
      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "Username is required",
          data: { user: null },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password is required",
          data: { user: null },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password must be 8 character",
          data: { user: null },
        };
      }
      const existingUsername = await UserRepositories.existingUsername({
        username,
      });
      if (existingUsername) {
        return {
          status: false,
          status_code: 400,
          message: "Username has been used",
          data: { user: null },
        };
      }
      const createUser = await UserRepositories.createUser({
        userId: uuidv4(),
        username,
        password: await bcrypt.hash(password, JWT.SALT_ROUND),
      });
      return {
        status: true,
        status_code: 200,
        message: "Register successfuly",
        data: { user: createUser },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { user: null },
      };
    }
  }
  static async login({}) {
    try {
    } catch (error) {}
  }
}
module.exports = UserServices;
