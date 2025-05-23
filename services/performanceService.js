const PerformanceRepositories = require("../repositories/performanceRepositories");
const DeviceRepositories = require("../repositories/deviceRepositories");

class PerformanceService {
  static async getPerformance() {
    try {
      const getPerformance = await PerformanceRepositories.getSpeed();

      const statsCamera = {};

      getPerformance.forEach(({ speed }) => {
        if (!statsCamera[speed]) {
          statsCamera[speed] = {
            total: 0,
            speedSum: 0,
            overSpeedCount: 0,
          };
        }

        statsCamera[speed].total += 1;
        statsCamera[speed].speedSum += speed;
        if (speed > 60) statsCamera[speed].overSpeedCount += 1;
      });

      const result = Object.entries(statsCamera).map(([speed, stats]) => ({
        speed,
        totalRecord: stats.total,
        averageSpeed: parseFloat((stats.speedSum / stats.total).toFixed(2)),
        overSpeed: stats.overSpeedCount,
      }));
      return {
        status: true,
        status_code: 200,
        message: "Success get performance data",
        data: { device: result },
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        status_code: 500,
        message: error,
        data: { device: null },
      };
    }
  }
}

module.exports = PerformanceService;
