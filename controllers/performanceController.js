const PerformanceServices = require("../services/performanceService");

const getPerformance = async (req, res) => {
  const { status, status_code, message, data } =
    await PerformanceServices.getPerformance();
  res.status(status_code).send({
    status,
    status_code,
    message,
    data,
  });
};
module.exports = { getPerformance };
