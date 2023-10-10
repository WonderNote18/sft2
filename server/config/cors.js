const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL + ':' + process.env.FRONTEND_PORT,
  credentials: true
}

module.exports = cors(corsOptions);