const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/IntelliStock_db');
// changed db name to IntelliStock_db instead of intellistock
module.exports = mongoose.connection;
