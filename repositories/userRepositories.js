const { users } = require("../models");

class UserRepositories {
  static async createUser({ userId, username, password, credential }) {
    const createUser = await users.create({
      userId,
      username,
      password,
      credential,
    });
    return createUser;
  }
  static async login({ username, password }) {
    const loginUser = await users.create({
      username,
      password,
    });
    return loginUser;
  }
  static async existingUsername({ username }) {
    const existingUsername = await users.findOne({
      where: { username: username },
    });
    return existingUsername;
  }
  static async updateUser({ userId, username, password }) {
    const updateUser = await users.update(
      {
        username: username,
        password: password,
      },
      { where: { userId: userId } }
    );
    return updateUser;
  }
  static async listUser() {
    const listUser = await users.findAll();
    return listUser;
  }
  static async deleteUser({ userId }) {
    const deleteUser = await users.destroy({ where: { userId: userId } });
    return deleteUser;
  }
  static async findOneUser({ id }) {
    const getUser = await users.findOne({ where: { id: id } });
    return getUser;
  }
}
module.exports = UserRepositories;
