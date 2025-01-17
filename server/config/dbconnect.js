require('dotenv').config({
  path:
    process.env.NODE_ENV === 'test'
      ? '../.env.test.local'
      : '../.env.development.local',
});

function dbconnect(
  DB_PROT = 'mongodb',
  DB_SRV = '',
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'sellio'
) {
  if (DB_SRV !== '') {
    return `${DB_PROT}://${DB_SRV}@${DB_PORT}/${DB_NAME}`;
  } else {
    return `${DB_PROT}://${DB_SRV}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

module.exports = dbconnect;
