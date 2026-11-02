const app = require('../backend/app');
const { connectDatabase } = require('../backend/db');

module.exports = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is not configured.' });
  }

  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('CampusFix API initialization failed.', error);
    return res.status(503).json({ message: 'CampusFix API is temporarily unavailable.' });
  }
};
