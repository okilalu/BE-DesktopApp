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
  static async login({ username, password }) {
    try {
      const getUser = await UserRepositories.existingUsername({ username });
      if (!getUser) {
        return {
          status: false,
          status_code: 401,
          message: "Can't find user",
          data: { user: null },
        };
      }
      const isPasswordCorrect = bcrypt.compareSync(password, getUser.password);
      if (!isPasswordCorrect) {
        return {
          status: false,
          status_code: 404,
          message: "Password doesn't match",
          data: { user: null },
        };
      }
      const token = jwt.sign(
        {
          id: getUser.id,
          userId: getUser.userId,
          username: getUser.username,
          credential: getUser.credential,
        },
        JWT.SECRET
      );
      return {
        status: true,
        status_code: 200,
        message: "Login successfuly",
        data: { user: getUser, token: token },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { user: null },
      };
    }
  }
  static async updateUser({ userId, username, password }) {
    try {
      const getUser = await UserRepositories.findOneUser({ id });
      if (!getUser) {
        return {
          status: false,
          status_code: 401,
          message: "Can't find user",
          data: { user: null },
        };
      }
      const updateUser = await UserRepositories.updateUser({
        username,
        password,
      });
      return {
        status: true,
        status_code: 200,
        message: "Successfuly updated user",
        data: { user: updateUser },
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
  static async deleteUser({ userId }) {
    try {
      const getUser = await UserRepositories.findOneUser({ userId });
      if (!getUser) {
        return {
          status: false,
          status_code: 401,
          message: "Can't find user to delete",
          data: { user: null },
        };
      }
      const deletedUser = await UserRepositories.deleteUser();
      return {
        status: true,
        status_code: 200,
        message: "Successfully deleted user",
        data: { user: deletedUser },
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
  static async listUser() {
    try {
      const getAllUser = await UserRepositories.listUser();
      if (getAllUser) {
        return {
          status: true,
          status_code: 200,
          message: "Succesfully get all user",
          data: { user: getAllUser },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { user: null },
      };
    }
  }
}
module.exports = UserServices;
