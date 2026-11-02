const app = require('../app');
const { connectDatabase } = require('../db');

module.exports = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET missing' });
    }

    await connectDatabase();

    return app(req, res);
  } catch (error) {
    console.error('API ERROR:', error);
    return res.status(500).json({
      message: error.message
    });
  }
};