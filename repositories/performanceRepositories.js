const { performance } = require("../models");

class PerfomanceRepositories {
  static async getSpeed({ speed }) {
    const getSpeed = await performance.findAll({ where: { speed: speed } });
    return getSpeed;
  }
  static async findOne() {}
  static async getOverSpeed({ overSpeed }) {
    const getOverSpeed = await performance.findOne({
      where: { overSpeed: overSpeed },
    });
    return getOverSpeed;
  }
}
module.exports = PerfomanceRepositories;
