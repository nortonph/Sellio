const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname,
    process.env.NODE_ENV === 'test'
      ? '.env.test.local'
      : '.env.development.local',
  )
});

const DB_PROT = process.env.DB_PROT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_SRV = process.env.DB_SRV;

function dbconnect() {
  if (DB_SRV !== '') {
    return `${DB_PROT}://${DB_SRV}@${DB_PORT}/${DB_NAME}`;
  } else {
    return `${DB_PROT}://${DB_SRV}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

module.exports = dbconnect;
