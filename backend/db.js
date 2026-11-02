const mongoose = require('mongoose');

let connectionPromise;

function connectDatabase() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();

  if (!connectionPromise) {
    if (!process.env.MONGO_URI) {
      return Promise.reject(new Error('MONGO_URI is not configured.'));
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI)
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
}

module.exports = { connectDatabase };
