const app = require('../app');
const { connectDatabase } = require('../db');

module.exports = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: 'JWT_SECRET is not configured.'
    });
  }

  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      message: 'CampusFix API unavailable.'
    });
  }
};